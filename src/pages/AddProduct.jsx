import { useState } from "react";
import { useCreateProductMutation } from "../services/productApi";
import { useGetCategoriesQuery } from "../services/categoryApi";

const AddProduct = () => {
  const { data, isLoading: catLoading, error } = useGetCategoriesQuery();
  const categories = data?.data || []; // categories array from backend

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    subcategory: "",
    stock: true,
    image: null,
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setProduct({ ...product, [name]: files[0] });
    } else if (type === "checkbox") {
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }

    if (name === "category") {
      // Reset subcategory when category changes
      setProduct((prev) => ({ ...prev, subcategory: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!product.image) {
        return alert("Please upload an image");
      }

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("discount", product.discount || 0);
      formData.append("category", product.category);
      formData.append("subcategory", product.subcategory);
      formData.append("stock", product.stock);
      formData.append("image", product.image); // <-- this is critical

      await createProduct(formData).unwrap();
      alert("Product added successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        discount: "",
        category: "",
        subcategory: "",
        stock: true,
        image: null,
      });
    } catch (err) {
      console.error("Failed to add product:", err);
      alert(err?.data?.message || "Failed to add product");
    }
  };

  if (catLoading) return <p>Loading categories...</p>;
  if (error) return <p>Failed to load categories</p>;

  return (
    <div className="bg-white mx-auto shadow-2xl rounded-2xl w-full max-w-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        🛍️ Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
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

        {/* Description */}
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

        {/* Price & Discount */}
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

        {/* Category & Subcategory */}
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

        {/* Stock */}
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

        {/* Image Upload */}
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
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-all"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
