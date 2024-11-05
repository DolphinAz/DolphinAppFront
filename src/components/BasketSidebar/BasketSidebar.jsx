import { Button } from "antd";
import React from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import { Link } from "react-router-dom";

function BasketSidebar({ basketOpen, setBasketOpen }) {
  return (
    <div
      onClick={() => setBasketOpen(false)}
      className={`fixed flex justify-end top-0 left-0 w-full h-[100vh] bg-modal z-10 duration-300 ${
        basketOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`grid grid-rows-[48px_1fr_112px] gap-[46px] bg-white w-full desktop:w-[441px] overflow-hidden h-full px-4 pt-11 pb-8 duration-300 ${
          basketOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Səbət</h1>
          <button onClick={() => setBasketOpen(false)}>
            <CloseIcon width={24} />
          </button>
        </div>
        <div className="flex flex-col gap-5 h-screen-327 overflow-auto scrollbar-custom pr-2">
          <div className="flex gap-[14px] bg-gray-600 p-[10px] rounded-[10px]">
            <div className="w-[163px] h-[148px] rounded-[10px] bg-white flex justify-center items-center">
              <img
                className="w-[90%] h-[90%] rounded-[10px] object-cover"
                src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip"
                alt=""
              />
            </div>
            <div className="flex flex-col flex-1 justify-between pt-[10px] pb-5">
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[20px]">Aile Sirləri</h1>
                  <p className="text-[12px] text-skyBlue-500">Stokda var</p>
                </div>
                <Button className="p-0" type="submit">
                  <TrashIcon />
                </Button>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-[7px]">
                  <Button
                    className="flex justify-center items-center bg-white w-[30px] h-[25px] px-2 py-[3px] font-semibold leading-[0]"
                    type="submit"
                  >
                    -
                  </Button>
                  <span>1</span>
                  <Button
                    className="flex justify-center items-center bg-white w-[30px] h-[25px] px-2 py-[3px] font-semibold leading-[0]"
                    type="submit"
                  >
                    +
                  </Button>
                </div>
                <p>
                  ₼ <span className="font-semibold">50</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-[30px]">
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Ümumi məbləğ:</h1>
            <p>
              ₼ <span className="font-semibold">50</span>
            </p>
          </div>
          <Link onClick={() => setBasketOpen(false)} to="/cart">
            <Button
              className="bg-skyBlue-500 w-full h-[46px] py-[17px] px-[30px]"
              type="primary"
            >
              Səbətə get
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BasketSidebar;
