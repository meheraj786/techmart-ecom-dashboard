import { Plus, Pencil, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} from "../services/categoryApi";

const Category = () => {
  const { data: response, isLoading, isError, error } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [createSubcategory, { isLoading: isCreatingSubcat }] =
    useCreateSubcategoryMutation();
  const [updateSubcategory, { isLoading: isUpdatingSubcat }] =
    useUpdateSubcategoryMutation();
  const [deleteSubcategory, { isLoading: isDeletingSubcat }] =
    useDeleteSubcategoryMutation();

  const categories = response?.data || [];

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [subcategoryForm, setSubcategoryForm] = useState({ name: "" });

  const handleAddCategory = async () => {
    if (categoryForm.name.trim()) {
      try {
        await createCategory(categoryForm).unwrap();
        setCategoryForm({ name: "", description: "" });
        setShowAddCategory(false);
        toast.success("Category created successfully!");
      } catch (error) {
        console.error("Failed to create category:", error);
        toast.error(error?.data?.message || "Failed to create category");
      }
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || "",
    });
  };

  const handleUpdateCategory = async () => {
    if (categoryForm.name.trim() && editingCategory) {
      try {
        await updateCategory({
          id: editingCategory._id,
          body: categoryForm,
        }).unwrap();
        setCategoryForm({ name: "", description: "" });
        setEditingCategory(null);
        toast.success("Category updated successfully!");
      } catch (error) {
        console.error("Failed to update category:", error);
        toast.error(error?.data?.message || "Failed to update category");
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId).unwrap();
        toast.success("Category deleted successfully!");
      } catch (error) {
        console.error("Failed to delete category:", error);
        toast.error(error?.data?.message || "Failed to delete category");
      }
    }
  };

  const handleAddSubcategory = async (categoryId) => {
    if (subcategoryForm.name.trim()) {
      try {
        await createSubcategory({
          name: subcategoryForm.name,
          category: categoryId,
        }).unwrap();
        setSubcategoryForm({ name: "" });
        setSelectedCategoryId(null);
        toast.success("Subcategory created successfully!");
      } catch (error) {
        console.error("Failed to create subcategory:", error);
        toast.error(error?.data?.message || "Failed to create subcategory");
      }
    }
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory);
    setSubcategoryForm({ name: subcategory.name });
  };

  const handleUpdateSubcategory = async () => {
    if (subcategoryForm.name.trim() && editingSubcategory) {
      try {
        await updateSubcategory({
          id: editingSubcategory._id,
          body: { name: subcategoryForm.name },
        }).unwrap();
        setSubcategoryForm({ name: "" });
        setEditingSubcategory(null);
        toast.success("Subcategory updated successfully!");
      } catch (error) {
        console.error("Failed to update subcategory:", error);
        toast.error(error?.data?.message || "Failed to update subcategory");
      }
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await deleteSubcategory(subcategoryId).unwrap();
        toast.success("Subcategory deleted successfully!");
      } catch (error) {
        console.error("Failed to delete subcategory:", error);
        toast.error(error?.data?.message || "Failed to delete subcategory");
      }
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
          Error loading categories: {error?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Toaster position="top-right" />
      <div className="p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
        <h4 className="text-lg lg:text-xl font-bold text-gray-900">
          Categories
        </h4>
        <button
          onClick={() => setShowAddCategory(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isCreating}
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Category</span>
        </button>
      </div>

      {(showAddCategory || editingCategory) && (
        <div className="p-4 lg:p-6 border-b border-gray-200 bg-orange-50">
          <h5 className="font-semibold text-gray-900 mb-3">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h5>
          <input
            type="text"
            value={categoryForm.name}
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, name: e.target.value })
            }
            placeholder="Category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 outline-none focus:ring-2 focus:ring-primary"
            disabled={isCreating || isUpdating}
          />
          <textarea
            value={categoryForm.description}
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, description: e.target.value })
            }
            placeholder="Category description"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 outline-none focus:ring-2 focus:ring-primary"
            disabled={isCreating || isUpdating}
          />
          <div className="flex gap-2">
            <button
              onClick={
                editingCategory ? handleUpdateCategory : handleAddCategory
              }
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isCreating || isUpdating || !categoryForm.name.trim()}
            >
              {isCreating || isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {editingCategory ? "Updating..." : "Creating..."}
                </>
              ) : editingCategory ? (
                "Update"
              ) : (
                "Save"
              )}
            </button>
            <button
              onClick={() => {
                setShowAddCategory(false);
                setEditingCategory(null);
                setCategoryForm({ name: "", description: "" });
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              disabled={isCreating || isUpdating}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="p-4 lg:p-6">
        {categories.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No categories found. Add your first category!
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="mb-6 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {category.name}
                  </h4>
                  {category.description && (
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="text-blue-500 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50 transition-colors"
                    title="Edit Category"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors"
                    disabled={isDeleting}
                    title="Delete Category"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedCategoryId(category._id)}
                    className="text-primary hover:text-orange-600 text-sm font-semibold whitespace-nowrap"
                  >
                    + Add Subcategory
                  </button>
                </div>
              </div>

              {(selectedCategoryId === category._id ||
                editingSubcategory?.category === category._id) && (
                <div className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <h6 className="font-semibold text-gray-700 text-sm mb-2">
                    {editingSubcategory
                      ? "Edit Subcategory"
                      : "Add New Subcategory"}
                  </h6>
                  <input
                    type="text"
                    value={subcategoryForm.name}
                    onChange={(e) =>
                      setSubcategoryForm({ name: e.target.value })
                    }
                    placeholder="Subcategory name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 outline-none focus:ring-2 focus:ring-primary"
                    disabled={isCreatingSubcat || isUpdatingSubcat}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={
                        editingSubcategory
                          ? handleUpdateSubcategory
                          : () => handleAddSubcategory(category._id)
                      }
                      className="bg-primary text-white px-3 py-1.5 rounded text-sm hover:bg-orange-600 disabled:opacity-50 flex items-center gap-1"
                      disabled={
                        isCreatingSubcat ||
                        isUpdatingSubcat ||
                        !subcategoryForm.name.trim()
                      }
                    >
                      {isCreatingSubcat || isUpdatingSubcat ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                          {editingSubcategory ? "Updating..." : "Creating..."}
                        </>
                      ) : editingSubcategory ? (
                        "Update"
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategoryId(null);
                        setEditingSubcategory(null);
                        setSubcategoryForm({ name: "" });
                      }}
                      className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-400 disabled:opacity-50"
                      disabled={isCreatingSubcat || isUpdatingSubcat}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {category.subcategory && category.subcategory.length > 0 ? (
                  category.subcategory.map((sub) => (
                    <div
                      key={sub._id}
                      className="bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2 group"
                    >
                      <span>{sub.name}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            handleEditSubcategory({
                              ...sub,
                              category: category._id,
                            });
                          }}
                          className="text-blue-500 hover:text-blue-700 p-0.5"
                          title="Edit"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteSubcategory(sub._id)}
                          className="text-red-500 hover:text-red-700 p-0.5"
                          disabled={isDeletingSubcat}
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">
                    No subcategories yet
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
