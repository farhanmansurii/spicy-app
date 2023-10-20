import React from "react";

interface Episode {
  id: number;
  episode: number;
  image: string;
  title?: string;
  number: number;
  description?: string;
}

interface EpisodeCardProps {
  episode: any;
  active: any;
  activeID: any;
}

export default function EpisodeCard(props: EpisodeCardProps) {
  const { episode, active, activeID } = props;

  return (
    <div
      key={episode.id}
      onClick={() => active(episode)}
      className={`episode-card flex-none relative w-full aspect-video ${
        activeID === episode.id
          ? " border border-primary "
          : "border border-transparent hover:border-primary "
      }`}
    >
      <div className="overlay absolute inset-0  bg-background/50 hover:bg-background/50 group-hover:bg-opacity-70"></div>
      <div className="episode-img-container rounded w-full h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={episode?.image}
          alt={`Episode ${episode?.episode}`}
        />
      </div>

      <div className="episode-info absolute text-left bottom-2 w-full px-4">
       <div className="flex gap-2"> 

        <div  className="bg-primary/80 px-2 text-xs py-1 rounded w-fit">
          E{episode?.number}
        </div>
        {activeID === episode.id ? (
          <div className="bg-primary/80 px-2 text-xs py-1 rounded w-fit">
            Now Playing
          </div>
        ) : (
          ""
          )}
          </div>
        <h3 className="text-xs lg:text-lg line-clamp-2">
          {episode?.title !== "Full" ? episode?.title : ""}
        </h3>

        <h3 className="text-xs lg:text-md opacity-70 line-clamp-2">
          {episode?.description}
        </h3>
      </div>
    </div>
  );
}
