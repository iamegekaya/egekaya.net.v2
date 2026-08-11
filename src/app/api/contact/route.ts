import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { SITE_URL } from "@/lib/site-url";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_GLOBAL_REQUESTS_PER_WINDOW = 120;
const MAX_RATE_LIMIT_BUCKETS = 5000;
const MAX_REQUEST_BODY_BYTES = 32 * 1024;
const MIN_SUBMISSION_AGE_MS = 1200;
const MAX_SUBMISSION_AGE_MS = 24 * 60 * 60 * 1000;

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();

let lastBucketSweepAt = 0;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

function sanitizeLine(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[\r\n]+/g, " ").trim();
}

function sanitizeBlock(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isContactPayload(value: unknown): value is ContactPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getClientIp(request: Request) {
  // Vercel overwrites x-forwarded-for and does not forward externally supplied
  // values, so it is the only client-address header here that cannot be spoofed.
  // cf-connecting-ip and x-real-ip are not set by the platform and were
  // therefore fully attacker-controlled.
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function sweepExpiredBuckets(now: number) {
  if (now - lastBucketSweepAt < RATE_LIMIT_WINDOW_MS) {
    return;
  }

  lastBucketSweepAt = now;

  for (const [bucketKey, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(bucketKey);
    }
  }
}

function hitRateLimit(key: string, limit: number, now: number) {
  const currentBucket = rateLimitBuckets.get(key);

  // Expiry is handled here rather than by the sweep, so the sweep is only a
  // memory optimisation and can run at most once per window.
  if (currentBucket && currentBucket.resetAt > now) {
    currentBucket.count += 1;
    return currentBucket.count <= limit;
  }

  if (!currentBucket && rateLimitBuckets.size >= MAX_RATE_LIMIT_BUCKETS) {
    return false;
  }

  rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  return true;
}

function isAllowedRequestSource(request: Request) {
  const source = request.headers.get("origin") ?? request.headers.get("referer");

  // Absent headers used to pass. Requiring them raises the bar for scripted
  // abuse, but it is not a real control: any client can send an Origin it likes.
  // The honest purpose here is anti-spam friction, not authorisation.
  if (!source) {
    return false;
  }

  try {
    const sourceUrl = new URL(source);
    const requestUrl = new URL(request.url);
    const allowedOrigins = new Set([requestUrl.origin, SITE_URL]);

    return allowedOrigins.has(sourceUrl.origin);
  } catch {
    return false;
  }
}

class RequestBodyTooLargeError extends Error {}

/**
 * Reads the request body with a hard byte ceiling.
 *
 * The field length checks further down run after parsing, so they are not a
 * defence against a large body. `content-length` is checked first as a cheap
 * rejection, but it can be omitted or wrong on a chunked request, so the stream
 * is also counted as it arrives.
 */
async function readLimitedBody(request: Request, maxBytes: number) {
  const declaredLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new RequestBodyTooLargeError();
  }

  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    received += value.byteLength;

    if (received > maxBytes) {
      await reader.cancel();
      throw new RequestBodyTooLargeError();
    }

    chunks.push(value);
  }

  const body = new Uint8Array(received);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

function getSubmissionAge(startedAt: unknown, now: number) {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) {
    return null;
  }

  return now - startedAt;
}

export async function POST(request: Request) {
  const now = Date.now();
  const clientIp = getClientIp(request);

  sweepExpiredBuckets(now);

  // Only the per-IP limit guards the front door. On Vercel x-forwarded-for
  // cannot be spoofed, so the number of distinct keys is bounded by real
  // clients and MAX_RATE_LIMIT_BUCKETS is just a backstop. The global limit is
  // deliberately deferred until after validation -- charging it here let a
  // single host spend the shared budget on garbage requests and lock the form
  // for everyone else.
  if (!hitRateLimit(`ip:${clientIp}`, MAX_REQUESTS_PER_WINDOW, now)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    ?.trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    return NextResponse.json(
      { ok: false, error: "Unsupported content type." },
      { status: 415 },
    );
  }

  if (!isAllowedRequestSource(request)) {
    return NextResponse.json(
      { ok: false, error: "Invalid request source." },
      { status: 403 },
    );
  }

  let rawBody: string;

  try {
    rawBody = await readLimitedBody(request, MAX_REQUEST_BODY_BYTES);
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json(
        { ok: false, error: "Request body is too large." },
        { status: 413 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  let parsedPayload: unknown;

  try {
    parsedPayload = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!isContactPayload(parsedPayload)) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const payload = parsedPayload;

  const name = sanitizeLine(payload.name);
  const email = sanitizeLine(payload.email);
  const message = sanitizeBlock(payload.message);
  const company = sanitizeLine(payload.company);
  const submissionAge = getSubmissionAge(payload.startedAt, now);

  if (company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (
    submissionAge === null ||
    submissionAge < MIN_SUBMISSION_AGE_MS ||
    submissionAge > MAX_SUBMISSION_AGE_MS
  ) {
    return NextResponse.json(
      { ok: false, error: "Please submit the form again." },
      { status: 400 },
    );
  }

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Please enter your email address." },
      { status: 400 },
    );
  }

  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Please enter a message." },
      { status: 400 },
    );
  }

  if (name.length > 120 || email.length > 320 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Charged only once a request has proven itself well-formed, so a flood of
  // malformed requests cannot exhaust the budget shared by real visitors.
  if (!hitRateLimit("global", MAX_GLOBAL_REQUESTS_PER_WINDOW, now)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();

  if (!gmailUser || !gmailAppPassword) {
    // Deliberately the same opaque message as a send failure: the caller is
    // unauthenticated and has no business learning which part is misconfigured.
    console.error("Contact form is missing GMAIL_USER or GMAIL_APP_PASSWORD.");

    return NextResponse.json(
      { ok: false, error: "Unable to send your message right now. Please try again later." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // Fail within the request budget instead of leaving a function invocation
    // waiting on a stalled SMTP handshake or socket.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `"egekaya.net Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `[egekaya.net] New message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin-bottom: 16px;">New contact form message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form mail delivery failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong while sending your message.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
