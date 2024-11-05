import { Flex } from "antd";
import React from "react";

function OrderCard() {
  return (
    <Flex className="desktop:gap-5">
      <img
        className="w-[135px] h-[115px] object-cover rounded-xl"
        src="https://miblart.com/wp-content/uploads/2024/01/main-3-1-scaled.jpg"
        alt=""
      />
      <Flex vertical>
        <h1 className="text-lg font-medium desktop:gap-2">Book Name</h1>
        <ul className="flex flex-col gap-[6px]">
          <li className="text-xs text-gray-550">
            Sifariş <span>NO İDE63837380945843f5</span>
          </li>
          <li className="text-xs text-gray-550">
            Tarix : <span>11 Mart 2024</span>
          </li>
          <li className="text-xs text-gray-550">
            Ünvan: <span>Yasamal rayonu, Əsəd Əhmədov 126</span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}

export default OrderCard;
