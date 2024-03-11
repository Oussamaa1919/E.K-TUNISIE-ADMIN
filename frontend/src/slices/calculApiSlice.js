import { apiSlice } from "./apiSlice";
import { CALCUL_URL } from "../constants";

export const calculApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    
    getCalcul: builder.query({
      query: () => ({
        url: CALCUL_URL,
      }),
      providesTags: ['Calcul'],
    }),
    
    updateCalcul: builder.mutation({
      query: (data) => ({
        url: `${CALCUL_URL}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Calcul'],
    }),
    



  }),

});
export const {
useGetCalculQuery,
useUpdateCalculMutation
} = calculApiSlice