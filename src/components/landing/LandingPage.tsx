
import { fetchTrending } from "@/utils/api";
import Footer from "../main/Footer";
import Features from "./Features";
import Hero from "./Hero";
import Plan from "./Plan";
import Trending from "./Trending";

export default async function LandingPage() {
  const data = await fetchTrending();

  if(!data) {
    return <div>No Data Found</div>
  }

  return (
    <div className="overflow-hidden">
      {/* Top Section */}
      <Hero />

      <div className="max-w-screen-xl mx-auto px-5 py-20 space-y-20">
        {/* Plan */}
        <Plan />

        {/* Trending */}
        <Trending movies={data} />

        {/* Features */}
        <Features />
      </div>

      <Footer />
    </div>
  );
}
