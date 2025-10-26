import React, { useState } from "react";
import { products } from "../seed/seed";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const Products = () => {
  const [productList, setProductList] = useState(products);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});

  // Edit button click handler - Fixed
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      discount: product.discount || 0,
      stock: product.stock !== undefined ? product.stock : true,
      category: product.category || '',
      subcategory: product.subcategory || '',
      image: product.image || ''
    });
    setEditModal(true);
  };

  // Delete button click handler
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  // Update product
  const handleUpdate = async () => {
    try {
      // API call for update
      // const response = await fetch(`/api/products/${selectedProduct._id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Temporarily update in state
      const updatedProducts = productList.map(p => 
        p._id === selectedProduct._id ? { ...p, ...formData } : p
      );
      setProductList(updatedProducts);
      
      console.log('Updating product:', selectedProduct._id, formData);
      setEditModal(false);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      // API call for delete
      // await fetch(`/api/products/${selectedProduct._id}`, {
      //   method: 'DELETE'
      // });
      
      // Temporarily remove from state
      const updatedProducts = productList.filter(p => p._id !== selectedProduct._id);
      setProductList(updatedProducts);
      
      console.log('Deleting product:', selectedProduct._id);
      setDeleteModal(false);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
        <h4 className="text-lg lg:text-xl font-bold text-gray-900">
          All Products
        </h4>
        <Link 
          to="/add-product"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Product</span>
        </Link>
      </div>

      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {productList.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative bg-gray-50 h-36 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    -{product.discount}%
                  </span>
                )}
                
                <span className={`absolute top-2 right-2 ${product.stock ? 'bg-green-500' : 'bg-gray-400'} text-white text-[10px] font-semibold px-1.5 py-0.5 rounded`}>
                  {product.stock ? 'In Stock' : 'Out'}
                </span>
              </div>

              {/* Content */}
              <div className="p-3">
                <span className="inline-block text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded mb-2">
                  {product.category?.name || product.category}
                </span>

                <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1" title={product.name}>
                  {product.name}
                </h4>

                <p className="text-gray-500 text-xs mb-2 line-clamp-1" title={product.description}>
                  {product.description}
                </p>

                <div className="flex items-baseline gap-1.5 mb-3">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-base font-bold text-primary">
                        ৳{(product.price * (1 - product.discount / 100)).toFixed(0)}
                      </span>
                      <span className="text-[10px] text-gray-400 line-through">
                        ৳{product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-bold text-gray-900">
                      ৳{product.price}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
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
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Edit Product</h3>
              <button 
                onClick={() => setEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({...formData, discount: parseFloat(e.target.value) || 0})}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* Stock - Fixed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Status
                  </label>
                  <select
                    value={formData.stock === true ? 'true' : 'false'}
                    onChange={(e) => setFormData({...formData, stock: e.target.value === 'true'})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category?.name || formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Preview
                    </label>
                    <div className="bg-gray-50 h-48 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={formData.image} alt="Preview" className="max-h-full object-contain" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => setEditModal(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-primary text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              {/* Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Delete Product?
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-center mb-4">
                Are you sure you want to delete <span className="font-semibold">"{selectedProduct?.name}"</span>? This action cannot be undone.
              </p>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedProduct?.image} 
                    alt={selectedProduct?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{selectedProduct?.name}</p>
                    <p className="text-gray-600 text-xs mt-1">Price: ৳{selectedProduct?.price}</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;