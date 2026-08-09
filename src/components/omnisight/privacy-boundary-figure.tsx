/**
 * The privacy-boundary diagram, inlined rather than loaded from /public.
 *
 * `next/image` will not serve an SVG without `images.dangerouslyAllowSVG`,
 * which widens the attack surface for every image on the site, and a plain
 * <img> trips `@next/next/no-img-element` under `--max-warnings=0`. Inlining
 * avoids both, costs no extra request, and keeps the figure legible when the
 * page is printed or saved.
 *
 * The two background rects are deliberate: the figure carries its own light
 * zones so it reads identically in either site theme.
 */
const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

const ITEM = { fontFamily: FONT, fontSize: 16, fontWeight: 400, fill: "#26303B" } as const;
const BOX_LABEL = { fontFamily: FONT, fontSize: 18, fontWeight: 500, fill: "#1A2028" } as const;

function Tick({ y }: { y: number }) {
  return (
    <path
      d={`M 61 ${y - 5} L 67 ${y + 1} L 78 ${y - 11}`}
      stroke="#4A5462"
      strokeWidth={2.4}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export default function PrivacyBoundaryFigure() {
  return (
    <svg
      viewBox="0 0 1040 620"
      width="100%"
      role="img"
      aria-labelledby="pbTitle pbDesc"
      className="h-auto w-full rounded-lg"
    >
      <title id="pbTitle">What stays on your OmniSight server and what leaves</title>
      <desc id="pbDesc">
        Network events, alerts and verdicts, system metrics and endpoint inventory, and anything
        identifying your internal hosts or users all stay on your own server. Only software names and
        versions for vulnerability matching, aggregate report summaries for email delivery, and licence
        and update requests leave, and only when you configure them.
      </desc>

      <rect x="0" y="0" width="560" height="620" fill="#FFFFFF" />
      <rect x="560" y="0" width="480" height="620" fill="#F2F3F5" />

      <line x1="560" y1="72" x2="560" y2="596" stroke="#3D4757" strokeWidth={3} strokeDasharray="11 9" />

      <rect x="396" y="18" width="328" height="40" rx="20" fill="#FFFFFF" stroke="#C7CDD6" strokeWidth={1.5} />
      <text x="560" y="44" textAnchor="middle" style={{ ...BOX_LABEL, fontSize: 17 }}>
        Your data does not cross this line
      </text>

      {/* Left: stays */}
      <text x="280" y="118" textAnchor="middle" style={{ fontFamily: FONT, fontSize: 30, fontWeight: 600, fill: "#1A2028" }}>
        Stays on your server
      </text>

      <rect x="214" y="152" width="132" height="168" rx="10" fill="#4A5462" />
      <rect x="232" y="176" width="96" height="26" rx="5" fill="#39424E" />
      <circle cx="314" cy="189" r="5" fill="#7FC8B0" />
      <rect x="232" y="212" width="96" height="26" rx="5" fill="#39424E" />
      <circle cx="314" cy="225" r="5" fill="#7FC8B0" />
      <rect x="232" y="248" width="96" height="26" rx="5" fill="#39424E" />
      <circle cx="314" cy="261" r="5" fill="#7FC8B0" />

      <text x="280" y="350" textAnchor="middle" style={{ ...BOX_LABEL, fontSize: 19 }}>
        Your OmniSight Server
      </text>

      <Tick y={412} />
      <text x="92" y="412" style={ITEM}>Network events and connection metadata</text>
      <Tick y={458} />
      <text x="92" y="458" style={ITEM}>Alerts, verdicts, and investigation notes</text>
      <Tick y={504} />
      <text x="92" y="504" style={ITEM}>System metrics and endpoint inventory detail</text>
      <Tick y={550} />
      <text x="92" y="550" style={ITEM}>Anything identifying your internal hosts or users</text>

      {/* Right: leaves, if configured */}
      <text x="800" y="112" textAnchor="middle" style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, fill: "#3D4757" }}>
        Leaves only when
      </text>
      <text x="800" y="144" textAnchor="middle" style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, fill: "#3D4757" }}>
        you configure it
      </text>

      <rect x="650" y="196" width="300" height="56" rx="8" fill="#FFFFFF" stroke="#C7CDD6" strokeWidth={1.5} />
      <text x="800" y="230" textAnchor="middle" style={BOX_LABEL}>OmniSight Cloud</text>

      <rect x="650" y="268" width="300" height="56" rx="8" fill="#FFFFFF" stroke="#C7CDD6" strokeWidth={1.5} />
      <text x="800" y="302" textAnchor="middle" style={BOX_LABEL}>Vulnerability Intelligence</text>

      <defs>
        <marker id="pbArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth={7} markerHeight={7} orient="auto">
          <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#5A6472" />
        </marker>
      </defs>
      <path d="M 356 224 L 640 224" stroke="#5A6472" strokeWidth={1.75} fill="none" strokeDasharray="7 6" strokeLinecap="round" markerEnd="url(#pbArrow)" />
      <path d="M 356 296 L 640 296" stroke="#5A6472" strokeWidth={1.75} fill="none" strokeDasharray="7 6" strokeLinecap="round" markerEnd="url(#pbArrow)" />

      <line x1="650" y1="406" x2="666" y2="406" stroke="#8A94A3" strokeWidth={2.2} strokeLinecap="round" />
      <text x="678" y="412" style={ITEM}>Software names and versions, for</text>
      <text x="678" y="436" style={ITEM}>vulnerability matching</text>

      <line x1="650" y1="476" x2="666" y2="476" stroke="#8A94A3" strokeWidth={2.2} strokeLinecap="round" />
      <text x="678" y="482" style={ITEM}>Aggregate report summaries, for</text>
      <text x="678" y="506" style={ITEM}>email delivery</text>

      <line x1="650" y1="546" x2="666" y2="546" stroke="#8A94A3" strokeWidth={2.2} strokeLinecap="round" />
      <text x="678" y="552" style={ITEM}>Licence and update requests</text>
    </svg>
  );
}
