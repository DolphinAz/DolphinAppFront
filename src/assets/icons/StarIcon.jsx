import React from "react";

function StarIcon({ width, height, specialClass }) {
  return (
    <svg
      className={specialClass}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13 11"
      fill="none"
    >
      <path
        d="M6.3313 0L7.79064 4.1459H12.5132L8.69256 6.7082L10.1519 10.8541L6.3313 8.2918L2.51069 10.8541L3.97004 6.7082L0.149432 4.1459H4.87196L6.3313 0Z"
        fill="#FFB800"
      />
    </svg>
  );
}

export default StarIcon;
