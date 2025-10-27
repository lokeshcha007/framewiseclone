import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import managerSlice from './slices/managerSlice';
import adminSlice from './slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    manager: managerSlice,
    admin: adminSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
