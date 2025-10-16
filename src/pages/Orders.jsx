import React from "react";

const Orders = () => {
  const recentOrders = [
    {
      id: "#25423",
      product: "Lorem Ipsum",
      date: "Nov 05, 2023",
      customer: "Karen",
      status: "Delivered",
      amount: "৳250.00",
    },
    {
      id: "#25424",
      product: "Lorem Ipsum",
      date: "Nov 05, 2023",
      customer: "Aminul",
      status: "Canceled",
      amount: "৳400.00",
    },
    {
      id: "#25424",
      product: "Lorem Ipsum",
      date: "Nov 05, 2023",
      customer: "Jakir",
      status: "Delivered",
      amount: "৳250.00",
    },
    {
      id: "#25423",
      product: "Lorem Ipsum",
      date: "Nov 05, 2023",
      customer: "Shahin",
      status: "Canceled",
      amount: "৸400.00",
    },
    {
      id: "#25422",
      product: "Lorem Ipsum",
      date: "Nov 05, 2023",
      customer: "Shakia",
      status: "Delivered",
      amount: "৳250.00",
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h4 className="text-lg lg:text-xl font-bold text-gray-900">
          All Orders
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentOrders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap font-semibold">
                  {order.id}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  {order.customer}
                </td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
