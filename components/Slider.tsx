"use client";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "./ui/button";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/05-clothes.jpeg",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },

  {
    id: 3,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "/01-clothes.jpeg",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
];

export default function Slider() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`flex flex-col md:flex-row w-full h-full mt-16 md:mt-0 ${slide.bg}`}
            >
              <div className="flex flex-col justify-center items-center gap-6 flex-1 py-20 px-4 md:px-20">
                <p className="text-xl md:text-2xl text-black">
                  {slide.description}
                </p>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center">
                  {slide.title}
                </h1>
                <Button className="bg-black" asChild>
                  <Link href={"/shop"}>Shop Now</Link>
                </Button>
              </div>
              <Image
                src={slide.img}
                alt={slide.title}
                width={800}
                height={600}
                className="object-cover flex-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
