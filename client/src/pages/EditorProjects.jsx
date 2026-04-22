// src/pages/EditorProjects.jsx
// ─────────────────────────────────────────────────────────
// Two types of clickable token are used here:
//
//   CodeLink — wraps the project TITLE.
//              Clicking opens the GitHub repo directly in a
//              new tab. Colour: cyan (like a hyperlink).
//
//   CodeRef  — wraps the url field string.
//              Clicking opens the DetailPanel on the right
//              with full project info + GitHub button.
//              Colour: yellow (like a function call).
//
// This gives users two natural interaction points, matching
// how developers read code top-to-bottom.
// ─────────────────────────────────────────────────────────

import CodeBlock, { CodeRef, CodeLink, kw, fn_, str, cmt, cls, prop, punc, type as typ } from "../components/CodeBlock";

export default function EditorProjects({ data, onDetail }) {
  const projects = data.projects ?? [];

  const lines = [
    <div><span style={cmt}>{"// projects.ts — Arjit Sharma"}</span></div>,
    <div />,
    <div><span style={kw}>interface </span><span style={cls}>Project </span><span style={punc}>{"{"}</span></div>,
    <div>{"  "}<span style={prop}>title</span><span style={punc}>:  </span><span style={typ}>string</span><span style={punc}>;</span></div>,
    <div>{"  "}<span style={prop}>stack</span><span style={punc}>:  </span><span style={typ}>string[]</span><span style={punc}>;</span></div>,
    <div>{"  "}<span style={prop}>metric</span><span style={punc}>: </span><span style={typ}>string</span><span style={punc}>;</span></div>,
    <div>{"  "}<span style={prop}>url</span><span style={punc}>:    </span><span style={typ}>string</span><span style={punc}>;</span></div>,
    <div><span style={punc}>{"}"}</span></div>,
    <div />,
    <div><span style={kw}>const </span><span style={cls}>projects</span><span style={punc}>: </span><span style={cls}>Project[]</span><span style={punc}> = [</span></div>,
    <div />,

    ...projects.flatMap((p, i) => [
      // Section comment
      <div>{"  "}<span style={punc}>{"{ "}</span><span style={cmt}>{`// ── ${String(i+1).padStart(2,"0")} ${"─".repeat(36)}`}</span></div>,

      // Title — CodeLink → opens GitHub directly
      <div>
        {"    "}<span style={prop}>title</span><span style={punc}>:  </span>
        <CodeLink url={p.github}>
          <span style={{ color: "var(--cyan)" }}>"{p.title}"</span>
        </CodeLink>
        <span style={punc}>,</span>
      </div>,

      // Stack
      <div>
        {"    "}<span style={prop}>stack</span><span style={punc}>:  </span>
        <span style={punc}>[</span>
        {p.stack.map((s, j) => (
          <span key={s}>
            <span style={str}>"{s}"</span>
            {j < p.stack.length - 1 && <span style={punc}>, </span>}
          </span>
        ))}
        <span style={punc}>],</span>
      </div>,

      // Metric
      <div>{"    "}<span style={prop}>metric</span><span style={punc}>: </span><span style={str}>"{p.metric}"</span><span style={punc}>,</span></div>,

      // URL — CodeRef → opens detail panel
      <div>
        {"    "}<span style={prop}>url</span><span style={punc}>:    </span>
        <CodeRef type="project" id={p.id}>
          <span style={str}>"{p.github.replace("https://", "")}"</span>
        </CodeRef>
        <span style={punc}>,</span>
      </div>,

      <div>{"  "}<span style={punc}>{"}"}{i < projects.length - 1 ? "," : ""}</span></div>,
      <div />,
    ]),

    <div><span style={punc}>];</span></div>,
    <div />,
    <div><span style={fn_}>export default </span><span style={cls}>projects</span><span style={punc}>;</span></div>,
  ];

  return (
    <CodeBlock lineCount={lines.length} onDetail={onDetail}>
      {lines}
    </CodeBlock>
  );
}
