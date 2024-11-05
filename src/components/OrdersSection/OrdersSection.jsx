import { Flex } from "antd";
import React from "react";
import OrderCard from "../OrderCard/OrderCard";

function OrdersSection() {
  return (
    <Flex vertical className="gap-[26px]">
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </Flex>
  );
}

export default OrdersSection;
