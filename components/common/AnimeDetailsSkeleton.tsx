import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const AnimeDetailsSkeleton = () => {
  return (
    <>
      <Navbar text="" />
      <div className="w-[94%] mx-auto">
        <div className="py-4 lg:w-100 ">
          <div className="flex flex-col  lg:w-11/12 mx-auto gap-4 ">
            <div className="flex flex-row p-2 gap-4 ">
              <Skeleton className="w-[120px]   h-[180px] lg:h-[300px] md:w-[200px]" />

              <div className="flex flex-col justify-center gap-2">
                <Skeleton className="lg:w-[300px] h-8 lg:h-12" />
                <Skeleton className="w-24 h-6  lg:h-10" />
                <Skeleton className="w-44 lg:w-[500px] h-12 lg:h-24" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="w-fit text-xs">
                <Skeleton className="w-20 h-4" />
              </Button>
              <Button className=" w-20 text-xs"></Button>
            </div>
          </div>
        </div>
        <div className="aspect-video  w-full lg:w-[600px]  mx-auto my-10 flex justify-center items-center text-center">
          <Skeleton className="w-full h-full" />
        </div>
        <Skeleton className="w-36 mb-4 h-10" />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton
              className="aspect-video rounded-none"
              key={index}
            /> 
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimeDetailsSkeleton;
