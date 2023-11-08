"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Button } from "../ui/button";
import { Play, Plus } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
SwiperCore.use([Pagination]);

export default function CarousalComponent(props: any) {
  const [activeSlide, setActiveSlide] = useState(1);
  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.realIndex);
  };
  return (
    props.items.length > 2 && (
      <div className=" ">
        <div className="w-full z-10 absolute justify-center flex  top-0">
          <div className="flex p-4 items-center flex-row-reverse w-full lg:w-11/12 justify-between mx-auto">
            <div className="flex items-center justify-center gap-4">
              <SearchBar />
            </div>
          </div>
        </div>
        <Swiper
          effect={""}
          grabCursor={true}
          centeredSlides={true}
          autoplay={true}
          slidesPerView={2} // Display 4 slides at once
          spaceBetween={2} // Add space between slides
          mousewheel={true}
          initialSlide={1}
          style={{ paddingBlock: "4rem" }}
          className=""
          onSlideChange={handleSlideChange}
        >
          {props.items?.map((show: any, index: any) => (
            <SwiperSlide key={index}  >
              <div className="md:hidden relative h-96 w-full">
                <img
                  src={show.image}
                  className="w-full h-full object-cover rounded-xl"
                  alt=""
                />
                <div
                  className={`absolute inset-0 duration-400 ${
                    activeSlide === index
                      ? "shadow-neutral-900 shadow-2xl rounded-lg"
                      : "bg-background opacity-70"
                  }`}
                ></div>
                {activeSlide === index ? (
                  <div className="flex gap-2 absolute inset-0 justify-center items-center">
                    <Link href={`/movie/${show.id}`}>
                      <Button className="rounded-full shadow-2xl shadow-primary w-12 h-12 gap-2">
                        <Play />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="hidden md:block relative h-full w-full">
                <img
                  src={show.cover}
                  className={`w-full h-full aspect-video object-cover rounded-xl`}
                  alt=""
                />
                <div
                  className={`absolute inset-0 ${
                    activeSlide === index
                      ? "bg-gradient-to-t shadow-neutral-900 shadow-2xl rounded-xl from-background to-transparent"
                      : "bg-background opacity-70"
                  }`}
                ></div>
                {activeSlide === index ? "" : ""}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
}
