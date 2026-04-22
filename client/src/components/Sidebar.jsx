// src/components/Sidebar.jsx
// ─────────────────────────────────────────────────────────
// The file-explorer panel. Shows the project folder tree
// with the four "files" (tabs) as clickable entries.
// Clicking a file switches the active tab.
//
// Extra decorative files (.gitignore, package.json, README)
// are grayed out and non-interactive — they complete the
// illusion of a real project folder.
// ─────────────────────────────────────────────────────────

const staticFiles = [
  { label: ".gitignore",   color: "var(--text-mute)" },
  { label: "package.json", color: "var(--text-mute)" },
  { label: "README.md",    color: "var(--text-mute)" },
];

export default function Sidebar({ tabs, active, onSelect }) {
  return (
    <div style={panel}>
      {/* Header */}
      <div style={header}>Explorer</div>

      {/* File tree */}
      <div style={tree}>

        {/* Root folder */}
        <div style={folder}>
          <span style={{ fontSize: 9 }}>▼</span>&nbsp;📁 ARJIT-SHARMA
        </div>

        {/* Active / clickable files */}
        <div style={children}>
          {tabs.map(tab => {
            const isActive = tab.id === active;
            return (
              <div
                key={tab.id}
                style={{
                  ...fileRow,
                  background: isActive ? "#094771" : "transparent",
                  color:      isActive ? "var(--white)" : "#ce9178",
                }}
                onClick={() => onSelect(tab.id)}
              >
                <span style={{ fontSize: 11, color: tab.iconColor ?? "var(--text-mute)" }}>
                  {tab.icon}
                </span>
                &nbsp;{tab.label}
              </div>
            );
          })}

          {/* Decorative static entries */}
          <div style={{ height: 8 }} />
          <div style={{ ...fileRow, color: "var(--text-mute)", cursor: "default", opacity: 0.5 }}>
            📁&nbsp;node_modules
          </div>
          {staticFiles.map(f => (
            <div
              key={f.label}
              style={{ ...fileRow, color: f.color, cursor: "default", opacity: 0.4, paddingLeft: 28 }}
            >
              📄&nbsp;{f.label}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const panel = {
  width: 220,
  background: "var(--bg-side)",
  flexShrink: 0,
  borderRight: "1px solid var(--border)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const header = {
  padding: "10px 12px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--text-mute)",
  borderBottom: "1px solid var(--border)",
  userSelect: "none",
};

const tree = {
  flex: 1,
  overflowY: "auto",
  padding: "4px 0",
};

const folder = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "3px 8px",
  fontSize: 12,
  color: "var(--text-mute)",
  fontWeight: 600,
  userSelect: "none",
};

const children = { paddingLeft: 12 };

const fileRow = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  padding: "3px 12px",
  fontSize: 12,
  cursor: "pointer",
  transition: "background 0.1s",
  userSelect: "none",
};
