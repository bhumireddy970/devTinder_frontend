import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "Review",
  initialState: {
    message: "",
    data: [],
  },
  reducers: {
    addReview: (state, action) => {
      return action.payload;
    },
    removeReview: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
    },

    clearReview: [],
  },
});

export const { addReview, removeReview, clearReview } = reviewSlice.actions;
export default reviewSlice.reducer;
