import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const AnimeDetailsSkeleton = () => {
  return (
    <>
      <div className="lg:mx-auto">
        <div className="pb-4 lg:w-100">
          <div className="flex flex-col w-full mx-auto gap-4">
            <div className="relative w-full h-full z-30">
              <Skeleton className="z-0 w-full bg-background aspect-video h-full md:h-[350px]" />
            </div>
            <div className="w-[90%] flex flex-col mx-auto">
              <div className="flex flex-row p-2 gap-4">
                <div className="flex flex-col justify-center gap-2">
                  <div className="flex gap-4 items-center">
                    <Skeleton className="text-4xl h-[3.2rem]  font-bold lg:text-5xl w-64 " />
                    <Button size="sm"></Button>
                  </div>
                  <div className="flex flex-wrap h-6 gap-2">
                    <Skeleton className="w-8 " />
                    <Skeleton className="w-32" />
                    <Skeleton className="w-24 " />
                  </div>
                  <Skeleton className="text-sm h-16 " />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="aspect-video  w-11/12 mx-auto lg:w-[600px] h-full" />
    </>
  );
};

export default AnimeDetailsSkeleton;
