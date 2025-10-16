import { Plus } from "lucide-react";
import React, { useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", subcategories: ["Mobile", "Laptop", "TV"] },
    { id: 2, name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
    { id: 3, name: "Home", subcategories: ["Furniture", "Decor", "Kitchen"] },
  ]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { id: Date.now(), name: newCategory, subcategories: [] },
      ]);
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  const handleAddSubcategory = (categoryId) => {
    if (newSubcategory.trim()) {
      setCategories(
        categories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
            : cat
        )
      );
      setNewSubcategory("");
      setSelectedCategoryId(null);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
        <h4 className="text-lg lg:text-xl font-bold text-gray-900">
          Categories
        </h4>
        <button
          onClick={() => setShowAddCategory(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Category</span>
        </button>
      </div>

      {showAddCategory && (
        <div className="p-4 lg:p-6 border-b border-gray-200 bg-orange-50">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddCategory}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddCategory(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="p-4 lg:p-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="mb-6 border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-bold text-gray-900">
                {category.name}
              </h4>
              <button
                onClick={() => setSelectedCategoryId(category.id)}
                className="text-primary hover:text-orange-600 text-sm font-semibold"
              >
                + Add Subcategory
              </button>
            </div>

            {selectedCategoryId === category.id && (
              <div className="mb-3 bg-gray-50 p-3 rounded-lg">
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="Subcategory name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddSubcategory(category.id)}
                    className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setSelectedCategoryId(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
