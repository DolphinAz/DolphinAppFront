import { Button, Flex } from "antd";
import React from "react";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function PageSection({ title, list }) {
  const formattedTitle = title.split(" ").join("-").toLocaleLowerCase();

  return (
    <section className="px-5 desktop:px-10 py-10 desktop:py-16 flex flex-col gap-7 desktop:gap-12">
      <Flex justify="space-between" align="center">
        <h1 className="text-xl desktop:text-[34px]">{title}</h1>
        <Flex gap={16}>
          <Button
            className={`swiper-prev-for-${formattedTitle} bg-gray-500 p-0 w-7 h-7 desktop:w-12 desktop:h-12 rounded-full border-none duration-300 hover:!bg-gray-800`}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            className={`swiper-next-for-${formattedTitle} bg-gray-500 p-0 w-7 h-7 desktop:w-12 desktop:h-12 rounded-full border-none duration-300 hover:!bg-gray-800`}
          >
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={32}
          navigation={{
            nextEl: `.swiper-next-for-${formattedTitle}`,
            prevEl: `.swiper-prev-for-${formattedTitle}`,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {list?.map((listItem, index) => (
            <SwiperSlide key={index}>
              <ProductCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default PageSection;
