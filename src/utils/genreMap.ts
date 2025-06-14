const movieGenres = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

const tvGenres = {
  Action: 10759,
  Adventure: 10759,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Kids: 10762,
  Mystery: 9648,
  News: 10763,
  Reality: 10764,
  "Sci-Fi & Fantasy": 10765,
  Soap: 10766,
  Talk: 10767,
  War: 10768,
  Western: 37,
};

export function getGenreNameFromId(id: number): string | null {
  const genreIdToName = Object.entries({
    ...movieGenres,
    ...tvGenres,
  }).reduce((acc, [name, genreId]) => {
    acc[genreId] = name;
    return acc;
  }, {} as Record<number, string>);

  return genreIdToName[id] || null;
}
