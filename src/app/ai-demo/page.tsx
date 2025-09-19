"use client";
import { useState } from "react";
export default function AiDemo() {
  const [out, setOut] = useState(""); const [loading, setLoading] = useState(false);
  async function run(prompt: string) {
    setLoading(true);
    const res = await fetch("/api/ai", { method: "POST", body: JSON.stringify({ prompt }) });
    const reader = res.body!.getReader(); const decoder = new TextDecoder(); let txt = "";
    while (true) { const { done, value } = await reader.read(); if (done) break; txt += decoder.decode(value, { stream: true }); setOut(txt); }
    setLoading(false);
  }
  return (
    <div className="container py-8 space-y-3">
      <button className="border rounded px-3 py-2" onClick={() => run("Write a 2-line summary about efficient public service portals.")} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <pre className="whitespace-pre-wrap border rounded p-3">{out}</pre>
    </div>
  );
}