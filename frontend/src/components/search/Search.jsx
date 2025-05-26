import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchAutocomplete } from "../../api/geocode";
import Results from "./Results";
import "./search.css";

export default function Search({
  initialValue,
  placeholder,
  onSelect,
  className,
  supressResultsRef,
}) {
  const [search, setSearch] = useState(initialValue || "");
  const [results, setResults] = useState([]);
  const [blurred, SetBlurred] = useState(false);

  const debouncedSearch = useDebounce(search, 250);

  useEffect(() => {
    setSearch(initialValue || "");
  }, [initialValue]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearch || supressResultsRef.current) return;
      const data = await fetchAutocomplete(debouncedSearch);
      setResults(data || []);
    };
    fetchResults();
  }, [debouncedSearch, supressResultsRef]);

  const searchSelect = (result) => setSearch(result);

  return (
    <>
      <input
        autoComplete="off"
        name="search"
        id="search"
        type="text"
        onChange={(e) => {
          supressResultsRef.current = false;
          setSearch(e.target.value);
        }}
        placeholder={placeholder}
        className={`search ${className}`}
        style={{ anchorName: `--${className.split(" ")[1]}` }}
        value={search}
        onBlur={() => SetBlurred(true)}
        onFocus={() => SetBlurred(false)}
      />
      <Results
        blurred={blurred}
        results={results}
        className={className}
        search={search}
        onSelect={onSelect}
        searchSelect={searchSelect}
        supressResultsRef={supressResultsRef}
      />
    </>
  );
}
