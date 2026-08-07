import type { NextConfig } from "next";

/**
 * Flip to false to enforce the policy instead of only reporting on it.
 *
 * Ship in report-only first: violations show up in the browser console without
 * breaking anything, so a missed directive costs a console message rather than
 * a blank page.
 */
const CSP_REPORT_ONLY = true;

/**
 * Every asset this site loads is same-origin: no third-party scripts, no
 * webfonts (system font stack), and images come from /_next/image and
 * /_next/static. `data:` is allowed for images only so that adding a blur
 * placeholder later does not silently break the gallery.
 *
 * `'unsafe-inline'` is unavoidable in both directives: Next emits inline
 * hydration and RSC-payload scripts, and the components carry inline style
 * attributes. The honest consequence is that this policy does not stop injected
 * inline script — it stops external script loading and outbound exfiltration.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: CSP_REPORT_ONLY
              ? "Content-Security-Policy-Report-Only"
              : "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
