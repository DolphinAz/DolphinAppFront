import React, { useState } from "react";
import Authors from "../Authors/Authors";
import Sellers from "../Sellers/Sellers";
import Publishers from "../Publishers/Publishers";

function Media() {
  const mediaNavigation = [
    {
      label: "Yazıçı",
      value: "authors",
      view: <Authors />,
    },
    {
      label: "Satıcı",
      value: "sellers",
      view: <Sellers />,
    },
    {
      label: "Nəşriyyatçı",
      value: "publishers",
      view: <Publishers />,
    },
  ];

  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="bg-white rounded-lg p-5 flex flex-col gap-10">
      <ul className="flex gap-5 text-lg">
        {mediaNavigation.map((mediaNav, i) => (
          <li
            className={`cursor-pointer text-black-100 font-semibold duration-300 before:duration-300 relative before:h-1 before:absolute before:left-0 before:-bottom-1 before:rounded-lg ${
              activeNav === i
                ? "text-skyBlue-500 before:bg-skyBlue-500 before:w-full"
                : "before:bg-transparent before:w-0"
            }`}
            onClick={() => setActiveNav(i)}
            key={i}
          >
            {mediaNav.label}
          </li>
        ))}
      </ul>
      {mediaNavigation[activeNav].view}
    </div>
  );
}

export default Media;
