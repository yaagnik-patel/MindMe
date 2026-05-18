import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const T = {
  bg: "#080808",
  border: "#1e1e1e",
  lime: "#c8f542",
  muted: "#444",
  mutedHi: "#777",
  font: "'Syne',sans-serif",
  body: "'DM Sans',sans-serif",
};

const scales = ["PHQ-9", "GAD-7", "PSS-10", "ISI", "WHO-5"];
const links = [
  { label: "Checks", to: "/tests" },
  { label: "Sources", to: "/sources" },
];

const Footer = () => (
  <footer
    style={{
      background: T.bg,
      borderTop: `1px solid ${T.border}`,
      position:
        "relative" /* Removed zIndex: 10 to prevent overlapping with DisclaimerModal */,
    }}
  >
    {/* Top row */}
    <div
      style={{
        padding: "40px clamp(20px,4vw,48px) 28px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "32px",
      }}
    >
      {/* Brand */}
      <div>
        <span
          style={{
            fontFamily: T.font,
            fontWeight: 800,
            fontSize: "22px",
            letterSpacing: "-0.02em",
            color: "#f0f0f0",
          }}
        >
          MIND<span style={{ color: T.lime }}>ME</span>
        </span>
        <p
          style={{
            fontFamily: T.body,
            fontSize: "12px",
            color: T.muted,
            marginTop: "8px",
            letterSpacing: "0.04em",
            lineHeight: 1.6,
            maxWidth: "220px",
          }}
        >
          Private mental wellness check-ins, built on validated research tools.
        </p>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span
          style={{
            fontFamily: T.body,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: T.muted,
            marginBottom: "4px",
          }}
        >
          Navigation
        </span>
        {links.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: T.body,
              fontSize: "13px",
              color: T.mutedHi,
              textDecoration: "none",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.mutedHi)}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Validated scales */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span
          style={{
            fontFamily: T.body,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: T.muted,
            marginBottom: "4px",
          }}
        >
          Validated scales
        </span>
        {scales.map((s) => (
          <span
            key={s}
            style={{
              fontFamily: T.body,
              fontSize: "13px",
              color: T.mutedHi,
              letterSpacing: "0.04em",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>

    {/* Bottom bar */}
    <div
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: "14px clamp(20px,4vw,48px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <ShieldCheck size={12} color={T.lime} />
        <span
          style={{
            fontFamily: T.body,
            fontSize: "11px",
            color: T.muted,
            letterSpacing: "0.06em",
          }}
        >
          No data collected — everything stays on your device
        </span>
      </div>
      <span
        style={{
          fontFamily: T.body,
          fontSize: "11px",
          color: T.muted,
          letterSpacing: "0.06em",
        }}
      >
        Not a medical service · {new Date().getFullYear()}
      </span>
    </div>
  </footer>
);

export default Footer;
