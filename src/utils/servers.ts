export const servers = [
  {
    id: 1,
    name: "Ali Mo",
    description: "Generally better quality",
  },
  {
    id: 2,
    name: "Wifebeater114",
    description: "Recommended for recently released movies.",
  },
  {
    id: 3,
    name: "Monwar",
    description: "Recommeneded for recently released movies",
  },
  {
    id: 4,
    name: "GlueGangGarry612",
    description: "No ads. May have 4k movies. Generally better quality.",
  },
  {
    id: 5,
    name: "YBs Adlibs",
    description: "No ads. Generally better quality.",
  },
  {
    id: 6,
    name: "Drake",
    description: "Generally better quality",
  },
];

export const getMovieServer = (serverIndex: number, id: number) => {
  switch (serverIndex) {
    case 0:
      return `https://vidsrc.cc/v3/embed/movie/${id}?autoPlay=false`;
    case 1:
      return `https://moviesapi.club/movie/${id}`;
    case 2:
      return `https://vidsrc.me/embed/movie?tmdb=${id}`;
    case 3:
      return `https://player.videasy.net/movie/${id}`;
    case 4:
      return `https://vidsrc.su/embed/movie/${id}`;
    case 5:
      return `https://vidlink.pro/movie/${id}?title=true&poster=true&autoplay=false`;
  }
};

export const getEpisodeServer = (serverIndex: number, id: number, season: number, episode: number) => {
  switch (serverIndex) {
      case 0: return `https://vidsrc.cc/v3/embed/tv/${id}/${season}/${episode}?autoPlay=false`;
      case 1: return `https://moviesapi.club/tv/${id}-${season}-${episode}`;
      case 2: return `https://vidsrc.me/embed/tv?tmdb=${id}&${episode}&episode=${episode}`;
      case 3: return `https://player.videasy.net/tv/${id}/${season}/${episode}?nextEpisode=true&episodeSelector=true`;
      case 4: return `https://vidsrc.su/embed/tv/${id}/${season}/${episode}`;
      case 5: return `https://vidlink.pro/tv/${id}/${season}/${episode}?title=true&poster=true&autoplay=false&nextbutton=true`;
    }
};
