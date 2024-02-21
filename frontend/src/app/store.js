import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import modalSlice from '../features/common/modalSlice'
import rightDrawerSlice from '../features/common/rightDrawerSlice'
import leadsSlice from '../features/promo/leadSlice'
import { apiSlice } from '../slices/apiSlice';
import authReducer from '../slices/authSlice'
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authReducer,
    header: headerSlice,
    modal: modalSlice,
    rightDrawer: rightDrawerSlice,
    lead: leadsSlice,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;