// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './slices/adminAuthSlice';

export default configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
});
