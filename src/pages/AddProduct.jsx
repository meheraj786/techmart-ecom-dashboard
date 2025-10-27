import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useGetCategoriesQuery } from "../services/categoryApi";
import { Navigate } from "react-router";

export default function AddProduct() {
  const navigate = Navigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: false,
    category: "",
    subcategory: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetCategoriesQuery();
  const categories = data?.data || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("discount", product.discount);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("subcategory", product.subcategory);
      formData.append("image", product.image);

      const response = await axios.post(
        "http://localhost:5000/api/v1/product/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response);

      toast.success("Product added successfully!");
      navigate("/products");
      setProduct({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: false,
        category: "",
        subcategory: "",
        image: null,
      });
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white mx-auto shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                placeholder="Enter discount"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={product.subcategory}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select subcategory</option>
                {categories
                  .find((cat) => cat._id === product.category)
                  ?.subcategory?.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="stock"
              checked={product.stock}
              onChange={handleChange}
              id="stock"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="stock" className="text-gray-700 font-medium">
              In Stock
            </label>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files[0] })
              }
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-all"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
}
