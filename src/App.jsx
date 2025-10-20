import { ParkingCircle, Users2 } from "lucide-react";
import "./App.css";
import { CgRadioChecked } from "react-icons/cg";
import { BiMoney } from "react-icons/bi";
import StatsCard from "./components/StatsCard";
import TableRow from "./components/TableRow";
import { recentOrders } from "./seed/seed";

function App() {
  const statsCards = [
  { title: "Active Users", value: "৳26,500", icon: <Users2 /> },
  { title: "Active Orders", value: "৳165,600", icon: <ParkingCircle /> },
  { title: "Completed Orders", value: "৳165,500", icon: <CgRadioChecked /> },
  { title: "Total Sales", value: "৳265,800", icon: <BiMoney /> },
];
  return (
    <>
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statsCards.map((card) => (
          <StatsCard card={card} />
        ))}
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h4 className="text-lg lg:text-xl font-bold text-gray-900">
            Recent Orders
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
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
                <TableRow order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
