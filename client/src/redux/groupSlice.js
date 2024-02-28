import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentGroup: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.currentGroup = action.payload;
    }
  },
});

export const { setGroup } = groupSlice.actions;

export default groupSlice.reducer;