'use client';
import useAnimeStore from '@/store/animeStore';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RecentlyWatched() {
  const { recentlyWatched, loadRecentlyWatched } = useAnimeStore();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTo = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScrollLeft = container.scrollLeft;
      const targetScrollLeft = currentScrollLeft + scrollOffset;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    loadRecentlyWatched();
  }, [loadRecentlyWatched]);
  return (
    recentlyWatched.length > 0 && (
      <div className="w-11/12 mx-auto my-10">
        <div
          className="flex my-2 items-center
       justify-between"
        >
          <h2 className="text-2xl lg:text-3xl my-2 mx-2">Continue Watching</h2>
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
            display: 'flex',
            overflowX: 'scroll',
            gap: '2px',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {recentlyWatched.map((episode) => (
            <Link
              href={`/anime/${episode.animeID}`}
              key={episode.id}
              className={`episode-card flex-none rounded relative w-[250px] aspect-video`}
            >
              <div className="overlay absolute inset-0 rounded bg-[#111111]/70 hover:bg-[#111111]/50 group-hover:bg-opacity-70"></div>
              <div className="episode-img-container rounded w-full h-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={episode?.image}
                  alt={`Episode ${episode?.episode}`}
                />
              </div>

              <div className="episode-info absolute text-left bottom-2 w-full px-4">
                <div className="text-xs w-fit lg:text-md bg-primary/80 text-white px-3 mb-1 py-1 rounded">
                  E{episode?.number}
                </div>
                <h3 className="text-md lg:text-lg line-clamp-1">
                  {episode?.animeTitle}
                </h3>
                <h3 className="text-xs lg:text-md opacity-70 line-clamp-2">
                  {episode?.description}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
}
