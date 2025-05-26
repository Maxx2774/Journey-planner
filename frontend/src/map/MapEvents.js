import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLocalStorage } from "../hooks/useStorage";

export function MapEvents({ id }) {
  const { setItemL } = useLocalStorage();

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    function handleZoom() {
      const zoomLevel = map.getZoom();
      setItemL(`zoom-level/${id}`, zoomLevel);
      const mapCenter = map.getCenter();
      setItemL(`map-center/${id}`, mapCenter);
    }

    function handleMove() {
      const mapCenter = map.getCenter();
      setItemL(`map-center/${id}`, mapCenter);
    }

    map.on("zoomend", handleZoom);
    map.on("moveend", handleMove);

    return () => {
      map.off("zoomend", handleZoom);
      map.off("moveend", handleMove);
    };
  }, [map, setItemL]);

  return null;
}
