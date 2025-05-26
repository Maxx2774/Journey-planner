import Map from "../../map/Map";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJourneyById } from "../../hooks/useJourneys";
import JourneySidebar from "./sidebar/Sidebar";

export default function JourneyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: journey, isError, error } = useJourneyById(id);
  const [highlightedMarker, setHighlightedMarker] = useState(null);
  const highlightMarker = (pos) => setHighlightedMarker(pos);

  useEffect(() => {
    if (isError) return navigate("/planner/journeys");
  }, [error?.message, isError, navigate]);

  if (!journey?.journey_id) return <p>Loading....</p>;

  return (
    <main className="flex">
      <JourneySidebar journey={journey} highlightMarker={highlightMarker} />
      <Map
        key={journey?.journey_id}
        journey={journey}
        highlightedMarker={highlightedMarker}
      />
    </main>
  );
}
