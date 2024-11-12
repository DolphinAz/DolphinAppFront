import React, { useState } from "react";
import HeartIcon from "../../assets/icons/HeartIcon";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import BasketIcon from "../../assets/icons/BasketIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import { Badge, Button, Input } from "antd";
import BasketSidebar from "../BasketSidebar/BasketSidebar";
import { Link } from "react-router-dom";

function SubHeader() {
  const [basketOpen, setBasketOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div className="flex gap-5 desktop:grid desktop:grid-cols-3 desktop:gap-0 pt-5 px-5 pb-2 desktop:px-10 place-items-center">
      <div className="hidden desktop:block"></div>
      <div className="relative flex flex-1">
        <Input
          placeholder="Axtar"
          className="w-full desktop:w-[370px] px-5 py-3 pr-14"
        />
        <span className="absolute top-2/4 -translate-y-2/4 right-5">
          <SearchIcon width={24} />
        </span>
      </div>
      <div className="desktop:w-full flex justify-end items-center gap-[10px] h-fit">
        <HeartIcon width={24} specialClass="cursor-pointer fill-none" />
        {accessToken && (
          <Link to="/profile">
            <ProfileIcon width={24} specialClass="cursor-pointer fill-none" />
          </Link>
        )}

        <div
          onClick={() => setBasketOpen(true)}
          className="relative flex cursor-pointer"
        >
          <Button className="p-0 border-none shadow-none">
            <Badge count={11} overflowCount={10} color="#0B84BC">
              <BasketIcon
                width={24}
                specialClass={"cursor-pointer fill-black-100"}
              />
            </Badge>
          </Button>
        </div>
      </div>
      <BasketSidebar basketOpen={basketOpen} setBasketOpen={setBasketOpen} />
    </div>
  );
}

export default SubHeader;
