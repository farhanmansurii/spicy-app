import { Button } from "@/components/ui/button";
import { formatNextAiringEpisode } from "@/utils/helper";
import { LucideYoutube } from "lucide-react";
import parse from "html-react-parser";
import ShowDescription from "./Episodes/ShowDescription";
const Animedetails = (props: any) => {
  return (
    <>
      <div className="  lg:mx-auto">
        <div className="  py-4 lg:w-100 ">
          <div className="flex flex-col w-[96%]   lg:w-11/12 mx-auto gap-4 ">
            <div className="flex flex-row p-2 gap-4 ">
              <img
                loading="lazy"
                src={props.data?.image}
                className="w-[120px] h-full 
                md:w-[200px] rounded"
              />
              <div className="flex flex-col  justify-center gap-2">
                <div className="flex py-2.5 gap-5 text-2xl lg:text-5xl  font-damion  font-semibold line-clamp-3 ">
                  {props.data.title.userPreferred ||
                    props.data.title.english ||
                    props.data.title.romaji ||
                    ""}
                </div>
                <div className=" whitespace-normal  gap-4 flex text-sm">
                  <p className="">
                    {props.data.type === "MOVIE"
                      ? "Movie"
                      : props.data.type || ""}
                  </p>

                  <p> {props.data.startDate.year || ""}</p>
                  {props.data.type.toLowerCase() !== "movie" && (
                    <p> {props.data.status || ""}</p>
                  )}
                  {props.data.rating ? (
                    <p className="flex whitespace-nowrap items-center gap-1">
                      {(props.data?.rating * 0.1).toFixed(1)}/10
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-wrap  gap-x-4 gap-y-2 mt-2 whitespace-normal text-xs">
                  {props.data.genres.map((genre: string, i: number) => (
                    <div className="" key={i}>{genre}</div>
                  ))}
                </div>
              </div>
            </div>
            <ShowDescription data={props.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Animedetails;
