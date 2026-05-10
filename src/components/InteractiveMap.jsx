import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path issues in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to auto-recenter map when destination changes
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const InteractiveMap = ({ center, destinationName, itinerary }) => {
  console.log("InteractiveMap props:", { center, destinationName, itinerary });
  // Extract all places from the itinerary
  const allPlaces = itinerary.flatMap(day => day.places);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border">
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRecenter center={[center.lat, center.lng]} />
        {/* Primary Destination Marker */}
        <Marker position={[center.lat, center.lng]}>
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-base text-primary">{destinationName || "Destination"}</h3>
              <p className="text-xs text-muted-foreground mt-1">Primary Location</p>
            </div>
          </Popup>
        </Marker>

        {allPlaces.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lng]}>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-sm">{place.name}</h3>
                {place.time !== "TBD" && <p className="text-xs text-muted-foreground">{place.time}</p>}
                {place.note && <p className="text-xs mt-1">{place.note}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
