import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  token: "",
  loading: false,
  error: "",
  checked: false,
  message: "",
};
export const customerFetch = createAsyncThunk("customerFetch", async () => {
  const res = await fetch("http://localhost:5000/api/admin/customer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const warehouseFetch = createAsyncThunk("warehouseFetch", async () => {
  const res = await fetch("http://localhost:5000/api/admin/warehouse", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    [customerFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [customerFetch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checked = payload.checked;
      if (payload.checked === true) {
        state.items = payload.results;
      } else {
        state.message = payload.message;
      }
    },
    [customerFetch.rejected]: (state, action) => {
      state.loading = true;
    },

    [warehouseFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [warehouseFetch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checked = payload.checked;
      if (payload.checked === true) {
        state.items = payload.results;
      } else {
        state.message = payload.message;
      }
    },
    [warehouseFetch.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});
export const {} = adminSlice.actions;
export default adminSlice.reducer;
