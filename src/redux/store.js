// store.js
import { configureStore } from '@reduxjs/toolkit';
import removedStarsReducer from './removedStarsSlice';

export default configureStore({
  reducer: {
    removedStars: removedStarsReducer,
  },
});
