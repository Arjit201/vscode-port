// src/hooks/useFetch.js
// ─────────────────────────────────────────────────────────
// Generic fetch hook. Returns { data, loading, error }.
//
// BASE URL logic:
//   In development → VITE_API_URL is undefined → BASE = ""
//   → fetch("/api/all") hits localhost:5000 via Vite proxy
//
//   In production (Vercel) → VITE_API_URL is set to your
//   Render URL → fetch("https://your-app.onrender.com/api/all")
//   → hits the live backend directly
//
// import.meta.env is Vite's way of reading environment
// variables — only variables prefixed with VITE_ are
// exposed to the browser for security reasons.
// ─────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

const BASE = import.meta.env.VITE_API_URL ?? "";

export function useFetch(url) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(BASE + url)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => { setData(d);           setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}
