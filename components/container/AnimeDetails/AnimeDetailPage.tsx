import { fetchData } from "@/utils/helper";
import React from "react";
import Animedetails from "./AnimeDetails";
import EpisodeContainer from "./Episodes/EpisodeContainer";
import Navbar from "@/components/common/Navbar";
import Row from "@/components/common/Row";
import AnimeDetailsSkeleton from "@/components/common/AnimeDetailsSkeleton";

interface AnimeDetailPageProps {
  id: string;
}

export default async function AnimeDetailPage(props: AnimeDetailPageProps) {
  const data = await fetchData(`data/${props.id}`);
  return (
    <div className="bg-background flex flex-col ">
      <Animedetails data={data} />
      <EpisodeContainer
        animeTitle={
          data.title.userPreferred ||
          data.title.english ||
          data.title.romaji ||
          ""
        }
        id={props.id}
        fetchFiller={true}
      />
      <div className="flex gap-2 lg:mt-[4rem] flex-col">
        <Row text="Recommended" typeOfAnime={data.recommendations} />
        <Row
          text="Similar"
          typeOfAnime={data.relations.filter(
            (relation: any) =>
              relation.type.toLowerCase() === "tv" ||
              relation.type.toLowerCase() === "movie"
          )}
        />
      </div>
    </div>
  );
}
