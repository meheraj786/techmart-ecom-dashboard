import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    credentials: "include",
  }),
  tagTypes: ["Category", "Subcategory"], 
  endpoints: (build) => ({
    // ===== CATEGORY =====
    getCategories: build.query({
      query: () => "category/all-category",
      providesTags: ["Category"],
    }),
    createCategory: build.mutation({
      query: (body) => ({
        url: "category/create-category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    getSingleCategory: build.query({
      query: (id) => `category/single-category/${id}`,
      providesTags: ["Category"],
    }),
    updateCategory: build.mutation({
      query: ({ id, body }) => ({
        url: `category/update-category/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // ===== SUBCATEGORY =====
    getSubcategories: build.query({
      query: () => "sub-category/all-subcategory",
      providesTags: ["Subcategory"],
    }),
    createSubcategory: build.mutation({
      query: (body) => ({
        url: "sub-category/create-subcategory",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subcategory", "Category"],
    }),
    getSingleSubcategory: build.query({
      query: (id) => `sub-category/single-subcategory/${id}`,
      providesTags: ["Subcategory"],
    }),
    updateSubcategory: build.mutation({
      query: ({ id, body }) => ({
        url: `sub-category/update-subcategory/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Subcategory", "Category"],
    }),
    deleteSubcategory: build.mutation({
      query: (id) => ({
        url: `sub-category/delete-subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategory", "Category"],
    }),
  }),
});

export const {
  // Category hooks
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Subcategory hooks
  useGetSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useGetSingleSubcategoryQuery,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = categoryApi;
