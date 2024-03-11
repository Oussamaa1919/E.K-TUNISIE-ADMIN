import { apiSlice } from "./apiSlice";
import { POINTDEVENTE_URL } from "../constants";

export const pointdeventeApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    addPDV :builder.mutation({
      query:(data) =>({
        url:`${POINTDEVENTE_URL}/addpointdevente`,
        method:'POST',
        body: data
      }),
    }),
    getPDVs: builder.query({
      query: () => ({
        url: POINTDEVENTE_URL,
      }),
      providesTags: ['PointDeVente'],
    }),
    deletePDV: builder.mutation({
      query: (pdvId) => ({
        url: `${POINTDEVENTE_URL}/${pdvId}`,
        method: 'DELETE',
      }),
    }),
    updatePdv: builder.mutation({
      query: (data) => ({
        url: `${POINTDEVENTE_URL}/${data.pdvId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PointDeVente'],
    }),
    getPdvDetails: builder.query({
      query: (pdvId) => ({
        url: `${POINTDEVENTE_URL}/${pdvId}`,
      }),
    }),



  }),

});
export const {
  useAddPDVMutation,
  useDeletePDVMutation,
  useGetPDVsQuery,
  useUpdatePdvMutation,
  useGetPdvDetailsQuery
} = pointdeventeApiSlice