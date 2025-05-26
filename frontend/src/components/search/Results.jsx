import { IoLocationOutline } from "react-icons/io5";
export default function Results({
  results,
  className,
  search,
  onSelect,
  searchSelect,
  supressResultsRef,
  blurred,
}) {
  if (supressResultsRef.current || blurred) return null;
  if (!results?.length || !search) return null;

  function formatResults({
    city,
    country,
    street,
    housenumber,
    lat,
    lon,
    place_id,
  } = {}) {
    let parts = [];
    if (street) {
      parts.push(street);
      if (housenumber) parts.splice(1, 0, housenumber);
      parts.push(city || country);
    } else {
      if (city) parts.push(city);
      parts.push(country);
    }

    const newResults = {
      country,
      place_id,
      formatted: parts.join(" "),
      ...(city && { city }),
      ...(housenumber && { housenumber }),
      ...(street && { street }),
      coords: { lat, lon },
    };

    return { formatted: parts.join(" "), newResults };
  }

  function AdjustResults(result) {
    const { formatted } = formatResults(result);

    const parts = formatted.split(" ");
    if (parts.length > 1) {
      const last = parts.pop();
      return (
        <>
          {parts.join(" ")} <span className="location-secondary">{last}</span>
        </>
      );
    }
    return formatted;
  }
  return (
    <section
      className={`results ${className.split(" ")[1]}`}
      style={{
        positionAnchor: `--${className.split(" ")[1]}`,
        top: "anchor(bottom)",
        left: "anchor(left)",
      }}
    >
      {results.map((result, i) => {
        const { formatted, newResults } = formatResults(result);
        return (
          <section
            className="items-container"
            key={result.place_id + i}
            onClick={() => {
              onSelect(newResults, formatted);
              searchSelect(formatted);
              supressResultsRef.current = true;
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <IoLocationOutline size={20} />
            <p>
              <AdjustResults {...result} />
            </p>
          </section>
        );
      })}
    </section>
  );
}
