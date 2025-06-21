export const servers = [
  {
    id: 1,
    name: "Server 1",
    description: "Generally better quality",
  },
  {
    id: 2,
    name: "Server 2",
    description: "Recommended for recently released movies.",
  },
  {
    id: 3,
    name: "Server 3",
    description: "Recommeneded for recently released movies",
  },
  {
    id: 4,
    name: "Server 4",
    description: "No ads. May have 4k movies. Generally better quality.",
  },
  {
    id: 5,
    name: "Server 5",
    description: "No ads. Generally better quality.",
  },
  {
    id: 6,
    name: "Server 6",
    description: "Generally better quality",
  },
];

export const getMovieServer = (serverNumber: number, id: number) => {
  switch (serverNumber) {
    case 1:
      return `https://vidsrc.cc/v3/embed/movie/${id}?autoPlay=false`;
    case 2:
      return `https://moviesapi.club/movie/${id}`;
    case 3:
      return `https://vidsrc.me/embed/movie?tmdb=${id}`;
    case 4:
      return `https://player.videasy.net/movie/${id}`;
    case 5:
      return `https://vidsrc.su/embed/movie/${id}`;
    case 6:
      return `https://vidlink.pro/movie/${id}?title=true&poster=true&autoplay=false`;
  }
};
