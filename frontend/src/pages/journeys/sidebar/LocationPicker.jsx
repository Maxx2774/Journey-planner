import Search from "../../../components/search/Search";
import { useEffect, useRef, useState } from "react";
import { useUpdateJourney } from "../../../hooks/useJourneys";

export default function LocationPicker({ journey }) {
  const { mutate } = useUpdateJourney();
  const [origin, setOrigin] = useState(journey?.origin || {});
  const [destination, setDestination] = useState(journey?.destination || {});
  const supressResultsRef = useRef(true);

  useEffect(() => {
    setOrigin(journey?.origin || {});
    setDestination(journey?.destination || {});
  }, [journey]);

  function handleSelect(result, formatted, type) {
    const current = journey?.[type];
    if (
      result.place_id === current?.place_id &&
      result.lat === current?.coords?.lat &&
      result.lon === current?.coords?.lon
    ) {
      return;
    }

    const updatedJourney = {
      [type]: {
        country: result.country,
        place_id: result.place_id,
        formatted: formatted,
        ...(result?.city && { city: result.city }),
        ...(result?.housenumber && { house_number: result.housenumber }),
        ...(result?.street && { street: result.street }),

        coords: { lat: result.lat, lon: result.lon },
      },
    };

    return mutate(
      { journey: updatedJourney, id: journey.journey_id },
      {
        onSuccess: () => {
          supressResultsRef.current = true;
        },
      }
    );
  }
  return (
    <section className="flex flex-col gap-2">
      <Search
        placeholder="Origin"
        className="pick-location origin"
        onSelect={(result, formatted) =>
          handleSelect(result, formatted, "origin")
        }
        initialValue={origin?.formatted}
        supressResultsRef={supressResultsRef}
      />
      <Search
        placeholder="Destination"
        className="pick-location destination"
        onSelect={(result, formatted) =>
          handleSelect(result, formatted, "destination")
        }
        initialValue={destination?.formatted}
        supressResultsRef={supressResultsRef}
      />
    </section>
  );
}
