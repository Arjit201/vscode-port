// src/pages/EditorAbout.jsx
// ─────────────────────────────────────────────────────────
// Renders "about.md" tab with your profile as JS syntax.
// Social links are rendered as <CodeRef type="social" id="...">
// so clicking them opens the DetailPanel with an "Open" button.
// ─────────────────────────────────────────────────────────

import CodeBlock, { CodeRef, kw, fn_, str, num, cmt, cls, prop, punc } from "../components/CodeBlock";

export default function EditorAbout({ data, onDetail }) {
  const p = data.profile;

  const lines = [
    <div><span style={cmt}>{"// ─────────────────────────────────────────────"}</span></div>,
    <div><span style={cmt}>{"//  ARJIT SHARMA · Backend Engineer in progress"}</span></div>,
    <div><span style={cmt}>{"// ─────────────────────────────────────────────"}</span></div>,
    <div />,
    <div><span style={kw}>const </span><span style={cls}>developer</span><span style={punc}> = {"{"}</span></div>,
    <div>{"  "}<span style={prop}>name</span><span style={punc}>:       </span><span style={str}>"{p.name}"</span><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>role</span><span style={punc}>:       </span><span style={str}>"{p.role}"</span><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>location</span><span style={punc}>:  </span><span style={str}>"{p.location} 🇮🇳"</span><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>cgpa</span><span style={punc}>:      </span><span style={num}>{p.cgpa}</span><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>expected</span><span style={punc}>: </span><span style={str}>"{p.expected}"</span><span style={punc}>,</span></div>,
    <div><span style={punc}>{"};  "}</span></div>,
    <div />,
    <div><span style={cmt}>{"// What I care about"}</span></div>,
    <div><span style={kw}>const </span><span style={cls}>focus</span><span style={punc}> = [</span></div>,
    ...(p.focus ?? []).map(f => <div>{"  "}<span style={str}>"{f}"</span><span style={punc}>,</span></div>),
    <div><span style={punc}>];</span></div>,
    <div />,
    <div><span style={cmt}>{"// Currently learning"}</span></div>,
    <div><span style={kw}>const </span><span style={cls}>onMyDesk</span><span style={punc}> = {"{"}</span></div>,
    <div>{"  "}<span style={prop}>reading</span><span style={punc}>:   </span><span style={str}>"{p.learning?.reading}"</span><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>exploring</span><span style={punc}>: </span><span style={str}>"{p.learning?.exploring}"</span><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>building</span><span style={punc}>:  </span><span style={str}>"{p.learning?.building}"</span><span style={punc}>,</span></div>,
    <div><span style={punc}>{"};  "}</span></div>,
    <div />,
    <div><span style={cmt}>{"// Social links — click to open ↗"}</span></div>,
    <div><span style={kw}>const </span><span style={cls}>links</span><span style={punc}> = {"{"}</span></div>,
    <div>{"  "}<span style={prop}>github</span><span style={punc}>:   </span><CodeRef type="social" id="github"><span style={str}>"{p.social?.github?.label}"</span></CodeRef><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>linkedin</span><span style={punc}>: </span><CodeRef type="social" id="linkedin"><span style={str}>"{p.social?.linkedin?.label}"</span></CodeRef><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>email</span><span style={punc}>:    </span><CodeRef type="social" id="email"><span style={str}>"{p.social?.email?.label}"</span></CodeRef><span style={punc}>,</span></div>,
    <div>{"  "}<span style={prop}>leetcode</span><span style={punc}>: </span><CodeRef type="social" id="leetcode"><span style={str}>"{p.social?.leetcode?.label}"</span></CodeRef><span style={punc}>,</span></div>,
    <div><span style={punc}>{"};  "}</span></div>,
    <div />,
    <div><span style={fn_}>export default </span><span style={cls}>developer</span><span style={punc}>;</span></div>,
  ];

  return (
    <CodeBlock lineCount={lines.length} onDetail={onDetail}>
      {lines}
    </CodeBlock>
  );
}
