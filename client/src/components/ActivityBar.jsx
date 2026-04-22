// src/components/ActivityBar.jsx
// ─────────────────────────────────────────────────────────
// The narrow icon rail on the far left (Explorer, Search,
// Git, Extensions, Settings). Purely decorative in this
// portfolio — clicking doesn't change views — but it
// completes the VS Code illusion.
//
// Each icon has a CSS tooltip via ::before that appears
// when you hover. This is done with a data-tip attribute
// and a small <style> block injected once.
// ─────────────────────────────────────────────────────────

const icons = [
  { emoji: "📁", tip: "Explorer",      active: true  },
  { emoji: "🔍", tip: "Search"                       },
  { emoji: "🌿", tip: "Source Control"               },
  { emoji: "🧩", tip: "Extensions"                   },
];

export default function ActivityBar() {
  return (
    <>
      <style>{`
        .act-icon { position: relative; }
        .act-icon::after {
          content: attr(data-tip);
          position: absolute;
          left: 54px; top: 50%;
          transform: translateY(-50%);
          background: #252526;
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 11px;
          padding: 4px 10px;
          white-space: nowrap;
          border-radius: 3px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s;
          z-index: 200;
          font-family: var(--font);
        }
        .act-icon:hover::after { opacity: 1; }
      `}</style>

      <div style={rail}>
        {icons.map(({ emoji, tip, active }) => (
          <div
            key={tip}
            className="act-icon"
            data-tip={tip}
            style={{
              ...icon,
              color:      active ? "var(--white)"    : "var(--text-mute)",
              borderLeft: active ? "2px solid var(--white)" : "2px solid transparent",
            }}
          >
            {emoji}
          </div>
        ))}

        {/* Settings pinned to bottom */}
        <div style={{ flex: 1 }} />
        <div className="act-icon" data-tip="Settings" style={{ ...icon, color: "var(--text-mute)", borderLeft: "2px solid transparent" }}>
          ⚙️
        </div>
      </div>
    </>
  );
}

const rail = {
  width: 48,
  background: "#333333",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "8px 0",
  gap: 4,
  flexShrink: 0,
  borderRight: "1px solid var(--border)",
};

const icon = {
  width: 48,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  cursor: "pointer",
  transition: "color 0.15s",
};
