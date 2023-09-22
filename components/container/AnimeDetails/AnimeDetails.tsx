import { Button } from "@/components/ui/button";
import { formatNextAiringEpisode } from "@/utils/helper";
import { LucideYoutube } from "lucide-react";

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
                <div className=" whitespace-normal gap-4 flex text-sm">
                  <p> {props.data.type || ""}</p>
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
                <div>
                  <p className="overflow-scroll h-[50px] lg:h-fit text-xs">
                    {props.data.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {props.data.nextAiringEpisode && (
                <Button variant="secondary" className=" w-fit text-xs">
                  {formatNextAiringEpisode(props.data.nextAiringEpisode)}
                </Button>
              )}
              {props.data.trailer && (
                <a
                  href={`https://www.youtube.com/embed/${props.data.trailer.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-fit text-xs">
                    <LucideYoutube className="p-1" /> Trailer
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animedetails;
