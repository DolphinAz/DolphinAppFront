import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import FaveoriteIconFill from "../../assets/icons/FaveoriteIconFill";
import FavoriteIcon from "../../assets/icons/FavoriteIcon";
import AddToCartIcon from "../../assets/icons/AddToCartIcon";
import StarIcon from "../../assets/icons/StarIcon";
import { useNavigate } from "react-router-dom";
import OrderToast from "../OrderToast/OrderToast";
import toast from "react-hot-toast";
import successIcon from "../../assets/images/success-icon.png";

function ProductCard() {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="px-[10px] py-2 w-full h-fit bg-gray-400 rounded-[10px] flex flex-col gap-[6px] group border border-gray-200">
      <div
        onClick={() => navigate("/detail/1")}
        className="relative w-full h-[128px] rounded-[10px] cursor-pointer"
      >
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/07/deadpool-2016-poster.jpg"
          alt=""
        />
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[90%] h-[90%] rounded-[10px] flex justify-between">
          <div className="flex">
            <span className="py-[3px] px-[6.5px] h-fit bg-red-100 text-white rounded-[4px] text-[12px]">
              Endirimli
            </span>
          </div>
          <div>
            <Tooltip
              title={
                isFavorited ? "Bəyənmişlərdən çıxart" : "Bəyənmişlərə əlavə et"
              }
            >
              <Button
                onClick={(e) => {
                  setIsFavorited(!isFavorited);
                  e.stopPropagation();
                }}
                className="p-0 border-none h-fit group-1"
                type="submit"
              >
                {isFavorited ? (
                  <FaveoriteIconFill />
                ) : (
                  <FavoriteIcon specialClass="group-1-hover:fill-red-500" />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <p className="text-[14px]">[Estee Lauder] Advan</p>
        <span className="text-[12px] text-skyBlue-500">Stokda yoxdur</span>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-red-100 font-semibold">
            ₼ <span>35.99</span>
          </p>
          <p className="text-[10px]">
            ₼ <span className="line-through">35.99 </span>
          </p>
        </div>
        <div className="flex items-center gap-[3px]">
          <StarIcon width={13} />
          <p className="text-[12px] text-gray-300">573</p>
        </div>
      </div>
      <Button
        className="bg-skyBlue-500 flex items-center text-white duration-200 h-0 p-0 border-none overflow-hidden desktop:group-hover:h-9 desktop:group-hover:p-[10px]"
        type="submit"
        onClick={() =>
          toast((t) => (
            <OrderToast
              icon={successIcon}
              message={"Uğurla Səbətə əlavə olundu!"}
              t={t}
            />
          ))
        }
      >
        <AddToCartIcon />
        Səbətə at
      </Button>
    </div>
  );
}

export default ProductCard;
