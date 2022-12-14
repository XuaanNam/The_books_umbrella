import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import cartReducer, { getTotals } from "./cartSlice";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import productsReducer from "./productsSlice";

const reducer = combineReducers({
  user: authReducer,
  admin: adminReducer,
  counter: counterSlice,
  products: productsReducer,
  cart: cartReducer,

  // global: globalSlice,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(addressApi.middleware),
  // middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

export default store;
