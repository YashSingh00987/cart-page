import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice"
import cartReducer from "./cartSlice"
import tableReducer from "./tableSlice"


const appStore = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    table: tableReducer
  },
});
export type RootState = ReturnType<typeof appStore.getState>;

export default appStore;