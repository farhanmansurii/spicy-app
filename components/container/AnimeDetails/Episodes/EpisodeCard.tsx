import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function EpisodeCard(props: any) {
  const { episode, active } = props;

  return (
    <div
      key={episode.id}
      onClick={() => active(episode)}
      className="episode-card flex-none relative w-full aspect-video"
    >
      <div className="overlay absolute inset-0 bg-[#111111]/70 hover:bg-[#111111]/50"></div>
      <div className="episode-img-container w-full h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={episode?.image}
          alt={`Episode ${episode?.episode}`}
        />
      </div>

      <div className="episode-info absolute text-left bottom-2 w-full px-4">
        <div
          className="text-xs w-fit
       lg:text-md bg-primary/80 text-white px-3 mb-1 py-1 rounded"
        >
          E{episode?.number}
        </div>
        <h3 className="text-md lg:text-lg line-clamp-1">
          {episode?.title && episode.title}
        </h3>
        <h3 className="text-xs lg:text-md opacity-70 line-clamp-2">
          {episode?.description}
        </h3>
      </div>
    </div>
  );
}
