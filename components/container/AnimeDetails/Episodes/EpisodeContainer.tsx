import { fetchData } from "@/utils/helper";
import React from "react";
import EpisodePaginated from "./EpisodePaginated";

export default async function EpisodeContainer(props: any) {
  const episodes = await fetchData(
    `episodes/${props.id}?provider=zoro&fetchFiller=true`
  );

  return (
    <div className="mx-auto w-[94%]">
      <div className="mx-4 my-4  text-2xl mt-10">Episodes</div>
     
      <EpisodePaginated episodes={episodes} />
    </div>
  );
}
