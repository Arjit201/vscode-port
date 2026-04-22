// src/pages/EditorExperience.jsx
// Renders "experience.py" with Python dataclass syntax.

import CodeBlock, { kw, fn_, str, num, cmt, cls, prop, punc, type as typ, dec } from "../components/CodeBlock";

export default function EditorExperience({ data, onDetail }) {
  const experience = data.experience ?? [];
  const education  = data.education  ?? [];
  const courses    = data.courses    ?? [];

  const lines = [
    <div><span style={cmt}>{"# experience.py — Arjit Sharma"}</span></div>,
    <div />,
    <div><span style={kw}>from </span><span style={cls}>dataclasses </span><span style={kw}>import </span><span style={fn_}>dataclass</span></div>,
    <div><span style={kw}>from </span><span style={cls}>typing </span><span style={kw}>import </span><span style={cls}>List</span></div>,
    <div />,
    <div><span style={dec}>@dataclass</span></div>,
    <div><span style={kw}>class </span><span style={cls}>Experience</span><span style={punc}>:</span></div>,
    <div>{"    "}<span style={prop}>role</span><span style={punc}>:    </span><span style={typ}>str</span></div>,
    <div>{"    "}<span style={prop}>org</span><span style={punc}>:     </span><span style={typ}>str</span></div>,
    <div>{"    "}<span style={prop}>period</span><span style={punc}>:  </span><span style={typ}>str</span></div>,
    <div>{"    "}<span style={prop}>points</span><span style={punc}>:  </span><span style={cls}>List</span><span style={punc}>[</span><span style={typ}>str</span><span style={punc}>]</span></div>,
    <div />,
    <div><span style={cmt}>{"# ── Work Experience ────────────────────────────"}</span></div>,
    <div />,
    ...experience.flatMap((exp, ei) => [
      <div><span style={prop}>{`exp_${ei + 1}`}</span><span style={punc}> = </span><span style={cls}>Experience</span><span style={punc}>(</span></div>,
      <div>{"    "}<span style={prop}>role</span><span style={punc}>   = </span><span style={str}>"{exp.role}"</span><span style={punc}>,</span></div>,
      <div>{"    "}<span style={prop}>org</span><span style={punc}>    = </span><span style={str}>"{exp.org}"</span><span style={punc}>,</span></div>,
      <div>{"    "}<span style={prop}>period</span><span style={punc}> = </span><span style={str}>"{exp.period}"</span><span style={punc}>,</span></div>,
      <div>{"    "}<span style={prop}>points</span><span style={punc}> = [</span></div>,
      ...(exp.points ?? []).map(pt => <div>{"        "}<span style={str}>"{pt}"</span><span style={punc}>,</span></div>),
      <div>{"    "}<span style={punc}>]</span></div>,
      <div><span style={punc}>)</span></div>,
      <div />,
    ]),

    <div><span style={cmt}>{"# ── Education ──────────────────────────────────"}</span></div>,
    <div />,
    <div><span style={prop}>education</span><span style={punc}> = [</span></div>,
    ...education.flatMap(ed => [
      <div>{"    "}<span style={punc}>{"{"}</span></div>,
      <div>{"        "}<span style={str}>"degree"</span><span style={punc}> : </span><span style={str}>"{ed.degree}"</span><span style={punc}>,</span></div>,
      <div>{"        "}<span style={str}>"inst"</span><span style={punc}>   : </span><span style={str}>"{ed.inst}"</span><span style={punc}>,</span></div>,
      <div>{"        "}<span style={str}>"period"</span><span style={punc}> : </span><span style={str}>"{ed.period}"</span><span style={punc}>,</span></div>,
      <div>{"        "}<span style={str}>"score"</span><span style={punc}>  : </span><span style={str}>"{ed.score}"</span><span style={punc}>,</span></div>,
      <div>{"    "}<span style={punc}>{"}"}</span><span style={punc}>,</span></div>,
    ]),
    <div><span style={punc}>]</span></div>,
    <div />,

    <div><span style={cmt}>{"# ── Courses ────────────────────────────────────"}</span></div>,
    <div />,
    <div><span style={prop}>courses</span><span style={punc}> = [</span></div>,
    ...courses.map(c => <div>{"    "}<span style={str}>"{c.title} — {c.platform} ({c.year})"</span><span style={punc}>,</span></div>),
    <div><span style={punc}>]</span></div>,
  ];

  return (
    <CodeBlock lineCount={lines.length} onDetail={onDetail}>
      {lines}
    </CodeBlock>
  );
}
