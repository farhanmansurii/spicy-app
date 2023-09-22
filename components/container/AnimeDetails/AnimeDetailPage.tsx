import { fetchData } from "@/utils/helper";
import React from "react";
import Animedetails from "./AnimeDetails";
import EpisodeContainer from "./Episodes/EpisodeContainer";
import Navbar from "@/components/common/Navbar";

interface AnimeDetailPageProps {
  id: string;
}

export default async function AnimeDetailPage(props: AnimeDetailPageProps) {
  const data = await fetchData(`data/${props.id}`);

  return (
    <div>
      <Navbar
        text={
          data.title.userPreferred ||
          data.title.english ||
          data.title.romaji ||
          ""
        }
      />
      <Animedetails data={data} />

      <EpisodeContainer id={props.id} fetchFiller={true} />
    </div>
  );
}
