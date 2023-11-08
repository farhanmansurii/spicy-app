"use client";
import Link from "next/link";
import AnimeCard from "./Card";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface Anime {
id: number;
image?: string;
coverImage: {
  large: string;
};
title: {
  english?: string;
  userPreferred?: string;
};
type: string;
relationType: string;
releaseDate: string;
}

interface RowProps {
typeOfAnime?: Anime[];
text: string;
}

const Row: React.FC<RowProps> = ({ typeOfAnime, text }) => {
const scrollContainerRef = useRef<HTMLDivElement | null>(null);

const scrollTo = (scrollOffset: number) => {
  if (scrollContainerRef.current) {
    const container = scrollContainerRef.current;
    const currentScrollLeft = container.scrollLeft;
    const targetScrollLeft = currentScrollLeft + scrollOffset;
    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }
};

return (
  typeOfAnime && typeOfAnime?.length > 0 && (
    <div className="w-11/12 mx-auto mb-10">
      <div
        className="flex my-2 items-center
      justify-between"
      >
        <h2 className="text-2xl lg:text-3xl my-2 mx-2">{text}</h2>
        <div className="flex gap-3">
          <Button
            size="sm"
            onClick={() => scrollTo(-400)}
            className=" rounded-full w-8 h-8 p-2"
          >
            <ChevronLeft />
          </Button>
          <Button
            size="sm"
            onClick={() => scrollTo(400)}
            className=" rounded-full w-8 h-8 p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflowX: "scroll",
          gap: "2px",
          scrollbarWidth: "none", // Hide the scrollbar in Firefox
          WebkitOverflowScrolling: "touch", // Enable smooth scrolling on iOS
        }}
      >
        {typeOfAnime?.map((e) => (
          <Link href={`/anime/${e.id}`} key={e.id}>
            <AnimeCard
              key={e.id}
              animeImg={e.image || e.coverImage.large}
              title={e.title.english || e.title.userPreferred || ""}
              id={e.id}
              type={e.type}
              relationType={e.relationType}
              releaseDate={e.releaseDate}
            />
          </Link>
        ))}
      </div>
    </div>
  )
);
};

export default Row;
