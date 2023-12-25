// removedStarsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const removedStarsSlice = createSlice({
  name: 'removedStars',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
  },
});

export const { increment } = removedStarsSlice.actions;

export const selectRemovedStars = state => state.removedStars.value;

export default removedStarsSlice.reducer;