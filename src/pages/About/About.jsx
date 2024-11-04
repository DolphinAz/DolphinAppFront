import { Button, Flex } from "antd";
import React from "react";
import LinearSquareIcon from "../../assets/icons/LinearSquareIcon";
import aboutImage from "../../assets/images/about-image.jpg";

function About() {
  return (
    <section className="px-5 desktop:px-10 pt-10 pb-[60px] flex flex-col desktop:grid desktop:grid-cols-2 gap-10 desktop:gap-20">
      <div className="relative w-full h-[200px] desktop:h-fit overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={aboutImage}
          alt="About image"
        />
        <div className="desktop:hidden absolute top-0 left-0 rounded-xl bg-black z-[1] w-full h-full blur-md opacity-30"></div>
        <h1 className="desktop:hidden z-[1] absolute top-2/4 -translate-y-2/4 left-4 text-white font-semibold">
          Biz kimik
        </h1>
      </div>
      <Flex vertical gap={12}>
        <Flex gap={12} align="center" className="hidden desktop:flex">
          <span className="flex justify-center items-center bg-red-200 w-9 h-9 rounded-lg">
            <LinearSquareIcon />
          </span>
          <p className="font-normal text-black">Biz kimik?</p>
        </Flex>
        <h1 className="text-[35px] font-semibold">Our Company Overview</h1>
        <Flex vertical gap={32}>
          <p className="text-gray-450">
            Carlio brand is one of the most reliable motor oil manufacturers,
            which is engaged in the production of high quality products with a
            history of more than decades in the industry. In order to get more
            information about other aspects and products of the Carlio brand,
            you can use the following buttons:
          </p>
          <span className="flex bg-gray-350 w-full h-[1px]"></span>
          <p className="text-gray-450">
            The meaning of production in Carlio is the creation, development,
            and the path to progress, and the starting point to achieve the
            goals that we all have the Petroforce brand, with over 20 years of
            experience in the oil and petrochemical industry, we officially
            started our activities in the field of design, engineering,
            construction of refinery equipment, and the production of various
            motor and industrial lubricants in the year 1390 (2011)
          </p>
        </Flex>
        <Button className="mt-3 w-fit py-4 px-6 h-14 bg-skyBlue-500 text-white font-medium">
          Daha çox
        </Button>
      </Flex>
    </section>
  );
}

export default About;
