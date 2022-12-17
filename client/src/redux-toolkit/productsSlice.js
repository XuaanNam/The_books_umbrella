import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  count: 1,
  status: null,
  loading: false,
  error: "",
  checked: true,
};

export const productsFetch = createAsyncThunk("productsFetch", async () => {
  const res = await fetch("http://localhost:5000/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [productsFetch.fulfilled]: (state, { payload: { results, checked } }) => {
      state.items = results;
      state.checked = checked;
      state.loading = false;
    },
    [productsFetch.rejected]: (state, { payload: { message, checked } }) => {
      state.loading = true;
      // state.message = message;
      state.checked = checked;
    },
  },
});

export default productsSlice.reducer;
