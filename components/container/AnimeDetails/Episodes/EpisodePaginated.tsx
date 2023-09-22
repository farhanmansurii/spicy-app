"use client";
import React, { useState, useEffect } from "react";
import EpisodeCard from "./EpisodeCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import NowPlaying from "./NowPlaying";
import { fetchLinks } from "@/utils/helper";

export default function EpisodePaginated(props: any) {
  const { episodes } = props;
  const episodesPerPage = 25;

  const [range, setRange] = useState("1-25");

  const [selectedEp, setSelectedEp] = useState(null);
  const [links, setlinks] = useState([]);
  const availableRanges = [];
  for (let i = 1; i <= episodes.length; i += episodesPerPage) {
    const end = Math.min(i + episodesPerPage - 1, episodes.length);
    availableRanges.push(`${i}-${end}`);
  }

  useEffect(() => {
    const start = episodesPerPage * (parseInt(range.split("-")[0]) - 1) + 1;
    const end = start + episodesPerPage - 1;
    const currentRange = `${start}-${end}`;
    if (range !== currentRange) {
      setRange(currentRange);
    }
  }, [episodes]);

  const handleRangeChange = (selectedRange: string) => {
    setRange(selectedRange);
  };

  const [startStr, endStr] = range.split("-");
  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);
  const visibleEpisodes = episodes.slice(start - 1, end);
  const toggleEP = async (ep: any) => {
    setSelectedEp(ep);
    const link = await fetchLinks(ep.id);
    setlinks(link);
  };
  return (
    <div>
      {selectedEp ? <NowPlaying episode={selectedEp} links={links} /> : ""}
      {episodes.length > 26 && (
        <Select>
          <SelectTrigger className="w-[300px] rounded px-4 m-2">
            <SelectValue placeholder="Select Episode Range" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] rounded border-primary overflow-y-auto">
            <SelectGroup>
              <SelectLabel>Episode Range</SelectLabel>
              {availableRanges.map((availableRange) => (
                <SelectItem
                  key={availableRange}
                  value={availableRange}
                  onClick={() => handleRangeChange(availableRange)}
                >
                  {availableRange}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {episodes.length > 26
          ? visibleEpisodes.map((e: any, i: number) => (
              <EpisodeCard active={toggleEP} episode={e} key={i} />
            ))
          : episodes.map((e: any, i: number) => (
              <EpisodeCard active={toggleEP} episode={e} key={i} />
            ))}
      </div>
    </div>
  );
}
