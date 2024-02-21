import { apiSlice } from './apiSlice';
import { CLIENTS_URL } from '../constants';

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getClients: builder.query({
      query: () => ({
        url: CLIENTS_URL,
      }),
      providesTags: ['Client'],
    }),
    

  }),
});
export const {
  
  useGetClientsQuery,
 
} = clientApiSlice;