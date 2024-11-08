import React, { useEffect, useState } from "react";
import successIcon from "../../assets/images/success-icon.png";
import { Flex } from "antd";

function OrderToast({ t }) {
  const [toastWidth, setToastWidth] = useState(0);
  useEffect(() => {
    if (t?.visible) {
      setToastWidth(100);
    } else {
      setToastWidth(0);
    }
  }, []);

  return (
    <Flex align="center" gap={14}>
      <img src={successIcon} alt="Succes Icon" />
      <p className="font-medium">Uğurla Səbətə əlavə olundu!</p>
      <div
        style={{
          width: `${toastWidth}%`,
          transition: "width 2s ease-in-out",
          position: "absolute",
          bottom: 0,
          left: 0,
          borderWidth: 3,
          borderStyle: "solid",
          borderColor: "#ffab00",
          height: 4,
        }}
      ></div>
    </Flex>
  );
}

export default OrderToast;
