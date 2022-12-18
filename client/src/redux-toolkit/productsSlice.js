import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  count: 1,
  status: null,
  message: "",
  loading: false,
  error: "",
  checked: false,
};

export const productsFetch = createAsyncThunk("productsFetch", async (body) => {
  const res = await fetch("http://localhost:5000/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
});
export const searchProduct = createAsyncThunk("searchProduct", async (body) => {
  const res = await fetch(
    "http://localhost:5000/api/products/search/keywords",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
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

    [searchProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProduct.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.items = payload.results;
      state.checked = payload.checked;
      state.loading = false;
      if (payload.message) {
        state.message = payload.message;
      }
    },
    [searchProduct.rejected]: (state, { payload }) => {
      state.loading = true;
      state.checked = payload.checked;
      state.message = payload.message;
    },
  },
});

export default productsSlice.reducer;
