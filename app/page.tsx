import RecentlyWatched from "@/components/RecentlyWatched";
import CarousalCard from "@/components/common/Carousal";
import Navbar from "@/components/common/Navbar";
import AnimeList from "@/components/container/AnimeRow";

export default function Home() {
  return (
    <div>
      <Navbar />
      <CarousalCard />
      <RecentlyWatched />
      <AnimeList text="Trending" endpoint="trending?perPage=30" />
      <AnimeList text="Popular Anime" endpoint="popular?perPage=30" />
    </div>
  );
}
