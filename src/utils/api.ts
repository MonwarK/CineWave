// utils/api.ts

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

async function handleFetch(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.status_message || "TMDB fetch failed");
  return data.results;
}

export async function fetchTrending() {
  return handleFetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
}

export async function fetchPopularMovies() {
  return handleFetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
}

export async function fetchTopRated() {
  return handleFetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
}

export async function fetchUpcoming() {
  return handleFetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
}

export async function fetchPopularTV() {
  return handleFetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
}

export async function fetchActionMovies() {
  return handleFetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
  );
}

export async function fetchComedyTV() {
  return handleFetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`
  );
}

export async function fetchHorrorMovies() {
  return handleFetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
  );
}

export async function searchTMDB(
  query: string,
  type: "movie" | "tv" | "multi" = "multi"
) {
  if (!query.trim()) return [];

  const url = `${BASE_URL}/search/${type}?api_key=${
    process.env.NEXT_PUBLIC_TMDB_API_KEY
  }&language=en-US&include_adult=false&query=${encodeURIComponent(query)}`;

  return handleFetch(url);
}
