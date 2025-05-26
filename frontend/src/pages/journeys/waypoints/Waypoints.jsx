import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { useUpdateJourney } from "../../../hooks/useJourneys";
import { Reorder } from "framer-motion";
import "./waypoints.css";
import ToggleButton from "../../../components/ui/ToggleButton";
import NewWaypoint from "./NewWaypoint";

export default function Waypoints({ journey, highlightMarker }) {
  const queryClient = useQueryClient();
  const { mutate } = useUpdateJourney();
  const [tempStops, setTempStops] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showNewWaypoint, setShowNewWaypoint] = useState(false);

  useEffect(() => {
    setTempStops(journey?.stops || []);
  }, [journey?.stops]);

  function handleDragStart() {
    setIsDragging(true);
  }

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const updatedStops = tempStops.map((stop, index) => ({
      ...stop,
      position: index + 1,
    }));

    const originalIds = journey?.stops?.map((stop) => stop.id);
    const updatedIds = updatedStops.map((stop) => stop.id);

    const sameOrder = originalIds?.every((id, i) => id === updatedIds[i]);

    setIsDragging(false);
    if (sameOrder) return;

    const updatedJourney = { ...journey, stops: updatedStops };

    return mutate(
      { journey: updatedJourney, id: journey?.journey_id },
      {
        onSuccess: () => {
          queryClient.setQueryData(
            ["journey", journey?.journey_id],
            (prev) => ({
              ...prev,
              stops: updatedStops,
            })
          );
        },
      }
    );
  }, [isDragging, tempStops, queryClient, mutate, journey]);

  useEffect(() => {
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDragEnd]);

  if (!journey?.stops?.length) {
    return <div className="no-waypoints">Add stops to see them here</div>;
  }

  return (
    <section className="waypoints-container">
      <section className="flex items-center mb-4 font-[300]">
        <p>Show order</p>
        <ToggleButton className="ml-auto" />
      </section>

      <Reorder.Group values={tempStops} onReorder={setTempStops}>
        <section className="waypoints">
          {tempStops.map((stop, i) => (
            <Reorder.Item
              key={stop.id}
              value={stop}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              className="waypoint"
              onMouseEnter={() => highlightMarker(i + 2)}
              onMouseLeave={() => highlightMarker(null)}
            >
              {stop.city || "Unnamed location"}
            </Reorder.Item>
          ))}
          {!showNewWaypoint ? (
            <button
              className="waypoint add"
              onClick={() => setShowNewWaypoint(true)}
            >
              New Waypoint
            </button>
          ) : (
            <NewWaypoint />
          )}
        </section>
      </Reorder.Group>
    </section>
  );
}
