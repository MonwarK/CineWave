import Header from "@/components/main/Header";
import SeriesSection from "@/components/other/SeriesSection";
import { fetchSeries } from "@/utils/api";

export default async function SeriesPage() {
    const series = await fetchSeries();
  return (
    <div>
        <Header />
        
        <div className="pt-[7rem] container max-w-6xl mx-auto flex flex-col">
        <h1 className="leading-2 text-3xl font-semibold text-center">Series</h1>

            <SeriesSection
            series={series} 
            />
        </div>
    </div>
  )
}
