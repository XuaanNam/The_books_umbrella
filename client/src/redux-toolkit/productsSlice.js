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
  console.log(res);
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
    },
    [productsFetch.rejected]: (state, { payload }) => {
      state.loading = payload.loading;
      state.message = payload.message;
      state.checked = payload.checked;
    },
  },
});

export default productsSlice.reducer;
