export const servers = [
  {
    id: 1,
    name: 'Monwar',
    description:
      'Fast, clean UI with next episode and episode selector support. Autoplay disabled.',
    movieLink: (movieId: number) =>
      `https://vidfast.pro/movie/${movieId}?title=true&poster=true&theme=00ACC1`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidfast.pro/tv/${showId}/${season}/${episode}?nextButton=true&autoNext=false&title=true&poster=true&episodeSelector=true&theme=00ACC1`,
  },
  {
    id: 2,
    name: 'GlueGangGarry612',
    description:
      'Stable embed with basic features and TMDb ID support. No autoplay by default.',
    movieLink: (movieId: number) =>
      `https://vidsrc.me/embed/movie?tmdb=${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidsrc.me/embed/tv?tmdb=${showId}&season=${season}&episode=${episode}`,
  },
  {
    id: 3,
    name: 'Big Man Yusef',
    description: 'Reliable source with vidsrc.cc embeds. Autoplay off.',
    movieLink: (movieId: number) =>
      `https://vidsrc.cc/v3/embed/movie/${movieId}?autoPlay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidsrc.cc/v3/embed/tv/${showId}/${season}/${episode}?autoPlay=false`,
  },
  {
    id: 4,
    name: "Drake's Third Leg",
    description: 'Clean UI with poster and title. Autoplay disabled, next episode available.',
    movieLink: (movieId: number) =>
      `https://vidlink.pro/movie/${movieId}?title=true&poster=true&autoplay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidlink.pro/tv/${showId}/${season}/${episode}?title=true&poster=true&autoplay=false&nextbutton=true`,
  },
  {
    id: 5,
    name: 'Twice (LETS GOOOO)',
    description: 'MoviesAPI.club source with simple movie and TV embeds.',
    movieLink: (movieId: number) =>
      `https://moviesapi.club/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://moviesapi.club/tv/${showId}-${season}-${episode}`,
  },
  {
    id: 6,
    name: "Teemo's Balls",
    description: 'Player.Videasy.net with next episode and episode selector support.',
    movieLink: (movieId: number) =>
      `https://player.videasy.net/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://player.videasy.net/tv/${showId}/${season}/${episode}?nextEpisode=true&episodeSelector=true`,
  },
];
