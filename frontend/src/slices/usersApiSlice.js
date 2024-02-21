import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
        
        
      }),
     
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }), 
    }), 
    getAdmins: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'],
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-membre`,
        method: 'POST',
        body: data,
      }),
     
    }),

    deleteMember: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
       
      }),
    }),
  
    sendPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sendpassword`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  
  
  }),
});
export const {
  
  useGetAdminsQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddMemberMutation,
  useDeleteMemberMutation,
  useLogoutMutation,
  useSendPasswordMutation
} = userApiSlice;