
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
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

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

interface RegionData {
  name: string;
  position: [number, number];
  current: string;
  rainfall: number;
  humidity: number;
}

interface IndiaMapProps {
  regions: RegionData[];
}

// Center map on a specific region
function MapBounds({ regions }: { regions: RegionData[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (regions.length > 0) {
      const bounds = L.latLngBounds(
        regions.map((region) => L.latLng(region.position[0], region.position[1]))
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [regions, map]);
  
  return null;
}

export function IndiaMap({ regions }: IndiaMapProps) {
  // Default center is roughly the center of India
  const defaultCenter: [number, number] = [23.5937, 78.9629];
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  // Determine marker color based on rainfall
  const getMarkerColor = (rainfall: number) => {
    if (rainfall === 0) return "#4ADE80"; // Green for no rain
    if (rainfall < 5) return "#60A5FA"; // Blue for light rain
    if (rainfall < 15) return "#818CF8"; // Indigo for moderate rain
    return "#F87171"; // Red for heavy rain
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
    >
      <MapContainer
        center={defaultCenter}
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds regions={regions} />
        
        {regions.map((region) => (
          <Marker 
            key={region.name} 
            position={region.position} 
            eventHandlers={{
              click: () => setSelectedRegion(region),
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold">{region.name}</h3>
                <p className="text-sm">{region.current}</p>
                <p className="text-sm">Rainfall: {region.rainfall} mm</p>
                <p className="text-sm">Humidity: {region.humidity}%</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Region info card */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-lg shadow-lg z-[1000] max-w-[200px]"
        >
          <h3 className="font-bold">{selectedRegion.name}</h3>
          <p className="text-sm">{selectedRegion.current}</p>
          <p className="text-xs">Rainfall: {selectedRegion.rainfall} mm</p>
          <p className="text-xs">Humidity: {selectedRegion.humidity}%</p>
        </motion.div>
      )}
    </motion.div>
  );
}
