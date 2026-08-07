# Teknoloji & Mimari Envanteri — 4 Proje + GitHub

## Proje 1 — CV Sitesi (`~/Documents/CV Sitesi`) → cv.egekaya.net

**Amaç:** CV'yi TR/EN, PDF + DOCX olarak indirilebilir sunan tek sayfalık site.

| Katman | Teknoloji |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Stil | Tailwind CSS, CSS Modules, `tw-animate-css` |
| UI | shadcn/ui, Radix UI, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` |
| 3D / Animasyon | **three.js**, **@react-three/fiber**, **@react-three/drei**, **GSAP**, **Motion** (Framer Motion) |
| Dağıtım | **Docker** (Dockerfile + `compose.yaml`, port 3001), **systemd** (`cv-site.service`), Vercel |
| Güvenlik | `next.config.mjs` içinde production security header'ları |

**Mimari:** Statik/SSR tek sayfa. `LanguageContext` ile client-side i18n. CV dosyaları `public/cv/` altından doğrudan servis ediliyor. Hem container hem native systemd ile çalıştırılabilir.

---

## Proje 2 — OmniSight (`~/Documents/New project`) → omnisight.info

**Amaç:** Self-hosted endpoint network visibility + SIEM ürünü. Açık ara en büyük proje.

| Katman | Teknoloji |
|---|---|
| Endpoint agent | **Go 1.25/1.26** (`gorilla/websocket`, `creack/pty`, `yaml.v3`) |
| Backend API | **Python / FastAPI**, SQLAlchemy 2 (asyncio), Alembic, Pydantic v2, Uvicorn |
| Veritabanı | **PostgreSQL** (`psycopg3`, `asyncpg`), SQLite (lokal) |
| Auth | `python-jose`, **PyJWT**, `passlib[bcrypt]`, `slowapi` (rate limit), Standard Webhooks |
| Konsol (frontend) | **React + Vite**, TypeScript, React Router, TanStack Table |
| Görselleştirme | **D3**, **Recharts**, **three.js**, `topojson-client` |
| UI | HeroUI, Radix UI, daisyUI, shadcn/ui, Framer Motion, `lucide-react`, **xterm.js** |
| Test | **Vitest**, Testing Library, jsdom, **pytest** |
| Installer | **Swift** (macOS GUI installer ×2), **PowerShell** (Windows), **Bash** (Linux/macOS) |
| Altyapı | **Docker / docker-compose**, **nginx**, **Caddy**, **Hetzner** control plane, Vercel (public site) |
| Ek servisler | `omnisight-cloud`, `omnisight-cve-api` (CVE intelligence), `omnisight-chat` (gateway + worker) |
| Yerel LLM | **Ollama** (Qwen3.6-35B IQ2_M) — lab/araştırma amaçlı |

**Mimari:** Çok servisli monorepo. Go agent → FastAPI sunucu → Postgres; React konsol ayrı; CVE API ve cloud control plane bağımsız FastAPI servisleri; nginx/Caddy önünde; native installer'lar üç platform için. Alembic ile migration yönetimi, ayrı `deploy/lab` ortamı ve `SECURITY_HARDENING_PLAN.md`.

---

## Proje 3 — egekaya-ai (`~/Documents/egekaya-ai`) → ai.egekaya.net

**Amaç:** Ege hakkındaki soruları yanıtlayan iki dilli (TR/EN) kişisel AI asistanı.

| Katman | Teknoloji |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Stil | Tailwind CSS + `@tailwindcss/typography`, `clsx`, `tailwind-merge` |
| UI | Framer Motion, `lucide-react`, `react-markdown` |
| Backend | Next.js Route Handler `/api/chat` → harici **webhook** (muhtemelen n8n) |
| Test | Vitest |
| Dağıtım | Docker + `docker-compose.yml` |

**Mimari:** Tarayıcı → `/api/chat` (validation + boyut limiti + in-memory rate limit, `RATE_LIMIT_SECRET`, `TRUST_PROXY_HEADERS`) → upstream webhook → normalize edilmiş yanıt. Günlük mesaj kotası localStorage'da tutuluyor. Paylaşılan limit/validation mantığı `lib/chat.shared.ts` içinde.

---

## Proje 4 — egekaya.net new attempt (bu proje)

| Katman | Teknoloji |
|---|---|
| Framework | **Next.js 16** (App Router, `typedRoutes`), **React 19**, TypeScript 5.9 |
| Stil | **Tailwind CSS v4** (`@tailwindcss/postcss`), custom `globals.css` design token'ları |
| Mail | **nodemailer** (Gmail SMTP 465/TLS) |
| İkonlar | El yazımı inline SVG (`ui/icon.tsx`) — harici ikon paketi yok |
| Font | Sistem font stack'i — webfont yok |
| Test/CI | `npm run verify` = build + typecheck + ESLint (`--max-warnings=0`) |
| Dağıtım | Vercel |

**Mimari:** 10 statik prerender + 2 dinamik route. Tema: "Bit & Aperture" (Material-benzeri token seti, `DESIGN.md`). Fotoğraf galerisi build-time'da `public/images/portfolio/` dizinini okuyor. Güvenlik header'ları `next.config.ts` içinde: CSP (report-only), HSTS preload, COOP, `X-Frame-Options: DENY`, Permissions-Policy.

**Dikkat:** Bu ağaçta 3. parti runtime bağımlılığı neredeyse yok — `next`, `react`, `react-dom`, `nodemailer` dışında hiçbir şey. Diğer üç projeye kıyasla en yalın stack.

---

## GitHub — github.com/iamegekaya

| Repo | Görünürlük | Ana dil | Not |
|---|---|---|---|
| `egekaya.net.new` | Public | TypeScript (164 KB) | Bu proje |
| `OmniSight` | **Private** | Python (2.95 MB) | Aşağıya bak |
| `cv.egekaya.net` | Public | TypeScript (39 KB) | Proje 1 |
| `egekaya.net` | Public | TypeScript (45 KB) | Eski site |
| `ai.egekaya.net` | Public | TypeScript (67 KB) | Proje 3 |

**OmniSight dil dağılımı:** Python 2.95 MB · TypeScript 1.25 MB · JavaScript 454 KB · **Shell 430 KB** · **Go 307 KB** · CSS 143 KB · **Swift 50 KB** · **PowerShell 28 KB** · Dockerfile · HTML · Mako

GitHub'da yerel klasörlerde olmayan ekstra repo **yok** — 5 repo, 4 proje + eski site.

---

## Sitede belirtilmeyen ama gerçekte kullanılan teknolojiler

Şu an `about` sayfasındaki Tech_Stack: `Zero Trust · Docker · Cloudflare · n8n · Tailscale`

Envanterin ortaya çıkardığı, sitede hiç geçmeyen gerçek yetkinlikler:

**Diller:** Go · Python · TypeScript · Swift · PowerShell · Bash/Shell · SQL
**Backend:** FastAPI · PostgreSQL · SQLAlchemy · Alembic · JWT/OAuth · nginx · Caddy
**Frontend:** Next.js · React · Vite · Tailwind CSS · three.js · D3
**Ops/Güvenlik:** Hetzner · Vercel · systemd · Pi-hole · Nmap · Nuclei · OWASP ZAP · Ollama · pytest/Vitest · Alembic migration

> **Not:** Python'ı Tech_Stack'ten kaldırmanı istedin ve kaldırdım. Ancak envanter, Python'ın stack'indeki **en büyük dil** olduğunu gösteriyor (OmniSight'ta 2.95 MB, üç ayrı FastAPI servisi). Karar senin — sadece veriyi bir kez belirtiyorum.
