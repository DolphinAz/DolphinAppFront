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
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="text-center px-3">
                    {column.render(book, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination
        className="ml-auto"
        showSizeChanger
        defaultCurrent={3}
        total={data.length}
      /> */}
    </div>
  );
}

export default AdminTable;
