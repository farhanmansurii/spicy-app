"use client";
import { Button } from "@/components/ui/button";
import { formatNextAiringEpisode } from "@/utils/helper";
import { LucideYoutube } from "lucide-react";
import React, { useState } from "react";
import parse from "html-react-parser";
export default function ShowDescription(props: any) {
  const [show, setshow] = useState(false);
  const toggle = () => setshow((prev) => !prev);
  return (
    <div>
      {" "}
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
        <Button
          onClick={() => toggle()}
          variant="secondary"
          className="w-fit text-xs"
        >
          {show ? "Hide Synopsis" : "Show Synopsis"}
        </Button>
      </div>
      {show && (
        <p className=" bg-primary p-2 rounded-xl overflow-scroll mt-4  text-xs">
          {parse(props.data.description)}
        </p>
      )}
    </div>
  );
}
