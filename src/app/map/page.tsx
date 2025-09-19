import LeafletMap from "./leaflet-map";
export default function MapPage() {
  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-xl font-semibold">Map (Leaflet)</h1>
      <LeafletMap />
    </div>
  );
}