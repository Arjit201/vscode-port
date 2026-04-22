// src/components/TitleBar.jsx
// ─────────────────────────────────────────────────────────
// The very top bar of the VS Code window.
// Contains the traffic-light dots, menu items, and title.
// position: sticky so it never scrolls away.
// ─────────────────────────────────────────────────────────

export default function TitleBar() {
  const menus = ["File", "Edit", "View", "Go", "Terminal", "Help"];
  return (
    <div style={bar}>
      {/* macOS-style dots */}
      <div style={dots}>
        <div style={{ ...dot, background: "#ff5f57" }} />
        <div style={{ ...dot, background: "#febc2e" }} />
        <div style={{ ...dot, background: "#28c840" }} />
      </div>

      {/* Menu items */}
      <div style={menu}>
        {menus.map(m => (
          <span key={m} style={menuItem}>{m}</span>
        ))}
      </div>

      {/* Centred title */}
      <div style={title}>
        arjit-sharma — portfolio.code-workspace
      </div>
    </div>
  );
}

const bar = {
  height: 30,
  background: "#323233",
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  gap: 8,
  borderBottom: "1px solid #1a1a1a",
  flexShrink: 0,
  userSelect: "none",
};
const dots = { display: "flex", gap: 6 };
const dot  = { width: 12, height: 12, borderRadius: "50%" };
const menu = { display: "flex", gap: 16 };
const menuItem = {
  fontSize: 11,
  color: "var(--text-mute)",
  cursor: "pointer",
  opacity: 0.8,
};
const title = {
  flex: 1,
  textAlign: "center",
  fontSize: 11,
  color: "var(--text-mute)",
  letterSpacing: "0.03em",
};
