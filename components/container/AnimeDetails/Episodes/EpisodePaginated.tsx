"use client";
import React, { useEffect, useState } from "react";
import EpisodeCard from "./EpisodeCard";
import OPlayer from "./Player";
import EpisodeRangeSelector from "./EpisodeRangeSelector";
import { fetchLinks } from "@/utils/helper";
import { Skeleton } from "@/components/ui/skeleton";

interface Episode {
  id: string;
  episode: number;
  image: string;
  title?: string;
  number: number;
  description?: string;
}

interface EpisodeListProps {
  episodes: Episode[];
}
interface Range {
  start: number;
  end: number;
}
export default function EpisodeList(props: EpisodeListProps) {
  const { episodes } = props;

  const [selectedEp, setSelectedEp] = useState<Episode | null>(null);
  const [links, setLinks] = useState<{
    sources: string[];
    subtitles: string[];
  }>({
    sources: [],
    subtitles: [],
  });

  const [range, setRange] = useState<Range>({
    start: 0,
    end: 25,
  });

  const totalEpisodes = episodes.length;

  const toggleEP = async (ep: Episode) => {
    setSelectedEp(ep);
    try {
      const link = await fetchLinks(ep.id);
      setLinks(link);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleRangeChange = (newRange: string) => {
    const [start, end] = newRange.split("-");
    setRange({
      start: parseInt(start) - 1,
      end: parseInt(end),
    });
  };
  useEffect(() => {
    toggleEP(episodes[0]);
  }, [episodes]);

  return (
    <div>
      {selectedEp && links?.sources?.length > 0 ? (
        <OPlayer
          key={selectedEp.id}
          episode={selectedEp}
          sources={links.sources}
          subtitles={links.subtitles}
        />
      ) : (
        <div className="aspect-video  w-full lg:w-[600px]  mx-auto my-10 flex justify-center items-center text-center">
          <Skeleton className="w-full h-full" />
        </div>
      )}

      <div className="my-4 flex items-center mb-4  justify-between text-2xl mt-10">
        <div>Episodes</div>
        {episodes.length > 30 && (
          <EpisodeRangeSelector
            range={range}
            handleRangeChange={handleRangeChange}
            totalEpisodes={totalEpisodes}
          />
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {episodes.length > 30
          ? range.start < range.end
            ? episodes
                .slice(range.start, range.end || 25)
                .map((e: Episode) => (
                  <EpisodeCard
                    activeID={selectedEp?.id}
                    active={toggleEP}
                    episode={e}
                    key={e.id}
                  />
                ))
            : episodes
                .slice(range.start - 1, range.end)
                .map((e: Episode) => (
                  <EpisodeCard
                    activeID={selectedEp?.id}
                    active={toggleEP}
                    episode={e}
                    key={e.id}
                  />
                ))
          : episodes.map((e: Episode) => (
              <EpisodeCard
                activeID={selectedEp?.id}
                active={toggleEP}
                episode={e}
                key={e.id}
              />
            ))}
      </div>
    </div>
  );
}
