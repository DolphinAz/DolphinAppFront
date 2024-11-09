import React, { useEffect, useState } from "react";
import successIcon from "../../assets/images/success-icon.png";
import { Flex } from "antd";

function OrderToast({ t, message, icon, progressColor }) {
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
      {icon && <img src={icon} alt="Success Icon" />}
      <p className="font-medium">{message}</p>
      <div
        style={{
          width: `${toastWidth}%`,
          transition: "width 2s ease-in-out",
          position: "absolute",
          bottom: 0,
          left: 0,
          borderWidth: 3,
          borderStyle: "solid",
          borderColor: progressColor || "#FFAB00",
        }}
      ></div>
    </Flex>
  );
}

export default OrderToast;
