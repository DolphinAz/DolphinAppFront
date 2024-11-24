import { Flex, Pagination } from "antd";
import React from "react";

function AdminTable({ data, columns }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-x-auto overflow-hidden rounded-lg table-scrollbar pb-1">
        <table className="w-full bg-gray-1050 rounded-lg border overflow-hidden">
          <thead className="border-b border-gray-900">
            <tr className="h-14">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-center text-xs font-semibold px-4 text-gray-150 text-nowrap"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white rounded-lg">
            {data.map((book, index) => (
              <tr
                key={index}
                className="h-14 border-b duration-300 last:border-0 hover:bg-gray-100 text-xs font-medium"
              >
                {Object.entries(book).map(([key, value], index) => {
                  if (key === "categories") {
                    return (
                      <td key={index} className="text-center px-3">
                        <Flex gap={5} justify="center">
                          {value && value.length > 0 ? (
                            value.map((elem, index) => (
                              <span
                                key={index}
                                className="bg-gray-350 py-1 px-2 text-xs rounded-full text-nowrap"
                              >
                                {elem.name}
                              </span>
                            ))
                          ) : (
                            <span>-</span>
                          )}
                        </Flex>
                      </td>
                    );
                  }
                  return (
                    <td key={index} className="text-center px-3">
                      {key === "bookImage" ? (
                        <span className="flex justify-center">
                          <img
                            className="w-[40px] h-[40px] object-cover rounded-lg"
                            src={value}
                            alt={book.bookName}
                          />
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}

                {columns[columns.length - 1]?.title && (
                  <td className="text-center">
                    <button className="bg-red-100 py-1 px-2 rounded-lg text-white">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        className="ml-auto"
        showSizeChanger
        defaultCurrent={3}
        total={data.length}
      />
    </div>
  );
}

export default AdminTable;
