import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchJourneys,
  fetchJourneyById,
  updateJourney,
} from "../api/journeys";

export function useJourneys() {
  return useQuery({ queryKey: ["journeys"], queryFn: fetchJourneys });
}

export function useJourneyById(id) {
  return useQuery({
    queryKey: ["journey", id],
    queryFn: () => fetchJourneyById(id),
    enabled: !!id,
    retry: false,
  });
}

export function useUpdateJourney() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateJourney,
    onMutate: (variables) => {
      console.log("Optimistic update with", variables);
    },
    onSuccess: (journey) => {
      queryClient.setQueryData(["journey", journey.journey_id], journey);
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
    onSettled: () => {
      console.log("Mutation settled");
    },
  });
}
