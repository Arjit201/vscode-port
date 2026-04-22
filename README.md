# Arjit Sharma — VS Code Portfolio v2

Dark-themed portfolio mimicking a VS Code / Terminal interface.
Built with React (Vite) + Node.js (Express).

## What's new in v2
- **Clickable project titles & GitHub URLs** in the code — opens a detail panel
- **Clickable social links** (GitHub, LinkedIn, Email, LeetCode) in about.md
- **Detail panel** on the right side shows full project info + a real GitHub button
- **Social cards** with platform-coloured "Open" buttons that link out directly

---

## Project Structure

```
portfolio-vscode-v2/
├── package.json
├── server/
│   ├── index.js          ← All your data + Express routes
│   └── package.json
└── client/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx                  ← Tab state + detailItem state
        ├── styles/global.css        ← VS Code colour tokens
        ├── hooks/useFetch.js
        ├── components/
        │   ├── TitleBar.jsx
        │   ├── TabBar.jsx
        │   ├── ActivityBar.jsx
        │   ├── Sidebar.jsx
        │   ├── CodeBlock.jsx        ← Now exports <CodeRef> + DetailContext
        │   ├── DetailPanel.jsx      ← NEW: right-side project/social panel
        │   ├── Terminal.jsx
        │   └── StatusBar.jsx
        └── pages/
            ├── EditorAbout.jsx      ← Social links as <CodeRef>
            ├── EditorSkills.jsx
            ├── EditorProjects.jsx   ← Project titles/URLs as <CodeRef>
            └── EditorExperience.jsx
```

---

## How clicking works

```
User clicks underlined token in editor
  └─ CodeRef fires onDetail({ type, id })
       └─ DetailContext passes it up to CodeBlock
            └─ CodeBlock calls onDetail prop
                 └─ App.jsx sets detailItem state
                      └─ DetailPanel re-renders with project/social data
```

This is a React pattern called "lifting state up" + Context.
The editors don't own the panel — they just signal what to show.

---

## Setup

```bash
npm run install:all
npm run dev
# → http://localhost:5173
```

## Customising

| What                    | Where                              |
|-------------------------|------------------------------------|
| Projects + social links | `server/index.js` → `data`         |
| Add a new social        | Add to `data.profile.social` + add a `<CodeRef>` line in EditorAbout |
| Platform button colours | `DetailPanel.jsx` → `platformColors` |
| Terminal lines          | `server/index.js` → `data.terminal` |
