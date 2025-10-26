import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (build) => ({
    // GET all products
    getProducts: build.query({
      query: () => "product/all-product",
      providesTags: ["Product"],
    }),
    // GET single product
    getSingleProduct: build.query({
      query: (id) => `product/single-product/${id}`,
      providesTags: ["Product"],
    }),
    // CREATE product
    createProduct: build.mutation({
      query: (body) => {
        const formData = new FormData();
        for (const key in body) {
          formData.append(key, body[key]);
        }
        return {
          url: "product/create-product",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    // UPDATE product
    updateProduct: build.mutation({
      query: ({ id, body }) => {
        const formData = new FormData();
        for (const key in body) {
          formData.append(key, body[key]);
        }
        return {
          url: `product/update-product/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),
    // DELETE product
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    // Upload image live
    uploadImage: build.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: "product/image",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadImageMutation,
} = productApi;
