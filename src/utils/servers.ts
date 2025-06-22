export const servers = [
  {
    id: 1,
    name: 'Monwar',
    description:
      'No ads. Fast and stable. Supports autoplay, next episode, episode selector, and theme color.',
    movieLink: (movieId: number) =>
      `https://player.videasy.net/movie/${movieId}?autoPlay=true&color=8B5CF6`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://player.videasy.net/tv/${showId}/${season}/${episode}?autoPlay=true&autoplayNextEpisode=true&episodeSelector=true&color=8B5CF6`,
  },
  {
    id: 2,
    name: 'Drake',
    description:
      'Clean UI with title and poster. Supports autoplay and next episode.',
    movieLink: (movieId: number) =>
      `https://vidlink.pro/movie/${movieId}?title=true&poster=true&autoplay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidlink.pro/tv/${showId}/${season}/${episode}?title=true&poster=true&autoplay=false&nextbutton=true`,
  },
  {
    id: 3,
    name: 'GlueGangGarry',
    description:
      'Fallback server with stable playback. Supports basic embed features.',
    movieLink: (movieId: number) =>
      `https://vidsrc.me/embed/movie?tmdb=${movieId}`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidsrc.me/embed/tv?tmdb=${showId}&season=${season}&episode=${episode}`,
  },
  {
    id: 4,
    name: 'Wifebeater114',
    description:
      'Modern UI with multiple source support. Can toggle language via URL param.',
    movieLink: (movieId: number, lang = 'sub') =>
      `https://multiembed.mov/?video_id=${movieId}&tmdb=1&lang=${lang}`,
    showLink: (showId: number, season: number, episode: number, lang = 'sub') =>
      `https://multiembed.mov/?video_id=${showId}&tmdb=1&s=${season}&e=${episode}&lang=${lang}`,
  },
  {
    id: 5,
    name: 'Twice',
    description:
      'Customizable embed with autoplay and next episode support. Clean UI.',
    movieLink: (movieId: number) =>
      `https://vidfast.pro/movie/${movieId}?autoPlay=true&title=true&poster=true&theme=00ACC1`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidfast.pro/tv/${showId}/${season}/${episode}?autoPlay=true&nextButton=true&autoNext=true&title=true&poster=true&episodeSelector=true&theme=00ACC1`,
  },
  {
    id: 6,
    name: 'Ali Mo',
    description:
      'Good quality embeds. Usually subbed, dubbed available on select content.',
    movieLink: (movieId: number) =>
      `https://vidsrc.cc/v3/embed/movie/${movieId}?autoPlay=false`,
    showLink: (showId: number, season: number, episode: number) =>
      `https://vidsrc.cc/v3/embed/tv/${showId}/${season}/${episode}?autoPlay=false`,
  },
];
