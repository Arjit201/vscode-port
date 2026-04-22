// src/components/Terminal.jsx
// ─────────────────────────────────────────────────────────
// The bottom terminal panel, split into TERMINAL / OUTPUT /
// PROBLEMS / DEBUG CONSOLE tabs (only TERMINAL is active).
//
// `lines` prop comes from /api/terminal and describes each
// row: prompt, command output, success text, or blank.
//
// The blinking cursor is a <span> with the CSS animation
// defined in global.css → @keyframes blink.
// ─────────────────────────────────────────────────────────

const PANEL_TABS = ["TERMINAL", "OUTPUT", "PROBLEMS", "DEBUG CONSOLE"];

export default function Terminal({ lines = [] }) {
  return (
    <div style={panel}>
      {/* Tab strip */}
      <div style={tabStrip}>
        {PANEL_TABS.map((t, i) => (
          <div key={t} style={{ ...panelTab, ...(i === 0 ? activeTab : {}) }}>
            {t}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 14, color: "var(--text-mute)", padding: "0 8px", cursor: "pointer" }}>
          ＋ ✕
        </div>
      </div>

      {/* Terminal output */}
      <div style={body}>
        {lines.map((line, i) => (
          <div key={i} style={row}>
            {line.type === "prompt" && (
              <>
                <span style={promptStyle}>arjit@DTU</span>
                <span style={pathStyle}>:~/portfolio</span>
                <span style={dollarStyle}>$ </span>
                <span style={cmdStyle}>{line.cmd}</span>
              </>
            )}
            {line.type === "out"     && <span style={outStyle}>{line.text}</span>}
            {line.type === "success" && <span style={successStyle}>{line.text}</span>}
            {line.type === "err"     && <span style={errStyle}>{line.text}</span>}
            {line.type === "blank"   && <span>&nbsp;</span>}
            {line.type === "cursor"  && (
              <>
                <span style={promptStyle}>arjit@DTU</span>
                <span style={pathStyle}>:~/portfolio</span>
                <span style={dollarStyle}>$ </span>
                <span style={cursor} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const panel = {
  height: 200,
  background: "#1a1a1a",
  borderTop: "1px solid var(--border)",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
};

const tabStrip = {
  display: "flex",
  alignItems: "center",
  height: 30,
  borderBottom: "1px solid var(--border)",
  padding: "0 8px",
};

const panelTab = {
  padding: "0 14px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontSize: 11,
  cursor: "pointer",
  color: "var(--text-mute)",
  borderBottom: "2px solid transparent",
};

const activeTab = {
  color: "var(--text)",
  borderBottom: "2px solid var(--accent)",
};

const body = {
  flex: 1,
  padding: "6px 16px",
  overflowY: "auto",
  fontSize: 12,
  lineHeight: "1.65",
};

const row          = { marginBottom: 1 };
const promptStyle  = { color: "#4ec9b0" };
const pathStyle    = { color: "#569cd6" };
const dollarStyle  = { color: "var(--text-mute)" };
const cmdStyle     = { color: "var(--text)" };
const outStyle     = { color: "var(--text-mute)" };
const successStyle = { color: "#4ec9b0" };
const errStyle     = { color: "var(--red)" };
const cursor       = {
  display: "inline-block",
  width: 8, height: 13,
  background: "var(--text)",
  marginLeft: 2,
  verticalAlign: "middle",
  animation: "blink 1.2s step-end infinite",
};
