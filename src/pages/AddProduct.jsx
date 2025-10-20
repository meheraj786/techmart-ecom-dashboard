import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    offerprice: "",
    mainprice: "",
    category: "electronics",
    status: "normal",
    rating: "",
    stars: "",
    isStock: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Product Added:", product);
    setProduct({
      title: "",
      description: "",
      offerprice: "",
      mainprice: "",
      category: "electronics",
      status: "normal",
      rating: "",
      stars: "",
      isStock: true,
    });
  };

  return (
      <div className="bg-white mx-auto shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          🛍️ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
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
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Offer Price
              </label>
              <input
                type="number"
                name="offerprice"
                value={product.offerprice}
                onChange={handleChange}
                placeholder="Offer price"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Main Price
              </label>
              <input
                type="number"
                name="mainprice"
                value={product.mainprice}
                onChange={handleChange}
                placeholder="Main price"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
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
              >
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="furniture">Furniture</option>
                <option value="sports">Sports</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="toys">Toys</option>
                <option value="pets">Pets</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                value={product.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="normal">Normal</option>
                <option value="flashSale">Flash Sale</option>
                <option value="bestSelling">Best Selling</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                placeholder="Rating count"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Stars
              </label>
              <input
                type="number"
                step="0.1"
                name="stars"
                value={product.stars}
                onChange={handleChange}
                placeholder="Stars (1–5)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isStock"
              checked={product.isStock}
              onChange={handleChange}
              id="isStock"
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="isStock" className="text-gray-700 font-medium">
              In Stock
            </label>
          </div>

          <button
            type="submit"
            className="w-full  bg-primary  text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-all"
          >
            Add Product
          </button>
        </form>
      </div>
  );
};

export default AddProduct;
