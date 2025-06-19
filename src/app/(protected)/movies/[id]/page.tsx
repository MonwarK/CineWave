import Header from "@/components/main/Header";
import { fetchMovieById } from "@/utils/api";

type Params = Promise<{id: string}>

export default async function MoviePage({ params}: {params: Params}) {

    const { id } = await params;

    const movie = await fetchMovieById(id);
    

  return (
    <div>
        <Header />
        <div className="pt-[7rem] container mx-auto max-w-8xl">
            <div className="flex flex-row gap-2">
            <img
          src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
          alt={movie.name}

        />
        <div className="flex flex-col max-w-xl space-y-2">
            <h1 className="text-3xl leading-tight font-bold">{movie.original_title}</h1>
            <p className="">{movie.overview}</p>
        </div>
            </div>
        </div>
    </div>
  )
}
