import { apiSlice } from "./apiSlice";
import { CATEGORIE_URL } from "../constants";

export const categorieApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addCategorie :builder.mutation({
      query:(data) =>({
        url:`${CATEGORIE_URL}/add`,
        method:'POST',
        body: data
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIE_URL,
      }),
      providesTags: ['Categorie'],
    }),
    deleteCategorie: builder.mutation({
      query: (catId) => ({
        url: `${CATEGORIE_URL}/${catId}`,
        method: 'DELETE',
      }),
    }),
    updateCategorie: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIE_URL}/${data.catId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Categorie'],
    }),
    getCategorieDetails: builder.query({
      query: (catId) => ({
        url: `${CATEGORIE_URL}/${catId}`,
      }),
    }),



  }),

});
export const {
 useAddCategorieMutation,
 useDeleteCategorieMutation,
 useGetCategorieDetailsQuery,
 useGetCategoriesQuery,
 useUpdateCategorieMutation
} = categorieApiSlice