// src/App.jsx
// ─────────────────────────────────────────────────────────
// Root component. Owns two pieces of state:
//   activeTab   — which file tab is open
//   detailItem  — what the right-side detail panel shows
//                 (null = empty, or { type, id } object)
//
// detailItem is passed down to DetailPanel and set from
// inside editor pages via the onDetail callback prop.
// This is "lifting state up" — the editors don't own the
// panel, they just signal what should be shown.
// ─────────────────────────────────────────────────────────

import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

import TitleBar    from "./components/TitleBar";
import TabBar      from "./components/TabBar";
import ActivityBar from "./components/ActivityBar";
import Sidebar     from "./components/Sidebar";
import DetailPanel from "./components/DetailPanel";
import EditorAbout      from "./pages/EditorAbout";
import EditorSkills     from "./pages/EditorSkills";
import EditorProjects   from "./pages/EditorProjects";
import EditorExperience from "./pages/EditorExperience";
import Terminal    from "./components/Terminal";
import StatusBar   from "./components/StatusBar";

export const TABS = [
  { id: "about",      label: "about.md",     icon: "📄", lang: "Markdown",    iconColor: null },
  { id: "skills",     label: "skills.js",    icon: "JS", lang: "JavaScript",  iconColor: "#f7df1e" },
  { id: "projects",   label: "projects.ts",  icon: "TS", lang: "TypeScript",  iconColor: "#3178c6" },
  { id: "experience", label: "experience.py",icon: "PY", lang: "Python",      iconColor: "#3572A5" },
];

export default function App() {
  const [activeTab,  setActiveTab]  = useState("about");
  const [detailItem, setDetailItem] = useState(null);

  const { data, loading } = useFetch("/api/all");
  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div style={shell}>
      <TitleBar />
      <TabBar tabs={TABS} active={activeTab} onSelect={setActiveTab} />

      <div style={workspace}>
        <ActivityBar />
        <Sidebar tabs={TABS} active={activeTab} onSelect={setActiveTab} />

        <div style={editorCol}>
          {/* Breadcrumb */}
          <div style={breadcrumb}>
            <span>arjit-sharma</span>
            <span style={{ opacity: 0.4 }}>›</span>
            <span>{currentTab?.label}</span>
          </div>

          {/* Editor area: code pane + detail panel side by side */}
          <div style={editorArea}>

            {/* Code pane */}
            <div style={codePane}>
              {loading && <Skeleton />}
              {!loading && data && (
                <>
                  {activeTab === "about"      && <EditorAbout      data={data} onDetail={setDetailItem} />}
                  {activeTab === "skills"     && <EditorSkills     data={data} onDetail={setDetailItem} />}
                  {activeTab === "projects"   && <EditorProjects   data={data} onDetail={setDetailItem} />}
                  {activeTab === "experience" && <EditorExperience data={data} onDetail={setDetailItem} />}
                </>
              )}
            </div>

            {/* Detail panel — always visible, empty state when nothing selected */}
            <DetailPanel
              item={detailItem}
              data={data}
              onClose={() => setDetailItem(null)}
            />
          </div>

          {!loading && data && <Terminal lines={data.terminal} />}
        </div>
      </div>

      <StatusBar lang={currentTab?.lang ?? "Plain Text"} />
    </div>
  );
}

function Skeleton() {
  return (
    <div style={{ padding: "24px 24px 0 74px", opacity: 0.25, flex: 1 }}>
      {Array.from({ length: 14 }, (_, i) => (
        <div key={i} style={{ height: 14, marginBottom: 8, borderRadius: 2, background: "#555", width: `${30 + Math.random() * 55}%` }} />
      ))}
    </div>
  );
}

const shell       = { display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden", background:"var(--bg-dark)" };
const workspace   = { flex:1, display:"flex", overflow:"hidden" };
const editorCol   = { flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:"var(--bg)" };
const breadcrumb  = { height:22, borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", padding:"0 16px", gap:6, fontSize:12, color:"var(--text-mute)", flexShrink:0 };
const editorArea  = { flex:1, display:"flex", overflow:"hidden" };
const codePane    = { flex:1, display:"flex", flexDirection:"column", overflow:"hidden" };
