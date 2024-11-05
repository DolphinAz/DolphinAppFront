import { Button, Flex } from "antd";
import React from "react";
import CartCard from "../CartCard/CartCard";

function CartSection() {
  return (
    <section className="px-5 desktop:px-10 py-6 desktop:py-24 flex flex-col gap-8">
      <h1 className="text-[32px] font-medium">
        Sifarişlərim <span>(2)</span>
      </h1>

      <div className="flex flex-col gap-14 desktop:gap-0 desktop:grid desktop:grid-cols-[1fr_352px]">
        <Flex vertical className="gap-8">
          <CartCard />
          <CartCard />
          <CartCard />
        </Flex>
        <Flex vertical className="bg-gray-750 p-3 rounded-md gap-1 h-fit">
          <Flex
            align="center"
            className="gap-[26px] bg-white h-fit p-[10px] rounded-md"
          >
            <div className="w-[78px] h-[81px] object-cover rounded-md">
              <img
                className="w-full h-full rounded-md"
                src="https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/40050/optimized_large_thumb_stage.jpg"
                alt=""
              />
            </div>
            <Flex vertical className="gap-[14px]">
              <h1 className="text-[14px] font-medium text-black-400">
                Nike Men’s Joyride Run Flyknit Shoes
              </h1>
              <p className="font-bold">
                $<span>39.99</span>
              </p>
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            className="bg-white h-fit p-[10px] rounded-md"
          >
            <p className="text-gray-850">Offers</p>
            <span className="p-0 shadow-none border-0 text-xs text-skyBlue-500 border-b border-skyBlue-500 border-dashed cursor-pointer">
              Add Code
            </span>
          </Flex>
          <Flex
            vertical
            className="bg-white h-fit p-[10px] rounded-md gap-[17px]"
          >
            <p className="text-gray-850 pb-2 border-b">Payment Details</p>
            <Flex vertical className="gap-[13px]">
              <Flex align="center" justify="space-between">
                <p className="text-gray-850">Order</p>
                <p className="text-gray-850">
                  $ <span>66.00</span>
                </p>
              </Flex>
              <Flex align="center" justify="space-between">
                <p className="text-gray-850">Delivery</p>
                <p className="text-gray-850">
                  $ <span>2.00</span>
                </p>
              </Flex>
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              className="text-gray-850 font-semibold border-t pt-2"
            >
              <p>Total</p>
              <p>
                $ <span>68.00</span>
              </p>
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            className="bg-white h-fit p-[10px] rounded-md"
          >
            <p className="text-gray-850">Address</p>
            <p className="text-gray-850">Baku</p>
          </Flex>
          <Button className="bg-skyBlue-500 py-4 h-[54px] text-white font-semibold mt-2">
            Ödə
          </Button>
        </Flex>
      </div>
    </section>
  );
}

export default CartSection;
