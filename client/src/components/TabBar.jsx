// src/components/TabBar.jsx
// ─────────────────────────────────────────────────────────
// The row of open-file tabs directly below the title bar.
//
// Props:
//   tabs     — array of tab metadata from TABS constant
//   active   — id of the currently active tab
//   onSelect — callback when a tab is clicked
//
// The active tab gets a top border in the accent colour
// (var(--accent)) and a lighter background, exactly like
// VS Code's Dark+ theme.
// ─────────────────────────────────────────────────────────

export default function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={bar}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <div
            key={tab.id}
            style={{
              ...tabStyle,
              background:   isActive ? "var(--bg)"    : "var(--bg-tab)",
              color:        isActive ? "var(--text)"  : "var(--text-mute)",
              borderTop:    isActive ? "1px solid var(--accent)" : "1px solid transparent",
            }}
            onClick={() => onSelect(tab.id)}
          >
            {/* File type icon */}
            <span style={{ fontSize: 11, color: tab.iconColor ?? "var(--text-mute)" }}>
              {tab.icon}
            </span>
            {tab.label}
            {/* Close button — cosmetic only */}
            <span style={closeBtn}>✕</span>
          </div>
        );
      })}
    </div>
  );
}

const bar = {
  height: 35,
  background: "var(--bg-dark)",
  display: "flex",
  alignItems: "flex-end",
  borderBottom: "1px solid var(--border)",
  flexShrink: 0,
  overflow: "hidden",
};

const tabStyle = {
  height: "100%",
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
  gap: 7,
  fontSize: 12,
  cursor: "pointer",
  borderRight: "1px solid var(--border)",
  whiteSpace: "nowrap",
  transition: "background 0.15s",
  userSelect: "none",
};

const closeBtn = {
  fontSize: 10,
  marginLeft: 4,
  opacity: 0,              // hidden by default — shown on hover via CSS in global.css
  transition: "opacity 0.1s",
};
