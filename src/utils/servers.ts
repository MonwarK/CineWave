export const servers = [
  {
    id: 1,
    name: 'Monwar',
    description:
      'Fast and reliable player. Great UI with episode selector and next-episode support. Ideal for TV shows with multiple seasons.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_1_BASE}/movie/${movieId}?title=true&poster=true&theme=00ACC1`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_1_BASE}/tv/${showId}/${season}/${episode}?nextButton=true&autoNext=false&title=true&poster=true&episodeSelector=true&theme=00ACC1`,
  },
  {
    id: 2,
    name: 'Necrydark',
    description:
      'Simple and stable player. Works well with both movies and TV shows. Often better compatibility with older TMDb IDs.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_2_BASE}/embed/movie?tmdb=${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_2_BASE}/embed/tv?tmdb=${showId}&season=${season}&episode=${episode}`,
  },
  {
    id: 3,
    name: 'The 𝓯𝓻𝓮𝓪𝓴ness 😎',
    description:
      'Responsive player with basic controls. Works best with popular or trending content. Limited advanced features.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_3_BASE}/v3/embed/movie/${movieId}?autoPlay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_3_BASE}/v3/embed/tv/${showId}/${season}/${episode}?autoPlay=false`,
  },
  {
    id: 4,
    name: "Drake's Third Leg",
    description:
      'Good fallback server with title and poster support. Next episode button available. Sometimes slower on first load.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_4_BASE}/movie/${movieId}?title=true&poster=true&autoplay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_4_BASE}/tv/${showId}/${season}/${episode}?title=true&poster=true&autoplay=false&nextbutton=true`,
  },
  {
    id: 5,
    name: 'Twice (LETS GOOOO)',
    description:
      'Fastest updates for newly released movies and shows. Best used when other servers haven’t updated yet.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_5_BASE}/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_5_BASE}/tv/${showId}-${season}-${episode}`,
  },
  {
    id: 6,
    name: "Teemo's Balls",
    description:
      'Advanced player with built-in episode navigation. Works great for binging series. May have minor UI glitches on mobile.',
    movieLink: (movieId: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_6_BASE}/movie/${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `${process.env.NEXT_PUBLIC_SERVER_6_BASE}/tv/${showId}/${season}/${episode}?nextEpisode=true&episodeSelector=true`,
  },
];
