import React from "react";
import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeChanger } from "./ThemeChanger";

export default function Navbar({ text = "SpicyAnime" }) {
  return (
    <div className="w-full  py-8 ">
      <div className="flex gap-4 justify-between  items-center flex-row w-[90%] mx-auto text-2xl">
        {text !== "SpicyAnime" && (
          <div>
            <Link href="/">
              <div className="bg-primary rounded-full p-2.5 ">
                <ArrowLeft />
              </div>
            </Link>
          </div>
        )}
        {text !== "SpicyAnime" ? (
          <div>{text} </div>
        ) : (
          <Link href="">{text} </Link>
        )}

        <SearchBar />
      </div>
    </div>
  );
}
