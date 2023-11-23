/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Button } from '../ui/button';
import { Play, Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchBar } from './SearchBar';
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
          effect={''}
          grabCursor={true}
          centeredSlides={true}
          autoplay={true}
          slidesPerView={1} // Display 4 slides at once
          spaceBetween={2} // Add space between slides
          mousewheel={true}
          initialSlide={1}
          className=""
          onSlideChange={handleSlideChange}
        >
          {props.items?.map((show: any, index: any) => (
            <SwiperSlide key={index}>
              <Link href={show.id}>
                <div className="relative aspect-video">
                  <img
                    src={show.image}
                    className="w-full h-full object-cover "
                    alt=""
                  />
                  <div
                    className={`absolute inset-0 duration-400 ${'shadow-neutral-900 shadow-2xl '}`}
                  ></div>
                  <div className="absolute inset-0 flex justify-between flex-col bg-gradient-to-t from-background to-transparent ">
                    <div></div>
                    <div className="p-4 text-xl md:text-3xl capitalize">
                      <div>
                        <div>{show?.title.english}</div>
                        <Button className="px-4 my-2 rounded-full">
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
}
