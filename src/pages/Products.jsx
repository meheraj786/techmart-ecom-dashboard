import React, { useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
} from "../services/productApi";

const Products = () => {
  const { data: response, isLoading, isError, error } = useGetProductsQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const productList = response?.data || [];

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      discount: product.discount || 0,
      stock: product.stock !== undefined ? product.stock : true,
      category: product.category?._id || product.category || '',
      subcategory: product.subcategory?._id || product.subcategory || '',
      image: product.image || ''
    });
    setImagePreview(product.image || '');
    setImageFile(null);
    setEditModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(formData.image || '');
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

const handleUpdate = async () => {
  try {
    let imageUrl = formData.image;

    if (imageFile) {
      const uploadResponse = await uploadImage(imageFile).unwrap();
      imageUrl = uploadResponse.data?.url || uploadResponse.url;
    }

    const updateData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      discount: formData.discount || 0,
      stock: formData.stock,
      category: formData.category,
      image: imageUrl
    };

    if (formData.subcategory && formData.subcategory.trim() !== '') {
      updateData.subcategory = formData.subcategory;
    }

    await updateProduct({
      id: selectedProduct._id,
      body: updateData
    }).unwrap();
    
    setEditModal(false);
    setImageFile(null);
    setImagePreview('');
    toast.success('Product updated successfully!');
  } catch (error) {
    console.error('Error updating product:', error);
    toast.error(error?.data?.message || 'Failed to update product');
  }
};

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct._id).unwrap();
      
      setDeleteModal(false);
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error?.data?.message || 'Failed to delete product');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-red-500">
          Error loading products: {error?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

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
        {productList.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No products found. Add your first product!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {productList.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="relative bg-gray-50 h-36 overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      -{product.discount}%
                    </span>
                  )}
                  
                  <span className={`absolute top-2 right-2 ${product.stock ? 'bg-green-500' : 'bg-gray-400'} text-white text-[10px] font-semibold px-1.5 py-0.5 rounded`}>
                    {product.stock ? 'In Stock' : 'Out'}
                  </span>
                </div>

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
            ))}
          </div>
        )}
      </div>

      {editModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Edit Product</h3>
              <button 
                onClick={() => {
                  setEditModal(false);
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isUpdating || isUploading}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    disabled={isUpdating || isUploading}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    disabled={isUpdating || isUploading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    disabled={isUpdating || isUploading}
                  />
                </div>

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
                    disabled={isUpdating || isUploading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Status
                  </label>
                  <select
                    value={formData.stock === true ? 'true' : 'false'}
                    onChange={(e) => setFormData({...formData, stock: e.target.value === 'true'})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    disabled={isUpdating || isUploading}
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category ID
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    disabled={isUpdating || isUploading}
                    placeholder="Category ID"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    disabled={isUpdating || isUploading}
                    placeholder="Subcategory ID"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      disabled={isUpdating || isUploading}
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {isUploading ? 'Uploading...' : 'Click to upload new image'}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </span>
                    </label>
                  </div>
                </div>

                {imagePreview && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Preview
                      {imageFile && (
                        <span className="text-xs text-green-600 ml-2">(New image selected)</span>
                      )}
                    </label>
                    <div className="relative bg-gray-50 h-48 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                      <img src={imagePreview} alt="Preview" className="max-h-full object-contain" />
                      {imageFile && (
                        <button
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                          disabled={isUpdating || isUploading}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setEditModal(false);
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={isUpdating || isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-primary text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                disabled={isUpdating || isUploading}
              >
                {(isUpdating || isUploading) ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isUploading ? 'Uploading...' : 'Updating...'}
                  </>
                ) : (
                  'Update Product'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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

              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Delete Product?
              </h3>

              <p className="text-gray-600 text-center mb-4">
                Are you sure you want to delete <span className="font-semibold">"{selectedProduct?.name}"</span>? This action cannot be undone.
              </p>

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

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
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