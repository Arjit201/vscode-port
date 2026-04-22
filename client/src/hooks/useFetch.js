// src/hooks/useFetch.js
// ─────────────────────────────────────────────────────────
// Generic fetch hook. Returns { data, loading, error }.
// The component re-renders automatically when data arrives.
// ─────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => { setData(d);          setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}
