import { Button } from "@/components/ui/button";
import { formatNextAiringEpisode } from "@/utils/helper";
import { ArrowLeft, LucideYoutube, Search } from "lucide-react";
import parse from "html-react-parser";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from "@/components/common/SearchBar";
const Animedetails = (props: any) => {
  return (
    <>
        <div className=" w-full ">
          <div className="flex flex-col    mx-auto gap-4 ">
            <div className="relative  w-full h-full md:h-[400px] z-30">
              <div className="absolute -inset-0 -inset-y-2 bg-gradient-to-t from-background  to-transparent"></div>
              <div className="w-full aspect-video md:h-[400px] ">
                <img
                  src={props.data.cover}
                  className="z-0 w-full h-full md:h-[400px] object-cover object-top"
                  alt=""
                />
              </div>
              <div className="w-full absolute justify-center flex  top-0">
                <div className="flex p-4 items-center w-full lg:w-11/12 justify-between mx-auto">
                  <Link href="/">
                    <Button
                      size="icon"
                      className="rounded-full w-10 h-10  md:w-12 md:h-12 "
                    >
                      <ArrowLeft className="  rounded p-1" />
                    </Button>
                  </Link>
                  <div>
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[90%] flex flex-col mx-auto">
              <div className="flex flex-row  gap-4 ">
                <div className="flex flex-col  justify-center gap-2">
                  <div className="flex  gap-4  items-center">
                    <h1 className=" text-4xl capitalize font-bold  lg:text-5xl">
                      {props.data.title.userPreferred ||
                        props.data.title.english ||
                        props.data.title.romaji ||
                        ""}
                    </h1>
                    <Button size="sm" className=" mt-1  ">
                      {(props.data?.rating * 0.1).toFixed(1)}
                    </Button>
                  </div>
                  <div className="flex flex-wrap text-sm line-clamp-1 flex-row  gap-2">
                    <div className="capitalize">{props.data.type || ""}</div>
                    <Separator orientation="vertical" />
                    <div>{props.data.startDate.year || ""}</div>
                    <Separator orientation="vertical" />
                    <div className=" line-clamp-1">
                      {props.data.genres.slice(0, 2).join(" / ")}
                    </div>
                    <Separator className="" orientation="vertical" />
                    <div
                      className="
                     whitespace-nowrap "
                    >
                      {props.data.type === "MOVIE"
                        ? props.data.duration +' minutes'
                        : props.data.totalEpisodes + " Episodes"}
                    </div>
                  </div>

                  {/* <ContinueWatchingButton id={data.id} /> */}
                  <div className="text-xs opacity-50 line-clamp-5">
                    {parse(props.data.description)}
                  </div>
                </div>
              </div>
            </div>
            <Separator className="w-[90%] mx-auto" />
          </div>
        </div>
    </>
  );
};

export default Animedetails;
