import { fetchData } from "@/utils/helper";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar";
import Link from "next/link";

export default async function Carousal() {
  const res = await fetchData("trending");
  const data = res?.results[9];
  return (
    <div className="relative h-[400px]">
      <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-background to-transparent" />
      <div
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100%",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full md:hidden"
      />
      <div
        style={{
          backgroundImage: `url(${data.cover})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100%",
          backgroundRepeat: "no-repeat",
        }}
        className="h-full hidden md:flex"
      />
      <div className="absolute top-0 w-full z-10">
        <div className="flex justify-end pt-4 items-end w-11/12 mx-auto">
          <div className="cursor-pointer">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="py-10 absolute w-11/12 mx-auto flex flex-col  justify-end uppercase inset-0">
        <div className="text-4xl my-1 lg:text-5xl w-full capitalize">
          {data.title.english || data.title.userPreferred || ""}
        </div>
        <div className="pt-2">
          <div className="rounded-full w-fit p-2.5 bg-primary">
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
