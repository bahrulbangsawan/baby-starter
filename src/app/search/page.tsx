"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<any[]>([]);
  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-xl font-semibold">Search (Typesense)</h1>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setHits(data.hits ?? data.documents ?? []);
      }} className="flex gap-2">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orgs..." />
        <button className="border rounded px-3">Search</button>
      </form>
      <div className="grid gap-2">
        {hits.map((h: any) => (
          <Card key={h.document?.id || h.id} className="p-3">{h.document?.name || h.name}</Card>
        ))}
      </div>
    </div>
  );
}