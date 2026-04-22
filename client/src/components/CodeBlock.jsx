// src/components/CodeBlock.jsx
// ─────────────────────────────────────────────────────────
// Scrollable code area with line numbers + minimap.
//
// NEW in v2: exports a <CodeRef> component that renders
// a clickable, dotted-underlined token. When clicked, it
// calls onDetail({ type, id }) via context, which bubbles
// up to App.jsx's detailItem state.
// ─────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useRef } from "react";

// Context so nested <CodeRef> components can fire onDetail
// without prop-drilling through every code line.
export const DetailContext = createContext(() => {});

export default function CodeBlock({ children, lineCount = 30, onDetail }) {
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [children]);

  return (
    <DetailContext.Provider value={onDetail ?? (() => {})}>
      <div style={outer}>
        <div ref={scrollRef} style={scroller}>
          <div style={inner}>
            {/* Line number gutter */}
            <div style={gutter} aria-hidden>
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} style={gutterLine}>{i + 1}</div>
              ))}
            </div>
            {/* Code content */}
            <div style={code}>{children}</div>
          </div>
        </div>
        <Minimap count={lineCount} />
      </div>
    </DetailContext.Provider>
  );
}

// ── CodeRef ───────────────────────────────────────────────
// Clickable token inside code. Fires onDetail from context.
// type: "project" | "social"
// id:   project id (e.g. "p1") or social key (e.g. "github")
export function CodeRef({ children, type, id }) {
  const onDetail = useContext(DetailContext);
  return (
    <span
      style={refStyle}
      onClick={() => onDetail({ type, id })}
      title={`Click to open ${type} details`}
    >
      {children}
    </span>
  );
}

// ── Minimap ───────────────────────────────────────────────
function Minimap({ count }) {
  return (
    <div style={minimap} aria-hidden>
      {Array.from({ length: Math.min(count, 80) }, (_, i) => (
        <div key={i} style={{
          height: 3, borderRadius: 1, marginBottom: 1,
          width: `${15 + Math.random() * 80}%`,
          background: i % 13 === 0 ? "var(--blue)" : i % 7 === 0 ? "var(--text-mute)" : "#3c3c3c",
          opacity:    i % 13 === 0 ? 0.7 : i % 7 === 0 ? 0.5 : 0.25,
        }} />
      ))}
    </div>
  );
}

// ── Syntax helpers ─────────────────────────────────────────
// Import these in page components to colour tokens.
export const kw   = { color: "var(--blue)"   };
export const fn_  = { color: "var(--yellow)" };
export const str  = { color: "var(--orange)" };
export const num  = { color: "var(--green)"  };
export const cmt  = { color: "var(--green)", fontStyle: "italic" };
export const cls  = { color: "var(--cyan)"   };
export const prop = { color: "var(--text)"   };
export const punc = { color: "var(--text-mute)" };
export const type = { color: "var(--cyan)"   };
export const dec  = { color: "var(--purple)" };

// ── Layouts ────────────────────────────────────────────────
const outer   = { display:"flex", flex:1, overflow:"hidden", animation:"fadeSlideIn .2s ease" };
const scroller= { flex:1, overflowY:"auto", overflowX:"auto" };
const inner   = { display:"flex", minHeight:"100%", padding:"20px 0" };
const gutter  = { width:50, paddingRight:16, textAlign:"right", color:"var(--text-mute)", fontSize:12, lineHeight:"22px", flexShrink:0, userSelect:"none", borderRight:"1px solid var(--border)" };
const gutterLine = { paddingRight:12, paddingLeft:8 };
const code    = { flex:1, paddingLeft:24, paddingRight:24, fontSize:13, lineHeight:"22px", fontFamily:"var(--font)", whiteSpace:"pre" };
const minimap = { width:56, background:"var(--bg-dark)", flexShrink:0, borderLeft:"1px solid var(--border)", padding:"8px 4px", overflowY:"hidden", opacity:0.45 };
const refStyle= {
  color: "var(--yellow)", cursor: "pointer",
  textDecoration: "underline", textDecorationStyle: "dotted",
  textDecorationColor: "#555", transition: "color .15s",
};

// ── CodeLink ──────────────────────────────────────────────
// Clickable token that opens a URL directly in a new tab.
// Use this for project TITLES so one click goes to GitHub.
// CodeRef (above) opens the detail panel — use that for
// the url field so users can still see the panel if wanted.
export function CodeLink({ children, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ ...refStyle, color: "var(--cyan)", textDecorationColor: "#2a6a6a", textDecoration: "underline", textDecorationStyle: "dotted" }}
      title={"Open " + url}
    >
      {children}
    </a>
  );
}
