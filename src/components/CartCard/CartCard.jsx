import { Button, Flex, InputNumber } from "antd";
import React, { useState } from "react";
import StarIcon from "../../assets/icons/StarIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

function CartCard() {
  const [orderCount, setOrderCount] = useState(1);

  return (
    <div className="grid grid-cols-[164px_1fr] desktop:grid-cols-[205px_1fr] gap-[14px] desktop:gap-7">
      <img
        className="w-full h-[147px] desktop:h-[175px] rounded-xl"
        src="https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/40050/optimized_large_thumb_stage.jpg"
        alt=""
      />
      <Flex vertical className="desktop:gap-5 gap-2">
        <div className="flex desktop:gap-24 justify-between desktop:justify-normal">
          <Flex vertical className="gap-[2px] desktop:gap-[6px]">
            <h1 className="text-sm desktop:text-[22px] font-medium">
              Book Name
            </h1>
            <Flex className="gap-[17px]">
              <Flex align="center" className="gap-1">
                <StarIcon width={15} />
                <p className="text-[10px] desktop:text-xs">4.5</p>
              </Flex>
              <Flex align="center" className="gap-1">
                <p className="text-[10px] desktop:text-xs text-gray-700">
                  <span>302</span> review
                </p>
              </Flex>
            </Flex>
          </Flex>
          <Flex align="center" className="hidden desktop:flex">
            <Button
              onClick={() =>
                setOrderCount((prev) => {
                  if (prev < 2) {
                    return prev;
                  } else {
                    return prev - 1;
                  }
                })
              }
              className="rounded-lg desktop:rounded-e-none px-3 py-1 desktop:p-[10px] desktop:w-11 desktop:h-11 text-lg desktop:text-2xl"
            >
              -
            </Button>
            <InputNumber
              onChange={(e) => setOrderCount(e)}
              value={orderCount}
              type="number"
              className="w-7 desktop:w-[52px] text-center rounded-none cart-input desktop:h-11 border-0 desktop:border"
            />
            <Button
              onClick={() => setOrderCount((prev) => prev + 1)}
              className="rounded-lg desktop:rounded-s-none px-3 py-1 desktop:p-[10px] desktop:w-11 desktop:h-11 text-lg desktop:text-2xl"
            >
              +
            </Button>
          </Flex>
          <Button className="p-0 border-none shadow-none">
            <CloseIcon width={24} />
          </Button>
        </div>
        <Flex gap={18} align="center" className="order-1 desktop:order-none">
          <p className="desktop:text-skyBlue-500 desktop:text-xl font-medium">
            $ <span>15,90</span>
          </p>
          <p className="text-gray-700 text-xs desktop:text-sm font-medium">
            $ <span>15,90</span>
          </p>
        </Flex>
        <ul className="text-[10px] desktop:text-xs flex flex-col gap-[6px]">
          <li>
            Sifariş: <span>NO İDE63837380945843f5</span>
          </li>
          <li>
            Tarix : <span>11 Mart 2024</span>
          </li>
          <li>
            Ünvan: <span>Yasamal rayonu, Əsəd Əhmədov 126</span>
          </li>
        </ul>
        <Flex gap={10} align="center" className="desktop:hidden">
          <Button
            onClick={() =>
              setOrderCount((prev) => {
                if (prev < 2) {
                  return prev;
                } else {
                  return prev - 1;
                }
              })
            }
            className="rounded-lg px-3 py-1 text-lg"
          >
            -
          </Button>
          <span className="text-sm text-center">{orderCount}</span>
          <Button
            onClick={() => setOrderCount((prev) => prev + 1)}
            className="rounded-lg px-3 py-1 text-lg"
          >
            +
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default CartCard;
