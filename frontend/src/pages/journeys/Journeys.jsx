import { useJourneys } from "../../hooks/useJourneys";
import { useNavigate, useParams } from "react-router-dom";
import { usePrefetch } from "../../hooks/usePrefetch";
import { fetchJourneyById } from "../../api/journeys";

export default function Journeys({ onSelect }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const prefetchJourney = usePrefetch();
  const { data: journeys, isLoading, isError, error } = useJourneys();

  if (isLoading) return <p>Loading journeys...</p>;

  if (isError) return <p>{error.message}</p>;
  if (!journeys?.length) return null;
  return (
    <article className="journeys-container">
      {journeys?.map((journey, i) => (
        <p
          key={i}
          onClick={() => {
            if (id !== journey.journey_id) {
              navigate(`/planner/journeys/${journey.journey_id}`);
              onSelect?.();
            }
          }}
          className="journey-item"
          onMouseEnter={() => {
            const id = journey?.journey_id;
            prefetchJourney("journey", id, fetchJourneyById, id);
          }}
        >
          {journey?.title}
        </p>
      ))}
      <button className="journey-item add">New Journey</button>
    </article>
  );
}
