import React from "react";
import { Link } from "react-router-dom";

function CategoriesContainer() {
  const categories = [
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
    {
      label: "#Uşaq",
      source:
        "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      value: "/uşaq",
    },
  ];

  return (
    <section className="px-5 desktop:px-10 py-10">
      <div className="flex p-[10px] w-full gap-6 rounded-xl bg-gray-100 overflow-x-auto scrollbar-hidden">
        {categories.map((category, index) => (
          <Link
            to={category.value}
            key={index}
            className="relative overflow-hidden min-w-[170px] w-[170px] h-12 rounded-xl"
          >
            <img
              className="w-full h-full object-cover rounded-xl blur-[2px]"
              src={category.source}
              alt={`${category.label} image`}
            />
            <div className="absolute top-0 left-0 rounded-xl bg-black z-[1] w-full h-full blur-md opacity-30"></div>
            <p className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white z-[2]">
              {category.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesContainer;
