import RenderMarkers from "./RenderMarkers";
import MapSearch from "./MapSearch";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useMap } from "../context/MapContext";
import { MapEvents } from "./MapEvents";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useStorage";
import "leaflet/dist/leaflet.css";
import "./map.css";

export default function Map({ journey, highlightedMarker }) {
  const { getItemL } = useLocalStorage();
  const { mapRef } = useMap();

  const [center, setCenter] = useState(
    () =>
      getItemL(`map-center/${journey?.journey_id}`) ??
      journey?.origin?.coords ?? {
        lat: 59.3422752,
        lon: 18.0279826,
      }
  );
  const [zoom, setZoom] = useState(
    () => getItemL(`zoom-level/${journey?.journey_id}`) ?? 12
  );

  return (
    <MapContainer
      ref={(map) => (mapRef.current = map)}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      className="map-container"
      minZoom={3}
    >
      <MapEvents
        zoom={zoom}
        setZoom={setZoom}
        center={center}
        setCenter={setCenter}
        id={journey?.journey_id}
      />

      <MapContent journey={journey} />

      <RenderMarkers journey={journey} highlightedMarker={highlightedMarker} />
    </MapContainer>
  );
}

function MapContent() {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapSearch />
    </>
  );
}
