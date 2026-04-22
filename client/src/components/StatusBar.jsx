// src/components/StatusBar.jsx
// ─────────────────────────────────────────────────────────
// The blue strip at the very bottom of the VS Code window.
// Shows: git branch, error/warning count, language mode,
// encoding, line ending, cursor position, indent.
//
// `lang` prop comes from App.jsx and changes when you
// switch tabs (Markdown / JavaScript / TypeScript / Python).
// ─────────────────────────────────────────────────────────

export default function StatusBar({ lang = "Plain Text" }) {
  return (
    <div style={bar}>
      {/* Left items */}
      <div style={side}>
        <span style={item}>🌿 main</span>
        <span style={item}>⚠ 0 &nbsp; 🚫 0</span>
      </div>

      {/* Right items */}
      <div style={side}>
        <span style={item}>{lang}</span>
        <span style={item}>UTF-8</span>
        <span style={item}>CRLF</span>
        <span style={item}>Ln 1, Col 1</span>
        <span style={item}>Spaces: 2</span>
        <span style={item}>🔔</span>
      </div>
    </div>
  );
}

const bar = {
  height: 22,
  background: "var(--accent)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 8px",
  fontSize: 11,
  color: "rgba(255,255,255,0.9)",
  flexShrink: 0,
  userSelect: "none",
};

const side = { display: "flex", alignItems: "center", gap: 4 };

const item = {
  padding: "0 6px",
  cursor: "pointer",
  borderRadius: 2,
  lineHeight: "22px",
};
