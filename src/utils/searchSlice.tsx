import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
      searchText: "",
      selectedCategory:"",
      selectedSize:"",
    },
    reducers: {
      addSearchText: (state, action) => {
        state.searchText = action.payload;
      },
      addSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload;
      },
      addSelectedSize: (state, action) => {
        state.selectedSize = action.payload;
      },
      
    },
  });

export const { addSearchText, addSelectedCategory, addSelectedSize } = searchSlice.actions;

export default searchSlice.reducer;

