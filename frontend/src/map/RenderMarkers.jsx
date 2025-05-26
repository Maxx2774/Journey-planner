import CustomMarker from "./CustomMarker";

export default function RenderMarkers({ journey, highlightedMarker }) {
  return (
    <>
      {journey?.origin?.coords && (
        <CustomMarker
          highlightedMarker={highlightedMarker}
          key="origin"
          coords={journey.origin.coords}
          position={1}
          type="origin"
        />
      )}
      {journey?.destination?.coords && (
        <CustomMarker
          highlightedMarker={highlightedMarker}
          key="destination"
          coords={journey.destination.coords}
          position={journey?.stops ? journey?.stops?.length + 2 : 2}
          type="destination"
        />
      )}
      {journey?.stops?.map((stop) => (
        <CustomMarker
          highlightedMarker={highlightedMarker}
          key={`stop-${stop.place_id}-${stop.position}`}
          coords={stop?.coords}
          position={stop?.position + 1}
          type="stop"
        />
      ))}
    </>
  );
}
