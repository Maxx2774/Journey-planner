import Search from "../../../components/search/Search";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createJourney } from "../../../api/journeys";
import { useQueryClient } from "@tanstack/react-query";
import "./create.css";

export default function JourneyForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const supressResultsRef = useRef(true);

  const { mutate, isPending } = useMutation({
    mutationFn: createJourney,
    onSuccess: (data) => {
      queryClient.setQueryData(["journeys"], (prev) => {
        if (!prev?.length) return [data];
        return [...prev, data];
      });
      setTitle("");
      setDescription("");
      setOrigin("");
      setDestination("");
    },
    onError: (error) => {
      console.error("Error creating journey:", error.message);
    },
  });
  function handleCreateJourney(e) {
    e.preventDefault();
    mutate({ title, origin, destination, description });
  }
  return (
    <form onSubmit={handleCreateJourney} className="journey-form">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Search
        placeholder="From"
        onSelect={(result) => setOrigin(result)}
        className="form-search origin"
        supressResultsRef={supressResultsRef}
      />
      <Search
        placeholder="To"
        onSelect={(result) => setDestination(result)}
        className="form-search destination"
        supressResultsRef={supressResultsRef}
      />
      <button type="submit" className="submit" disabled={isPending}>
        {isPending ? "Creating Journey..." : "Create journey"}
      </button>
    </form>
  );
}
