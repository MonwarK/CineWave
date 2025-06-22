export const servers = [
  {
    id: 1,
    name: 'Monwar',
    description: 'No ads. May have 4k movies. Generally better quality.',
    movieLink: (movieId: number) =>
      `https://player.videasy.net/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://player.videasy.net/tv/${showId}/${season}/${episode}?nextEpisode=true&episodeSelector=true`,
  },
  {
    id: 2,
    name: 'Ali Mo',
    description: 'Generally better quality',
    movieLink: (movieId: number) =>
      `https://vidsrc.cc/v3/embed/movie/${movieId}?autoPlay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidsrc.cc/v3/embed/tv/${showId}/${season}/${episode}?autoPlay=false`,
  },
  {
    id: 3,
    name: 'Wifebeater114',
    description: 'Recommended for recently released movies.',
    movieLink: (movieId: number) => `https://moviesapi.club/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://moviesapi.club/tv/${showId}-${season}-${episode}`,
  },
  {
    id: 4,
    name: 'GlueGangGarry612',
    description: 'Recommeneded for recently released movies',
    movieLink: (movieId: number) =>
      `https://vidsrc.me/embed/movie?tmdb=${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidsrc.me/embed/tv?tmdb=${showId}&${episode}&episode=${episode}`,
  },
  {
    id: 5,
    name: 'YBs Adlibs',
    description: 'No ads. Generally better quality.',
    movieLink: (movieId: number) => `https://vidsrc.su/embed/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidsrc.su/embed/tv/${showId}/${season}/${episode}`,
  },
  {
    id: 6,
    name: 'Drake',
    description: 'Generally better quality',
    movieLink: (movieId: number) =>
      `https://vidlink.pro/movie/${movieId}?title=true&poster=true&autoplay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidlink.pro/tv/${showId}/${season}/${episode}?title=true&poster=true&autoplay=false&nextbutton=true`,
  },
];
