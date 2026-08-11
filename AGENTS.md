<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# egekaya.net Agent Instructions

This file is the binding project contract for Codex, Claude Code, OpenCode, and
their subagents in this repository. The main agent acts as product manager and
technical lead: establish scope, use the code graph, delegate non-trivial work
to the role that owns it, review the result, run the relevant gates, and provide
one integrated handoff.

## Repository identity and sources of truth

- Exact root: `/Users/egekaya/Documents/egekaya.net yeni site`
- Codebase Memory project: `Users-egekaya-Documents-egekaya.net-yeni-site`
- `README.md` is the technical and current-state source.
- `DESIGN.md` is the visual design source.
- `TECH-INVENTORY.md` may support technology and portfolio claims only; it is
  not a runtime or deployment source of truth.
- Read only the documents and source files required by the current task. Do not
  create a second context, roadmap, or changelog system unless explicitly asked.

## Mandatory Codebase Memory workflow

Codebase Memory is required for every repository task, including work delegated
to subagents. The requirement is fail-closed, not best-effort.

1. Run `list_projects`.
2. Select the project only when `root_path` exactly equals the repository root
   above. Do not select the similarly named parent project.
3. Run `index_status` for the exact project identifier above.
4. If the graph is absent or stale, index the exact nested root with
   `persistence:false`, then confirm `status=ready`.
5. Before reading source, run at least one task-specific `get_architecture`,
   `search_graph`, `trace_path`, or `search_code` query.
6. Read only the directly relevant source, test, configuration, and documentation
   files identified by graph discovery.
7. After any source, test, configuration, instruction, or documentation edit,
   run `index_repository` for the exact nested root with `persistence:false` and
   confirm `index_status=ready` before the final report.

Do not delete or replace the parent graph. If MCP tools are unavailable, use the
portable CLI form `codebase-memory-mcp cli ...` for the same sequence. If both
MCP and CLI are unavailable, stop and report `BLOCKED`; do not silently replace
graph discovery with a broad filesystem scan.

## Coordinator and delegation model

The main agent owns decomposition, dependency ordering, acceptance criteria,
cross-role review, and final synthesis. Non-trivial work should be routed to one
or more of these bounded roles with explicit file ownership:

- `site-project-manager`: scope, sequencing, acceptance criteria, and handoffs;
  read-only.
- `nextjs-ui-engineer`: App Router, components, theme, Tailwind, GSAP,
  responsive behavior, typed routes, and client accessibility.
- `content-seo-i18n-editor`: English/Turkish content parity, metadata, navigation,
  sitemap, robots, `/llms.txt`, and evidence-based product claims.
- `contact-api-security-engineer`: `/api/contact`, request validation,
  sanitization, rate limiting, SMTP failure behavior, and security headers.
- `qa-accessibility-reviewer`: route parity, keyboard/focus, reduced motion,
  responsive behavior, SEO surfaces, and contact error paths; read-only.
- `vercel-deployment-engineer`: Vercel configuration preflight, environment-name
  contracts, WAF requirements, and post-deploy smoke design; never deploys
  without explicit approval.
- `github-release-manager`: the only role allowed to perform non-trivial Git or
  GitHub mutations, and only inside the approval gates below.

For Codex, use matching built-in specialist roles where available; otherwise use
a bounded worker with exact ownership. Workers are not alone in the repository:
they must preserve existing changes, avoid reverting other work, and adapt to
concurrent edits.

## Product and implementation invariants

- Preserve Next.js 16 App Router conventions, React 19, TypeScript strictness,
  `typedRoutes`, the existing Tailwind v4 token system, and the bounded GSAP
  photography usage unless a task explicitly changes them.
- Read the task-relevant Next guide under `node_modules/next/dist/docs/` after
  graph discovery and before changing Next.js code. Other `node_modules` content
  remains out of scope.
- Preserve English and Turkish parity across routes, navigation, metadata,
  sitemap entries, robots behavior, and `/llms.txt`. A change to one locale must
  either update the other or explicitly document why it is language-specific.
- Treat `DESIGN.md` as authoritative for visual decisions. Reuse existing
  components, typography, tokens, and interaction patterns before adding a new
  abstraction or dependency.
- Keep portfolio and technology claims specific, current, and verifiable from
  the repository sources. Do not invent capabilities, clients, metrics, security
  outcomes, or production status.
- Do not read, reproduce, summarize, or modify portfolio image content or other
  personal media unless the user explicitly requests that asset work.

### Contact and security boundary

- Keep SMTP credentials and all environment values server-only. Never print,
  expose, move to client code, or request their values.
- Preserve bounded request-body reading, JSON content-type enforcement,
  same-origin source checks, honeypot and dwell-time controls, per-field limits,
  CRLF removal for header-bound fields, HTML escaping, and explicit failure
  responses.
- In-memory rate limits are process-local and must never be described as a
  deployment-wide control. Production readiness requires a Vercel WAF rate-limit
  rule for `POST /api/contact`.
- Do not log message bodies, email addresses, IP addresses, SMTP responses, or
  credentials. Tests and evidence must use synthetic, non-sensitive fixtures.

## Protected paths and operational gates

Never read, print, edit, move, or delete `.env*`, certificates/keys, database or
dump files, credentials, private runtime state, `.vercel/`, `.git/`,
`node_modules/` (except the narrow Next docs rule), `.next/`, `dist/`, `out/`,
coverage output, or personal portfolio media unless the user explicitly scopes
the exact protected artifact.

No agent may perform a Vercel deploy, environment-variable mutation, WAF change,
DNS change, SMTP/provider mutation, production request, Docker restart/recreate,
or destructive cleanup without separate explicit approval for that exact action.
Planning, static review, local tests, and deployment handoff preparation do not
grant production authority.

## Git and GitHub workflow

- Read-only `git status`, diff, branch, remote, and divergence inspection is
  allowed when relevant.
- All staging, commits, branch mutations, pushes, PRs, merges, tags, releases,
  and remote changes belong exclusively to `github-release-manager`.
- Every push, PR mutation, merge, tag, release publication, force operation, or
  remote change requires separate explicit approval for that exact action.
- Never use `git add .`; stage explicit reviewed paths only.
- Preserve dirty worktrees and unrelated user edits. Do not reset, checkout,
  clean, stash, overwrite, or reformat files outside the assigned scope.

## Validation and handoff

For application changes, prefer `npm run verify` (build, typecheck, lint) and add
focused checks appropriate to the touched behavior. Browser-facing work must
cover both locale trees, keyboard/focus, reduced-motion behavior, responsive
layouts, SEO surfaces, and expected contact success/failure states as relevant.
Do not claim automated test coverage that the repository does not have.

Every agent handoff must include:

- Scope and files owned.
- Files changed, or an explicit read-only result.
- Validation commands and outcomes.
- Security, accessibility, SEO, i18n, and deployment implications that apply.
- Existing failures or risks clearly separated from regressions introduced.
- Remaining approval-gated actions.
- Final Codebase Memory project identifier and readiness state after edits.
