import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    // Add other reducers as needed
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check for complex state
  }),
});

export default store;

export type AppDispatch = typeof store.dispatch;