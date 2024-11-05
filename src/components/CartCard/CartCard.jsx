import { Button, Flex, InputNumber } from "antd";
import React, { useState } from "react";
import StarIcon from "../../assets/icons/StarIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

function CartCard() {
  const [orderCount, setOrderCount] = useState(1);

  return (
    <Flex className="gap-[14px] desktop:gap-7">
      <img
        className="w-[205px] h-[175px] object-cover rounded-xl"
        src="https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/40050/optimized_large_thumb_stage.jpg"
        alt=""
      />
      <Flex vertical className="desktop:gap-5">
        <Flex className="desktop:gap-24">
          <Flex vertical className="gap-[6px]">
            <h1 className="text-[22px] font-medium">Book Name</h1>
            <Flex className="gap-[17px]">
              <Flex align="center" className="gap-1">
                <StarIcon width={15} />
                <p className="text-xs">4.5</p>
              </Flex>
              <Flex align="center" className="gap-1">
                <p className="text-xs text-gray-700">
                  <span>302</span> review
                </p>
              </Flex>
            </Flex>
          </Flex>
          <Flex align="center">
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
              className="rounded-e-none h-11 text-2xl"
            >
              -
            </Button>
            <InputNumber
              onChange={(e) => setOrderCount(e)}
              value={orderCount}
              type="number"
              className="w-[52px] text-center rounded-none cart-input h-11"
            />
            <Button
              onClick={() => setOrderCount((prev) => prev + 1)}
              className="rounded-s-none h-11 text-2xl"
            >
              +
            </Button>
          </Flex>
          <Button className="p-0 border-none shadow-none">
            <CloseIcon width={24} />
          </Button>
        </Flex>
        <ul className="text-xs flex flex-col gap-[6px]">
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
      </Flex>
    </Flex>
  );
}

export default CartCard;
