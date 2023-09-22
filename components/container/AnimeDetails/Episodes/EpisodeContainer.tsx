import { fetchData } from "@/utils/helper";
import React from "react";
import EpisodePaginated from "./EpisodePaginated";

export default async function EpisodeContainer(props: any) {
  const episodes = await fetchData(
    `episodes/${props.id}?provider=zoro&fetchFiller=true`
  );

  return (
    <div className="mx-auto w-[94%]">
    
      <EpisodePaginated episodes={episodes} />
    </div>
  );
}
