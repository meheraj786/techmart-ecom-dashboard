import React from "react";

const TableRow = ({ order }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">{order.product}</td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">{order.id}</td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.date}
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">{order.customer}</td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            order.status === "Delivered"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.status}
        </span>
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap font-semibold">
        {order.amount}
      </td>
    </tr>
  );
};

export default TableRow;
