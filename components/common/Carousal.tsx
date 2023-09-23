import { fetchData } from "@/utils/helper";
import React from "react";

export default async function Carousal() {
  const res = await fetchData("trending");
  const data = res.results[9];
  return (
    <div className="w-full relative -z-10   h-[280px] lg:h-[300px]  ">
      <div
        className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#121212]
       to-transparent"
      />
      <div
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "full",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full md:hidden"
      />
      <div
        style={{
          backgroundImage: `url(${data.cover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "full",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full hidden md:flex"
      />
      <div
        className="z-50 py-10
       flex lg:gap-2 flex-col absolute w-11/12 mx-auto justify-end uppercase inset-0"
      >
        <div className="mx-auto text-left text-4xl my-1 lg:text-5xl w-full capitalize">
          {data.title.english || data.title.userPreferred || ""}
        </div>
        {/* <div className="text-sm  opacity-50 lg:block capitalize line-clamp-3 lg:line-clamp-4 w-10/12">
          {data.description && data.description}
        </div> */}
        <div className="flex pt-2 gap-3">
          <div className="rounded-full p-2.5 bg-primary">
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="2em"
              width="2em"
            >
              <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
