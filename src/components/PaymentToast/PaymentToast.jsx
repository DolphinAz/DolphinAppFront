import React from "react";

function PaymentToast({ isOrderPlaced, setIsOrderPlaced }) {
  return (
    <div
      onClick={() => setIsOrderPlaced(false)}
      className={`px-5 desktop:px-0 fixed top-0 left-0 bg-modal shadow-2xl w-full h-full z-10 flex justify-center items-center duration-300 ${
        isOrderPlaced ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`px-5 desktop:px-10 py-10 desktop:py-28 w-fit text-xs desktop:text-3xl font-semibold uppercase bg-gray-1050 rounded-[30px] overflow-hidden duration-300 ${
          isOrderPlaced ? "translate-x-0" : "translate-x-full"
        }`}
      >
        Order placed successfully 🙌
      </div>
    </div>
  );
}

export default PaymentToast;
