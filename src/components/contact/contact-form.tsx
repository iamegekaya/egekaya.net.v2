"use client";

import { useRef, useState } from "react";

import GlassPanel from "@/components/ui/glass-panel";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type SubmissionState = "idle" | "success" | "error";

const GENERIC_ERROR =
  "Something went wrong while sending your message. Please try again in a moment.";

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

const FIELD_LABEL_CLASS_NAME =
  "text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-[var(--surface-text-muted)]";

const FIELD_SHELL_CLASS_NAME =
  "rounded-2xl border border-[var(--surface-border-strong)] bg-[var(--surface-input-bg)] text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--surface-text-subtle)] focus:border-[var(--accent-border-focus)]";

const INPUT_CLASS_NAME = `${FIELD_SHELL_CLASS_NAME} h-[52px] px-4`;

const TEXTAREA_CLASS_NAME = `${FIELD_SHELL_CLASS_NAME} min-h-[180px] px-4 py-3`;

export default function ContactForm() {
  const formStartedAtRef = useRef(Date.now());
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState("idle");
    setErrorMessage(GENERIC_ERROR);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      company: form.company.trim(),
      startedAt: formStartedAtRef.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        throw new Error(
          data.error ??
            GENERIC_ERROR,
        );
      }

      setForm(INITIAL_FORM);
      formStartedAtRef.current = Date.now();
      setSubmissionState("success");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }

      setSubmissionState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <GlassPanel>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          Company
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(event) => {
              setForm((current) => ({ ...current, company: event.target.value }));
            }}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <label className="grid gap-2">
          <span className={FIELD_LABEL_CLASS_NAME}>
            Name
          </span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => {
              setForm((current) => ({ ...current, name: event.target.value }));
            }}
            required
            maxLength={120}
            className={INPUT_CLASS_NAME}
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2">
          <span className={FIELD_LABEL_CLASS_NAME}>
            Email
          </span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => {
              setForm((current) => ({ ...current, email: event.target.value }));
            }}
            required
            maxLength={320}
            className={INPUT_CLASS_NAME}
            placeholder="your@email.com"
          />
        </label>

        <label className="grid gap-2">
          <span className={FIELD_LABEL_CLASS_NAME}>
            Message
          </span>
          <textarea
            value={form.message}
            onChange={(event) => {
              setForm((current) => ({ ...current, message: event.target.value }));
            }}
            required
            maxLength={5000}
            rows={8}
            className={TEXTAREA_CLASS_NAME}
            placeholder="Write your message here..."
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-[var(--accent-border-strong)] bg-[var(--accent-bg-soft)] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] transition-colors hover:bg-[var(--accent-bg-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="mt-4" aria-live="polite">
        {submissionState === "success" ? (
          <div className="rounded-2xl border border-[var(--accent-border-strong)] bg-[var(--accent-bg-success)] px-4 py-3 text-[var(--surface-text-strong)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              Success:
            </p>
            <p className="mt-2 text-[0.98rem] leading-7">
              Your message has been sent successfully. We&apos;ll get back to you
              as soon as possible.
            </p>
          </div>
        ) : null}

        {submissionState === "error" ? (
          <div className="rounded-2xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-3 text-[var(--surface-text-strong)]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--danger-text)]">
              Error:
            </p>
            <p className="mt-2 text-[0.98rem] leading-7">
              {errorMessage}
            </p>
          </div>
        ) : null}
      </div>
    </GlassPanel>
  );
}
