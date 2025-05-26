import apiClient from "./axiosConfig";

export async function fetchJourneys() {
  try {
    const response = await apiClient.get("/journeys");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function fetchJourneyById(id) {
  try {
    const response = await apiClient.get(`/journeys/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function updateJourney({ journey, id }) {
  try {
    const response = await apiClient.patch(`/journeys/${id}`, journey);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}

export async function createJourney(journey) {
  try {
    const response = await apiClient.post("/journeys", journey);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || error.message);
  }
}
