"use client";
import React, { useEffect, useRef } from "react";
import Player from "@oplayer/core";
import OUI from "@oplayer/ui";
import OHls from "@oplayer/hls";
import { chromecast, vttThumbnails } from "@oplayer/plugins";
type Ctx = {
  ui: ReturnType<typeof OUI>;
  hls: ReturnType<typeof OHls>;
};

export default function OPlayer({
  sources,
  subtitles,
  episode,
}: {
  sources: any;
  subtitles: any[];
  episode: any;
}) {
  const playerRef = useRef<Player<Ctx>>();
  const { image, title } = episode;
  const englishSubtitles = subtitles.filter(
    (subtitle) => subtitle.lang.toLowerCase() === "english"
  );

  const subtitlesList = englishSubtitles.map((subtitle, index) => ({
    src: subtitle.url,
    default: index === 0,
    name: subtitle.lang,
  }));

  const plugins = [
    OUI({
      fullscreen: true,
      coverButton: true,
      miniProgressBar: true,
      forceLandscapeOnFullscreen: true,
      screenshot: false,
      pictureInPicture: false,
      showControls: "always",
      settings: ["loop"],
      theme: { primaryColor: "#DC2627" },
      speeds: ["2.0", "1.75", "1.25", "1.0", "0.75", "0.5"],
      slideToSeek: "none",
      controlBar: { back: "always" },
      topSetting: false,
      subtitle: {
        fontSize: 20,
        background: true,
      },
    }),
    OHls(),
    chromecast,
    vttThumbnails,
  ];

  useEffect(() => {
    playerRef.current = Player.make("#oplayer")
      .use(plugins)
      .create() as Player<Ctx>;
    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const oplayer = playerRef.current;
    if (!oplayer) return;
    oplayer.context.ui.menu.unregister("Source");
    oplayer
      .changeSource({ src: sources[0].url, poster: image, title: title })
      .catch((err) => console.log(err));
    oplayer.context.ui.subtitle?.changeSource(subtitlesList);
  }, [sources, subtitles]);

  return (
    <div
      id="oplayer"
      className="aspect-video w-full lg:w-[600px]  mx-auto my-10"
    />
  );
}
