// src/components/DetailPanel.jsx
// ─────────────────────────────────────────────────────────
// The right-side panel that shows project or social details
// when something is clicked in the editor code.
//
// Props:
//   item    — { type: "project"|"social", id: string } or null
//   data    — full API data object
//   onClose — callback to clear selection
//
// When item is null, shows an empty/hint state.
// When item.type === "project", renders the project card
//   with description, metrics, stack tags, and GitHub button.
// When item.type === "social", renders the social link card
//   with an open button.
// ─────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";

export default function DetailPanel({ item, data, onClose }) {
  return (
    <div style={panel}>
      {/* Header */}
      <div style={header}>
        <span style={{ color: "var(--green)", fontStyle: "italic" }}>
          {item ? `// ${item.type} · details` : "// details"}
        </span>
        {item && (
          <button onClick={onClose} style={closeBtn} title="Close panel">✕</button>
        )}
      </div>

      {/* Body */}
      <div style={body}>
        <AnimatePresence mode="wait">
          {!item && <EmptyState key="empty" />}

          {item?.type === "project" && data && (
            <ProjectCard
              key={item.id}
              project={data.projects.find(p => p.id === item.id)}
              index={data.projects.findIndex(p => p.id === item.id)}
            />
          )}

          {item?.type === "social" && data && (
            <SocialCard
              key={item.id}
              social={data.profile.social[item.id]}
              platform={item.id}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────
function EmptyState() {
  return (
    <motion.div
      style={emptyWrap}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div style={{ fontSize: 28, opacity: 0.3 }}>▷</div>
      <div style={{ fontSize: 12, color: "var(--text-mute)", textAlign: "center", lineHeight: 1.6 }}>
        Click a project title<br />or social link in the code
      </div>
    </motion.div>
  );
}

// ── Project card ──────────────────────────────────────────
// Shows all project details + a GitHub button that opens
// the real repo URL in a new tab.
function ProjectCard({ project, index }) {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Number badge */}
      <div style={numBadge}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Title */}
      <div style={projectTitle}>{project.title}</div>

      {/* Description */}
      <p style={desc}>{project.desc}</p>

      {/* Metric box */}
      <div style={metricBox}>
        <span style={{ color: "var(--text-mute)", fontSize: 10, display: "block", marginBottom: 3 }}>
          // metrics
        </span>
        {project.metric}
      </div>

      {/* Stack tags */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: "var(--text-mute)", fontSize: 10, display: "block", marginBottom: 6 }}>
          // stack
        </span>
        <div style={tagWrap}>
          {project.stack.map(s => (
            <span key={s} style={stackTag}>{s}</span>
          ))}
        </div>
      </div>

      {/* GitHub button */}
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        style={ghBtn}
        onMouseEnter={e => { e.target.style.background = "#21262d"; e.target.style.color = "#fff"; }}
        onMouseLeave={e => { e.target.style.background = "#161b22"; e.target.style.color = "#8b949e"; }}
      >
        ⬡ &nbsp;View on GitHub
      </a>
    </motion.div>
  );
}

// ── Social card ───────────────────────────────────────────
// Shows platform info + a button that opens the real URL.
const platformIcons = {
  github:   "⬡",
  linkedin: "in",
  email:    "@",
  leetcode: "LC",
};

const platformColors = {
  github:   { bg: "#161b22", border: "#30363d", fg: "#8b949e", hover: "#21262d" },
  linkedin: { bg: "#0a1628", border: "#1a3a6a", fg: "#4fc1ff", hover: "#0d2040" },
  email:    { bg: "#1a0d2e", border: "#3a1a6a", fg: "#c586c0", hover: "#250d3a" },
  leetcode: { bg: "#1a1200", border: "#4a3a00", fg: "#ffa116", hover: "#251a00" },
};

function SocialCard({ social, platform }) {
  if (!social) return null;
  const colors = platformColors[platform] ?? platformColors.github;

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Icon circle */}
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: colors.bg, border: `1px solid ${colors.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, color: colors.fg, marginBottom: 12,
      }}>
        {platformIcons[platform] ?? "↗"}
      </div>

      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--cyan)", marginBottom: 4, textTransform: "capitalize" }}>
        {platform}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-mute)", marginBottom: 16, lineHeight: 1.5 }}>
        {social.desc}
      </div>
      <div style={{ fontSize: 11, color: "var(--text)", marginBottom: 18, wordBreak: "break-all" }}>
        {social.label}
      </div>

      {/* Open button */}
      <a
        href={social.url}
        target={platform === "email" ? "_self" : "_blank"}
        rel="noreferrer"
        style={{
          display: "block", width: "100%", padding: "9px 0",
          background: colors.bg, border: `1px solid ${colors.border}`,
          borderRadius: 4, fontSize: 12, color: colors.fg,
          textAlign: "center", fontFamily: "var(--font)",
          textDecoration: "none", transition: "background 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = colors.hover; }}
        onMouseLeave={e => { e.currentTarget.style.background = colors.bg; }}
      >
        ↗ &nbsp;Open {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </a>
    </motion.div>
  );
}

// ── Styles ────────────────────────────────────────────────
const panel = {
  width: 260,
  background: "#1a1a1a",
  borderLeft: "1px solid var(--border)",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const header = {
  padding: "9px 14px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.06em",
  borderBottom: "1px solid var(--border)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
};

const closeBtn = {
  fontSize: 11, color: "var(--text-mute)", cursor: "pointer",
  padding: "2px 5px", borderRadius: 3, background: "transparent",
  border: "none", fontFamily: "var(--font)",
};

const body = {
  flex: 1, overflowY: "auto", padding: 14,
};

const emptyWrap = {
  display: "flex", flexDirection: "column", alignItems: "center",
  justifyContent: "center", height: "100%", gap: 10, opacity: 0.45,
};

const numBadge = {
  fontFamily: "var(--font)", fontSize: "2rem", color: "#2a2a2a",
  lineHeight: 1, marginBottom: 4, userSelect: "none",
};

const projectTitle = {
  fontSize: 13, fontWeight: 500, color: "var(--cyan)",
  marginBottom: 8, lineHeight: 1.4,
};

const desc = {
  fontSize: 11, color: "var(--text)", lineHeight: 1.65, marginBottom: 14,
};

const metricBox = {
  background: "#0d1f2d", border: "1px solid #1a3a52",
  borderRadius: 4, padding: "8px 10px", fontSize: 11,
  color: "#4fc1ff", marginBottom: 14, lineHeight: 1.5,
};

const tagWrap = { display: "flex", flexWrap: "wrap", gap: 5 };

const stackTag = {
  background: "#1a1a2e", border: "1px solid #2a2a4e",
  borderRadius: 3, padding: "2px 7px", fontSize: 10, color: "#9a9adf",
};

const ghBtn = {
  display: "block", width: "100%", padding: "8px 0",
  background: "#161b22", border: "1px solid #30363d",
  borderRadius: 4, fontSize: 12, color: "#8b949e",
  textAlign: "center", fontFamily: "var(--font)",
  textDecoration: "none", transition: "background 0.15s, color 0.15s",
  cursor: "pointer",
};
