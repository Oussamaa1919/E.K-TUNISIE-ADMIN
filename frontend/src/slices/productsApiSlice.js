import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addProdcut :builder.mutation({
      query:(data) =>({
        url:`${PRODUCT_URL}/add`,
        method:'POST',
        body: data
      }),
    }),
    uploadProdcutList :builder.mutation({
      query:(data) =>({
        url:`${PRODUCT_URL}`,
        method:'POST',
        body: data
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ['prodcut'],
    }),
    deleteProdcut: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['prodcut'],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
    }),



  }),

});
export const {
  useAddProdcutMutation,
  useDeleteProdcutMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProdcutListMutation
} = productApiSlice