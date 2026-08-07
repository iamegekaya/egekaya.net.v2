# egekaya.net

Personal site for Ege Kaya: an information security profile, a photography
portfolio, and a contact form backed by a server-side mail route. The design is
a terminal-styled theme ("Bit & Aperture", documented in `DESIGN.md`).

## Stack

- **Next.js 16** with the App Router and `typedRoutes`
- **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`), with the palette and custom
  classes in `src/app/globals.css`
- **Nodemailer 9** for contact form delivery

There is no UI kit, icon package, animation library, or webfont: icons are
hand-written inline SVG in `src/components/ui/icon.tsx`, type uses the system
font stack, and the only runtime dependencies are `next`, `react`, `react-dom`
and `nodemailer`. Keeping that list short is what lets the Content Security
Policy stay same-origin (see below).

## Pages

| Route | What it is |
|---|---|
| `/` | Terminal hero with a typed `whoami`, plus cards linking to the two sections |
| `/about` | Biography, education timeline, and tech stack |
| `/cyber-security` | Security principles, systems used, infrastructure architecture, experience |
| `/photography` | Photo essay, current gear, and the portfolio gallery |
| `/contact` | Contact form |
| `/api/contact` | `POST` endpoint that validates a submission and sends it by mail |
| `/api/health` | `GET` JSON health endpoint |

`robots.txt`, `sitemap.xml`, and the OpenGraph/Twitter card images are generated
from `src/app/robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, and
`twitter-image.tsx`.

## Project Structure

```
src/app/(site)/     page routes sharing the site chrome (nav, footer)
src/app/api/        contact and health route handlers
src/app/globals.css design tokens, custom classes, and the Tailwind entry
src/components/     terminal-hero, site-nav, masonry-gallery, contact-form,
                    theme-toggle, site-footer, and the ui/ primitives
src/lib/            cyber-security-content.ts (page copy), typography.ts
                    (text-style tokens), seo-image.ts (shared card metadata)
public/images/portfolio/  gallery source images
```

## Environment Variables

The contact route reads these at request time. They are configured in the
Vercel project settings; there is no `.env` file in this repository.

| Variable | Purpose |
|---|---|
| `GMAIL_USER` | Gmail address that sends and receives contact form mail |
| `GMAIL_APP_PASSWORD` | Gmail app password for SMTP auth |
| `APP_URL` | Site origin; also accepted as a valid form submission source |
| `APP_NAME` | Display name returned by `/api/health` |

Without `GMAIL_USER` and `GMAIL_APP_PASSWORD`, `POST /api/contact` still runs
its full validation chain but returns `500` at the delivery step. That is the
expected result of a local `npm start`, not a bug.

## Local Development

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint, `--max-warnings=0` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run verify` | `build`, then `typecheck`, then `lint` |

Prefer `npm run verify` over running the three separately. `typecheck` depends
on the route types Next generates under `.next/`, so on a clean checkout it only
catches typed-route errors when it runs after `build`.

## Security

Response headers are set in `next.config.ts` for every route:

- **Content-Security-Policy** — enforced, not report-only. Everything is
  `'self'`; `data:` is allowed for images only. `'unsafe-inline'` is
  unavoidable for scripts and styles because Next emits inline hydration and
  RSC-payload scripts. The honest consequence: the policy does not stop injected
  inline script, it stops external script loading and outbound exfiltration.
  Set `CSP_REPORT_ONLY = true` before adding anything cross-origin, so a missing
  directive costs a console message instead of a blank page.
- **Strict-Transport-Security** with `includeSubDomains; preload`
- `X-Frame-Options: DENY` and `frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  `Cross-Origin-Opener-Policy`, `X-Permitted-Cross-Domain-Policies`

`POST /api/contact` is the only endpoint that accepts user input. It enforces a
32 KB body ceiling while streaming, a JSON content type, a same-origin
`Origin`/`Referer` check, a honeypot field, a minimum form dwell time, per-IP
and global rate limits, per-field length caps, CRLF stripping on the header-bound
fields, and HTML escaping in the mail body. Failures return the same opaque
message whether the cause is a misconfiguration or a delivery error.

## Photography Gallery

`/photography` reads `public/images/portfolio` on the server at build time and
renders every supported image (`avif`, `gif`, `jpg`, `jpeg`, `png`, `webp`) in
natural filename order. Add or remove files there to change the gallery — no
code change is needed. A missing directory degrades to an empty-state message
rather than failing the build.

Note that the page metadata states the frame count in prose; update it when the
number of images changes.
