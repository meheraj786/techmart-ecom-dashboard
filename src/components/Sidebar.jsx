import { List, Menu, Settings, ShoppingBag, Tag, Users } from "lucide-react";
import React, { useState } from "react";
import Logo from "../layouts/Logo";
import { Link, NavLink } from "react-router";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <ShoppingBag size={20} />, url: "/" },
    { id: "products", name: "All Products", icon: <List size={20} />, url: "/products" },
    { id: "orders", name: "Order List", icon: <ShoppingBag size={20} />, url: "/orders" },
    { id: "categories", name: "Categories", icon: <Tag size={20} />, url: "/categories" },
    // { id: "customers", name: "Customers", icon: <Users size={20} />, url: "/customers" },
    { id: "settings", name: "Settings", icon: <Settings size={20} />, url: "/settings" },
  ];
  return (
    <>
          <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-white p-2 rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    <aside
      className={`
        left-0 top-0 min-h-screen w-64 bg-gray-900 text-white z-40 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="p-6">
        <Logo className="text-white" />
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            className={({isActive})=>(isActive ?  "flex items-center px-6 py-3 cursor-pointer transition-colors hover:bg-gray-800 bg-primary text-white" : "flex items-center px-6 py-3 cursor-pointer transition-colors text-gray-300 hover:bg-gray-800")}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;
