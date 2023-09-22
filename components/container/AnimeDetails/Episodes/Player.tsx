"use client";
import Player from "@oplayer/core";
import hls from "@oplayer/hls";
import ui from "@oplayer/ui";
import { useEffect, useRef, useState } from "react";

export default function OPlayer(props: any) {
  const { sources, episode } = props;
  const playerRef = useRef();

  useEffect(() => {
    // Create the player only once using the initial values
    if (!playerRef.current) {
      playerRef.current = Player.make("#oplayer")
        .use([
          ui({
            theme: {
              primaryColor: "#e63946",
            },
            pictureInPicture: true,
            subtitle: { background: true, shadow: "none" },
            slideToSeek: "always",
            icons: {
              loadingIndicator: `
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e63946" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-2 w-12 h-12"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            `,
              next: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-last"><polyline points="7 18 13 12 7 6"/><path d="M17 6v12"/></svg>`,
            },
            settings: [
              "loop",
              {
                name: "Quality",
                key: "KEY",
                type: "selector",
                icon: `<svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className='w-7 h-7'
              >
                <path d="M14.5 13.5h2v-3h-2M18 14a1 1 0 01-1 1h-.75v1.5h-1.5V15H14a1 1 0 01-1-1v-4a1 1 0 011-1h3a1 1 0 011 1m-7 5H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11m8-5H5c-1.11 0-2 .89-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>`,
                // children: sources.map((source:any) => ({
                //   name: source.quality,
                //   value: source.url,
                //   default: source.quality === "default",
                // })),
              },
            ],
            topSetting: true,
          }),
          hls({ forceHLS: true }),
        ])
        .create();
    }
    var forward = document.createElement("button");
  }, []); // Empty dependency array ensures this effect runs only once on initial render

  useEffect(() => {
    // Update the player source and subtitles when sources change
    if (!playerRef.current) return;
    console.log(sources);
    playerRef.current.changeSource({
      src: "https://ea.netmagcdn.com:2228/hls-playback/b73790ed14ea2359a27763278d26e79927f961a591650895cedfe4499f2cd4362ceafc7cc6ad05687cfb4caba38027abe2c9477fc37e392b8500939d3f984805b6b7a1d5797142e4d2e696bf4ed0b24391947b45775813f4e084c43a2c8a8979eb1916da1998d24fd75c37dd4b8bd0bc7d703da3f0b994c062f2768fe8bbf375430541cdfd9c4d0531eaadc573c2b406/master.m3u8"
    });

   
  }, []);

  return (
    <>
      <div key={episode.id} className="w-full my-5">
        {episode  && (
          <>
            <div className="justify-center flex">
              <div
                className="w-full h-full lg:w-[720px] aspect-video border-white/30"
                id="oplayer"
              />
            </div>
          </>
        ) }
      </div>
    </>
  );
}
