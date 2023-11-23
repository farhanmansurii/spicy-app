import { fetchData } from "@/utils/helper";
import React from "react";
import EpisodePaginated from "./EpisodePaginated";

export default async function EpisodeContainer(props: any) {
  const episodes = await fetchData(
    `episodes/${props.id}?provider=gogoanime&fetchFiller=true`
  );

  return (
    <div className="mx-auto w-11/12">
      <EpisodePaginated
        malId={props.malId}
        episodes={episodes}
        animeTitle={props.animeTitle}
        animeID={props.id}
      />
    </div>
  );
}
