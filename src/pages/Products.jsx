import React from "react";
import { products } from "../seed/seed";
import { Plus } from "lucide-react";

const Products = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
        <h4 className="text-lg lg:text-xl font-bold text-gray-900">
          All Products
        </h4>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2">
          <Plus size={20} />
          <span className="hidden sm:inline">Add Product</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="bg-gray-100 h-40 flex justify-center items-center rounded-lg mb-4">
              <img src={product.image} alt="" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
            <p className="text-primary font-bold text-lg">{product.price}</p>
            {/* <p className="text-gray-500 text-sm">{product.stock}</p> */}
            <span className="inline-block mt-2 text-xs bg-gray-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
