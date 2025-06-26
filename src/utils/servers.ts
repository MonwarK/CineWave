export const servers = [
  {
    id: 1,
    name: 'Monwar',
    description:
      'Fast, clean UI with next episode and episode selector support.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_1_BASE}/movie/${movieId}?title=true&poster=true&theme=00ACC1`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_1_BASE}/tv/${showId}/${season}/${episode}?nextButton=true&autoNext=false&title=true&poster=true&episodeSelector=true&theme=00ACC1`,
  },
  {
    id: 2,
    name: 'Necrydark',
    description: 'Stable embed with TMDb ID support.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_2_BASE}/embed/movie?tmdb=${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_2_BASE}/embed/tv?tmdb=${showId}&season=${season}&episode=${episode}`,
  },
  {
    id: 3,
    name: 'The 𝓯𝓻𝓮𝓪𝓴ness 😎',
    description: 'Reliable source with autoplay disabled.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_3_BASE}/v3/embed/movie/${movieId}?autoPlay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_3_BASE}/v3/embed/tv/${showId}/${season}/${episode}?autoPlay=false`,
  },
  {
    id: 4,
    name: "Drake's Third Leg",
    description: 'Autoplay off, next episode available.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_4_BASE}/movie/${movieId}?title=true&poster=true&autoplay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_4_BASE}/tv/${showId}/${season}/${episode}?title=true&poster=true&autoplay=false&nextbutton=true`,
  },
  {
    id: 5,
    name: 'Twice (LETS GOOOO)',
    description: 'Simple embed from moviesapi.club.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_5_BASE}/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_5_BASE}/tv/${showId}-${season}-${episode}`,
  },
  {
    id: 6,
    name: "Teemo's Balls",
    description: 'Embed from Videasy.net with next episode support.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_6_BASE}/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_6_BASE}/tv/${showId}/${season}/${episode}?nextEpisode=true&episodeSelector=true`,
  },
];
