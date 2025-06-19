import Header from "@/components/main/Header";
import { fetchTVById } from "@/utils/api";


type Params = Promise<{id: string}>

export default async function SeriePage({ params}: {params: Params}) {

    const { id } = await params;

    const serie = await fetchTVById(id);

    console.log(serie)

  return (
    <div>
    <Header />
    <div className="pt-[7rem] container mx-auto px-4 max-w-8xl">
        <div className="flex md:flex-row flex-col gap-2">
        <img
      src={`https://image.tmdb.org/t/p/w300${serie.backdrop_path}`}
      alt={serie.name}
      className="object-cover"

    />
    <div className="flex flex-col max-w-xl space-y-2">
        <h1 className="text-3xl leading-tight font-bold">{serie.name}</h1>
        <p className="">{serie.overview}</p>
    </div>
        </div>
    </div>
</div>
  )
}
