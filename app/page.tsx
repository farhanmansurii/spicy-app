import RecentlyWatched from "@/components/RecentlyWatched";
import Carousal from "@/components/common/Carousal";
import RowSkeleton from "@/components/common/loaders/RowLoader";
import dynamic from "next/dynamic";
const AnimeList = dynamic(()=>import('../components/container/AnimeRow'),{ssr:false,
    loading: () => <RowSkeleton/>,

})
export default function Home() {
  return (
    <div>
      <Carousal />
      <RecentlyWatched />
      <AnimeList text="Trending" endpoint="trending?perPage=30" />
      <AnimeList text="Popular Anime" endpoint="popular?perPage=30" />
    </div>
  );
}
