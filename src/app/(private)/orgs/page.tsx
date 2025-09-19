"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrg, listOrgs } from "@/app/actions/orgs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function OrgsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["orgs"], queryFn: () => listOrgs() });
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: (payload: { name: string }) => createOrg(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orgs"] });
      setName("");
    },
  });

  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-xl font-semibold">Organizations</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate({ name }); }}
        className="flex gap-2"
      >
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Organization name" />
        <Button type="submit" disabled={!name}>Add</Button>
      </form>
      <ul className="list-disc pl-6">
        {data?.map((o: any) => <li key={o.id}>{o.name}</li>)}
      </ul>
    </div>
  );
}