import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  similarItems: [],
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
export const productDetailFetch = createAsyncThunk(
  "productdetailFetch",
  async (body) => {
    const res = await fetch(
      `http://localhost:5000/api/products/detail/${body}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  }
);
export const searchProduct = createAsyncThunk("searchProduct", async (body) => {
  const res = await fetch(
    `http://localhost:5000/api/products/search/keywords?keywords=${body}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
});
export const searchProductByGenre = createAsyncThunk(
  "searchProductByGenre",
  async (body) => {
    const res = await fetch(
      `http://localhost:5000/api/products/search/genre?genre=${body}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [productsFetch.fulfilled]: (state, { payload: { results, checked } }) => {
      state.checked = checked;
      state.loading = false;
      state.items = results;
    },
    [productsFetch.rejected]: (state, { payload: { message, checked } }) => {
      state.loading = true;
      // state.message = message;
      state.checked = checked;
    },

    [productDetailFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [productDetailFetch.fulfilled]: (
      state,
      { payload: { results, checked } }
    ) => {
      state.items = results;
      state.checked = checked;
      state.loading = false;
    },
    [productDetailFetch.rejected]: (
      state,
      { payload: { message, checked } }
    ) => {
      state.loading = true;
      state.message = message;
      state.checked = checked;
    },

    [searchProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProduct.fulfilled]: (state, { payload }) => {
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
    [searchProductByGenre.pending]: (state, action) => {
      state.loading = true;
    },
    [searchProductByGenre.fulfilled]: (state, { payload }) => {
      state.similarItems = payload.results;
      state.checked = payload.checked;
      state.loading = false;
    },
    [searchProductByGenre.rejected]: (state, { payload }) => {
      state.loading = true;
      state.checked = payload.checked;
      state.message = payload.message;
    },
  },
});

export default productsSlice.reducer;
