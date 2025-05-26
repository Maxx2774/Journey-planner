import apiClient from "./axiosConfig";

export async function fetchAddress(coords) {
  try {
    const response = await apiClient.get(
      `/reverse-geocode?lat=${coords.lat}&lng=${coords.lng}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchAutocomplete(search) {
  try {
    const response = await apiClient.get(
      `/autocomplete?search=${encodeURIComponent(search)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
