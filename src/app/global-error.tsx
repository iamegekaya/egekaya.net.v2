"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// This replaces the root layout entirely, so it renders its own html/body and
// deliberately relies on inline styles only — it is the last-resort fallback and
// must not depend on the stylesheet or any component that may have failed.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeContent: "center",
          gap: "1.5rem",
          padding: "2rem",
          background: "#121414",
          color: "#e3e2e2",
          fontFamily: '"SFMono-Regular", Consolas, monospace',
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#72ff70",
          }}
        >
          Something Went Wrong
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.05 }}>
          The site failed to load
        </h1>
        <p style={{ margin: 0, lineHeight: 1.7, color: "#b9ccb2" }}>
          Please try again. If the problem persists, come back in a few minutes.
        </p>

        {error.digest ? (
          <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(227, 226, 226, 0.4)" }}>
            Reference: {error.digest}
          </p>
        ) : null}

        <button
          type="button"
          onClick={reset}
          style={{
            justifySelf: "center",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.25rem",
            border: "1px solid #72ff70",
            background: "rgba(114, 255, 112, 0.12)",
            color: "#e3e2e2",
            font: "inherit",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
