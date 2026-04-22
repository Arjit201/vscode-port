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

---

## Deployment

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "init: portfolio"
git remote add origin https://github.com/Arjit201/portfolio-vscode.git
git push -u origin main
```

### Step 2 — Deploy backend on Render (free)
1. Go to https://render.com → New → Web Service
2. Connect your GitHub repo
3. Set:
   - Root Directory:   `server`
   - Build Command:    `npm install`
   - Start Command:    `node index.js`
4. Click Deploy
5. Copy your Render URL → looks like `https://arjit-portfolio.onrender.com`

### Step 3 — Update your Render URL
Open `client/.env.production` and replace the placeholder:
```
VITE_API_URL=https://arjit-portfolio.onrender.com
```
Commit and push this change.

### Step 4 — Deploy frontend on Vercel (free)
1. Go to https://vercel.com → New Project → import your GitHub repo
2. Set:
   - Root Directory:   `client`
   - Build Command:    `npm run build`
   - Output Directory: `dist`
3. Add environment variable:
   - Name:  `VITE_API_URL`
   - Value: `https://arjit-portfolio.onrender.com`
4. Click Deploy
5. Your site is live at `https://arjit-portfolio.vercel.app` 🎉

### Keep Render awake (optional)
Render free tier sleeps after 15min inactivity → slow first load.
Fix: go to https://uptimerobot.com → add HTTP monitor for your
Render URL → ping every 10 minutes → server stays warm.
