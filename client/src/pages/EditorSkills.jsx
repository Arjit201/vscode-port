// src/pages/EditorSkills.jsx
// Renders "skills.js" with coloured tag pills + proficiency bars.
import CodeBlock, { kw, fn_, str, cmt, cls, prop, punc } from "../components/CodeBlock";

const colorMap = {
  blue:   { bg:"#0d3a5c", fg:"#4fc1ff", bdr:"#1a6a9a" },
  green:  { bg:"#0d3a1a", fg:"#4ec9b0", bdr:"#1a6a4a" },
  purple: { bg:"#2d1a3a", fg:"#c586c0", bdr:"#5a3a7a" },
  orange: { bg:"#3a1e0d", fg:"#ce9178", bdr:"#7a4a1a" },
};

function Tag({ label, color }) {
  const c = colorMap[color] ?? colorMap.blue;
  return (
    <span style={{ display:"inline-block", background:c.bg, color:c.fg, border:`1px solid ${c.bdr}`, borderRadius:3, padding:"1px 6px", fontSize:11, margin:"1px 3px", fontFamily:"var(--font)" }}>
      {label}
    </span>
  );
}

export default function EditorSkills({ data, onDetail }) {
  const skills      = data.skills      ?? [];
  const proficiency = data.proficiency ?? [];

  const lines = [
    <div><span style={cmt}>{"// skills.js — Arjit Sharma"}</span></div>,
    <div><span style={cmt}>{"// Last modified: April 2026"}</span></div>,
    <div />,
    <div><span style={kw}>const </span><span style={cls}>skills</span><span style={punc}> = {"{"}</span></div>,
    <div />,
    ...skills.flatMap(group => [
      <div>{"  "}<span style={prop}>{group.category}</span><span style={punc}>: [</span></div>,
      <div style={{ paddingLeft: 16 }}>{"    "}{group.items.map(item => <Tag key={item} label={item} color={group.color} />)}</div>,
      <div>{"  "}<span style={punc}>],</span></div>,
      <div />,
    ]),
    <div><span style={punc}>{"};  "}</span></div>,
    <div />,
    <div><span style={cmt}>{"// ── Proficiency ────────────────────────────"}</span></div>,
    <div />,
    <div><span style={fn_}>function </span><span style={fn_}>proficiency</span><span style={punc}>(</span><span style={cls}>lang</span><span style={punc}>) {"{"}</span></div>,
    <div>{"  "}<span style={kw}>const </span><span style={prop}>map</span><span style={punc}> = {"{"}</span></div>,
    ...proficiency.map(({ lang, fill }) => {
      const bar = "█".repeat(fill) + "░".repeat(10 - fill);
      return (
        <div>{"    "}<span style={str}>"{lang}"</span><span style={punc}>: </span><span style={str}>"{bar}"</span><span style={punc}>,</span><span style={cmt}>{`  // ${fill}/10`}</span></div>
      );
    }),
    <div>{"  "}<span style={punc}>{"};  "}</span></div>,
    <div>{"  "}<span style={kw}>return </span><span style={prop}>map</span><span style={punc}>[</span><span style={cls}>lang</span><span style={punc}>];</span></div>,
    <div><span style={punc}>{"}"}</span></div>,
    <div />,
    <div><span style={fn_}>export </span><span style={punc}>{"{ "}</span><span style={cls}>skills</span><span style={punc}>, </span><span style={cls}>proficiency</span><span style={punc}>{" };"}</span></div>,
  ];

  return (
    <CodeBlock lineCount={lines.length} onDetail={onDetail}>
      {lines}
    </CodeBlock>
  );
}
