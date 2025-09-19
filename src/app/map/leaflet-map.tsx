"use client";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap() {
  useEffect(() => {
    const map = L.map("map", { center: [-2.5, 140.7], zoom: 10 });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
    L.marker([-2.5, 140.7]).addTo(map).bindPopup("Hello Papua");
    return () => map.remove();
  }, []);
  return <div id="map" className="h-[420px] w-full rounded-xl border" />;
}