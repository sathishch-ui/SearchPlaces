const API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const API_KEY = "4b55a1c75dmshfa5515160eaa071p1ee945jsnba278b6d4605";

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
