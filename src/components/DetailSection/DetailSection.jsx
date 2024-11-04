import React, { useState } from "react";
import FavoriteIcon from "../../assets/icons/FavoriteIcon";
import { Button, Flex } from "antd";
import StarIcon from "../../assets/icons/StarIcon";
import BasketIcon from "../../assets/icons/BasketIcon";

function DetailSection() {
  const [orderCount, setOrderCount] = useState(1);

  const details = [
    {
      label: "Yazıçı",
      value: "Agatha Christie",
    },
    {
      label: "Janr",
      value: ["Dedektiv", "Elmi"],
    },
    {
      label: "İl",
      value: 2006,
    },
    {
      label: "Səhifə sayı",
      value: 126,
    },
    {
      label: "Dil",
      value: "Azərbaycan",
    },
  ];

  return (
    <section className="px-5 desktop:px-10 py-8 desktop:py-[50px] desktop:grid desktop:grid-cols-[2fr_1fr] gap-[50px]">
      <Flex className="flex-col desktop:flex-row gap-5 desktop:gap-8">
        <div className="relative desktop:w-[299px] h-[177px] desktop:h-[323px]">
          <img
            className="w-full h-full object-cover rounded-xl"
            src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
            alt=""
          />
          <div className="hidden desktop:block absolute top-[15px] right-[15px]">
            <Button className="p-0 shadow-none" type="submit">
              <FavoriteIcon />
            </Button>
          </div>
        </div>
        <Flex vertical gap={27}>
          <Flex vertical className="gap-[6px]">
            <h1 className="text-skyBlue-500 desktop:text-black-100 desktop:text-[26px] font-medium">
              Book Name
            </h1>
            <p className="block desktop:hidden text-[10px] text-gray-550">
              Lorem Ipsum is simply dummy text of the printi
            </p>
            <Flex className="gap-2 desktop:gap-[17px]" align="center">
              <Flex
                gap={4}
                align="center"
                className="text-[10px] desktop:text-xs"
              >
                <StarIcon width={15} />
                <p>4.5</p>
              </Flex>
              <Flex
                className="text-gray-700 text-[10px] desktop:text-xs"
                gap={6}
              >
                <p>302</p>
                <p>review</p>
              </Flex>
            </Flex>
          </Flex>
          <div className="grid grid-cols-2 gap-3 desktop:gap-[14px_50px]">
            {details.map((detail, index) => (
              <Flex
                className="bg-yellow-100 p-1 desktop:p-0 rounded-md desktop:bg-transparent gap-[2px] desktop:gap-[6px]"
                key={index}
                vertical
              >
                <h1 className="font-semibold text-xs desktop:text-base">
                  {detail.label}
                </h1>
                <p className="font-medium desktop:text-gray-700 text-[8px] desktop:text-[13px]">
                  {Array.isArray(detail.value)
                    ? detail.value.join(", ")
                    : detail.value}
                </p>
              </Flex>
            ))}
          </div>
          <p className="text-gray-550 desktop:text-skyBlue-500 text-xs desktop:text-[14px]">
            10-14 gün ərzində çatdırılacaq
          </p>
        </Flex>
      </Flex>
      <Flex vertical className="hidden desktop:flex" gap={20}>
        <Flex gap={19} align="start">
          <Flex vertical gap={4}>
            <h1 className="text-[24px] font-medium">$15,90</h1>
            <p className="text-[14px] font-medium text-gray-700 line-through">
              $19,90
            </p>
          </Flex>
          <Flex gap={10} align="center">
            <Button
              onClick={() =>
                setOrderCount((prevCount) => {
                  if (prevCount < 2) {
                    return prevCount;
                  } else {
                    return prevCount - 1;
                  }
                })
              }
              className="py-[10px]"
            >
              -
            </Button>
            <span>{orderCount}</span>
            <Button
              onClick={() => setOrderCount((prevCount) => prevCount + 1)}
              className="py-[10px]"
            >
              +
            </Button>
          </Flex>
        </Flex>
        <p className="text-[14px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <div className="grid grid-cols-2 gap-[50px] mt-4">
          <Button className="rounded-lg py-[10px] h-10 bg-skyBlue-500 text-white">
            İndi al
          </Button>
          <Button className="rounded-lg py-[10px] h-10 flex gap-2 hover:!bg-skyBlue-500 group border-skyBlue-500">
            <BasketIcon
              width={16}
              specialClass="fill-skyBlue-500 group-hover:fill-white"
            />
            <p className="text-skyBlue-500 group-hover:text-white">Səbətə at</p>
          </Button>
        </div>
      </Flex>
    </section>
  );
}

export default DetailSection;
