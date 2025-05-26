import L from "leaflet";
import { Marker, useMap, Popup } from "react-leaflet";
import { fetchAddress } from "../api/geocode";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function CustomMarker({
  coords,
  position,
  type,
  highlightedMarker,
}) {
  const markerRef = useRef(null);
  const map = useMap();
  const isHighlighted = highlightedMarker === position;
  const fillColor = isHighlighted ? "#1b3c72" : "#e63946";

  const handleDragEnd = (e) => {
    console.log("New position:", e.target.getLatLng());
  };

  const icon = L.divIcon({
    className: "svg-marker-container",
    html: `
      <svg class="marker-svg ${isHighlighted ? "highlighted" : ""}" 
           viewBox="0 0 21 27" 
           width="21" 
           height="27">
        <path class="marker-main" 
         style="fill: ${fillColor};" 
              fill-rule="evenodd" 
              clip-rule="evenodd" 
              d="M10.3091 0C16.0026 0 20.6182 4.61554 20.6182 10.3091C20.6182 11.0041 20.5494 11.683 20.4183 12.3394C19.5084 19.1961 10.3633 27 10.3633 27C10.3633 27 2.58066 20.3588 0.660057 13.9465C0.233431 12.8154 0 11.5895 0 10.3091C0 4.61554 4.61554 0 10.3091 0Z"/>
        <path class="marker-dot" 
              d="M14.2364 10.3091C14.2364 8.14012 12.4781 6.38182 10.3091 6.38182C8.14012 6.38182 6.38182 8.14012 6.38182 10.3091C6.38182 12.4781 8.14012 14.2364 10.3091 14.2364C12.4781 14.2364 14.2364 12.4781 14.2364 10.3091Z"/>
      </svg>
    `,
    iconSize: [21, 27],
    iconAnchor: [10.5, 27],
    popupAnchor: [0, -20],
  });

  if (!coords) return null;

  return (
    <>
      <Marker
        icon={icon}
        position={[coords.lat, coords.lon]}
        key={`stop-${position}`}
        eventHandlers={{
          dragend: handleDragEnd,
          click: () => map.flyTo([coords.lat, coords.lon], map.getZoom()),
        }}
        draggable={true}
        ref={markerRef}
      >
        <Popup>
          <button
            onClick={() => {
              console.log(coords);
              fetchAddress(coords);
            }}
          >
            Get address
          </button>
          {coords.lat}, {coords.lon}
        </Popup>
      </Marker>
    </>
  );
}
