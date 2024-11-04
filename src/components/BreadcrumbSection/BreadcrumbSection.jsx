import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

function BreadcrumbSection() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
    },
    ...pathnames.map((value, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length - 1;
      return {
        title: isLast ? (
          value.charAt(0).toUpperCase() + value.slice(1)
        ) : (
          <Link to={routeTo}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        ),
      };
    }),
  ];

  return (
    <Breadcrumb
      className="px-5 desktop:px-10 pt-3 desktop:pt-[50px]"
      separator=">"
      items={breadcrumbItems}
    />
  );
}

export default BreadcrumbSection;
