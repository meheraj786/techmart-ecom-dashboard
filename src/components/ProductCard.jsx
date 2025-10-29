import React from "react";

const ProductCard = ({
  product,
  handleEdit,
  handleDeleteClick,
  isDeleting,
}) => {
  return (
    <div
      key={product._id}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="relative bg-gray-50 h-36 overflow-hidden group">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {product?.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -{product?.discount}%
          </span>
        )}

        <span
          className={`absolute top-2 right-2 ${
            product.stock ? "bg-green-500" : "bg-gray-400"
          } text-white text-[10px] font-semibold px-1.5 py-0.5 rounded`}
        >
          {product?.stock ? "In Stock" : "Out"}
        </span>
      </div>

      <div className="p-3">
        <span className="inline-block text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded mb-2">
          {product?.category?.name || product.category}
        </span>

        <h4
          className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1"
          title={product?.name}
        >
          {product?.name}
        </h4>

        <p
          className="text-gray-500 text-xs mb-2 line-clamp-1"
          title={product?.description}
        >
          {product?.description}
        </p>

        <div className="flex items-baseline gap-1.5 mb-3">
          {product?.discount > 0 ? (
            <>
              <span className="text-base font-bold text-primary">
                ৳{(product?.price * (1 - product?.discount / 100)).toFixed(0)}
              </span>
              <span className="text-[10px] text-gray-400 line-through">
                ৳{product?.price}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-900">
              ৳{product?.price}
            </span>
          )}
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => handleEdit(product)}
            className="flex-1 bg-blue-500 text-white py-1.5 rounded text-xs font-medium hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(product)}
            className="flex-1 bg-red-500 text-white py-1.5 rounded text-xs font-medium hover:bg-red-600 transition-colors"
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
