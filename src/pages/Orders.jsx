import React from "react";
import OrderTableRow from "../components/OrderTableRow";
import { recentOrders } from "../seed/seed";

const Orders = () => {
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
            {recentOrders.map((order) => (
              <OrderTableRow order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
