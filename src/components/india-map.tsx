
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { MapContainerProps } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.25);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

interface RegionData {
  name: string;
  position: [number, number];
  current: string;
  rainfall: number;
  humidity: number;
  moisture?: number;
  pressure?: number;
}

interface IndiaMapProps {
  regions: RegionData[];
  center?: [number, number];
  zoom?: number;
}

// Makes the map fit bounds of the regions (optional; for Mumbai, will zoom to Mumbai)
function MapBounds({ regions }: { regions: RegionData[] }) {
  const map = useMap();
  useEffect(() => {
    if (regions.length > 0) {
      const bounds = L.latLngBounds(
        regions.map((region) => L.latLng(region.position[0], region.position[1]))
      );
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    }
  }, [regions, map]);
  return null;
}

export function IndiaMap({ regions, center = [19.076, 72.8777], zoom = 11 }: IndiaMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  // Determine marker color based on rainfall amount
  const getMarkerColor = (rainfall: number) => {
    if (rainfall === 0) return "#4ADE80";
    if (rainfall < 5) return "#60A5FA";
    if (rainfall < 15) return "#818CF8";
    return "#F87171";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full h-[400px] rounded-xl overflow-hidden shadow-xl relative"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Optional: auto-fit bounds if there are multiple regions */}
        <MapBounds regions={regions} />
        {regions.map((region) => (
          <Marker
            key={region.name}
            position={region.position}
            icon={createCustomIcon(getMarkerColor(region.rainfall))}
            eventHandlers={{
              click: () => setSelectedRegion(region),
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-primary">{region.name}</h3>
                <p className="text-sm">{region.current}</p>
                <p className="text-xs">Rainfall: {region.rainfall} mm</p>
                <p className="text-xs">Humidity: {region.humidity}%</p>
                {typeof region.moisture === "number" && (
                  <p className="text-xs">Moisture: {region.moisture}%</p>
                )}
                {typeof region.pressure === "number" && (
                  <p className="text-xs">Pressure: {region.pressure} hPa</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* Slide up info card for selected region */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-4 p-4 bg-white/85 dark:bg-black/70 backdrop-blur-xl rounded-2xl shadow-lg z-[1000] max-w-xs"
        >
          <h3 className="font-bold text-primary">{selectedRegion.name}</h3>
          <p className="text-sm">{selectedRegion.current}</p>
          <div className="mt-1 flex flex-col gap-1 text-xs">
            <span>Rainfall: {selectedRegion.rainfall} mm</span>
            <span>Humidity: {selectedRegion.humidity}%</span>
            {typeof selectedRegion.moisture === "number" && (
              <span>Moisture: {selectedRegion.moisture}%</span>
            )}
            {typeof selectedRegion.pressure === "number" && (
              <span>Pressure: {selectedRegion.pressure} hPa</span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
