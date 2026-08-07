import { ImageResponse } from "next/og";

const SITE_NAME = "egekaya.net";
const SITE_TAGLINE = "Cyber Security · Photography";
const SITE_AUTHOR = "Ege Kaya";
const BG = "#121414";
const FG = "#e3e2e2";
const ACCENT = "#72ff70";
const ACCENT_DIM = "rgba(114, 255, 112, 0.28)";
const BORDER = "rgba(59, 75, 55, 0.6)";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}. ${SITE_AUTHOR}'s portfolio.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(80% 60% at 80% 10%, ${ACCENT_DIM} 0%, ${BG} 60%)`,
          color: FG,
          fontFamily: '"SFMono-Regular", Consolas, monospace',
          borderTop: `2px solid ${ACCENT}`,
          borderLeft: `1px solid ${BORDER}`,
          borderRight: `1px solid ${BORDER}`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              background: ACCENT,
              boxShadow: `0 0 24px ${ACCENT}`,
            }}
          />
          <span
            style={{
              fontSize: "26px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* The column direction belongs on this wrapper, not on the single-text
              children. Satori lays a multi-child element out as a flex row by
              default, which put the two lines side by side and pushed the second
              one off the 1200px canvas. */}
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "104px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "1000px",
            }}
          >
            {SITE_TAGLINE.split(" · ").map((part, i) => (
              <span key={i}>{part}</span>
            ))}
          </span>

          <span
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "#b9ccb2",
              letterSpacing: "0.02em",
            }}
          >
            {SITE_AUTHOR} — portfolio
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "rgba(227, 226, 226, 0.62)",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: "28px",
          }}
        >
          <span>https://egekaya.net</span>
          <span style={{ color: ACCENT }}>→ enter</span>
        </div>
      </div>
    ),
    size,
  );
}
