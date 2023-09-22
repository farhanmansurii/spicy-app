import { fetchData, fetchLinks } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import OPlayer from "./Player";

export default function NowPlaying(props: any) {
  return (
    <div>
      {props.links && (
        <OPlayer sources={props.links.sources} episode={props.episode} />
      )}
    </div>
  );
}
