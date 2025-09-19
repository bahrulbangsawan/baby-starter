import Link from "next/link";
import { Card } from "@/components/ui/card";
export default function Home() {
  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Next 15+ Boilerplate</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Private Area</h2>
          <p>Protected routes example</p>
          <Link className="underline" href="/(private)/orgs">Go to Orgs</Link>
        </Card>
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Search</h2>
          <p>Typesense powered search</p>
          <Link className="underline" href="/search">Try Search</Link>
        </Card>
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">AI Demo</h2>
          <Link className="underline" href="/ai-demo">Streaming AI</Link>
        </Card>
        <Card className="p-4 space-y-2">
          <h2 className="font-medium">Map</h2>
          <Link className="underline" href="/map">Leaflet Map</Link>
        </Card>
      </div>
    </main>
  );
}