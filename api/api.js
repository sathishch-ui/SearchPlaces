import { API_KEY, API_URL } from "../utils/constant.js";

export const fetchCities = async (query, page, limit = 5) => {
  const offset = (page - 1) * limit;
  try {
    const response = await fetch(
      `${API_URL}?namePrefix=${query}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  } catch (error) {
    console.error("Error in fetchCities:", error);
    return null;
  }
};
