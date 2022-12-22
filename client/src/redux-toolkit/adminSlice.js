import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
export const changeStatus = createAsyncThunk("changeStatus", async (body) => {
  console.log(body);
  const res = await fetch("http://localhost:5000/api/admin/product/status", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const addProduct = createAsyncThunk("addProduct", async (body) => {
  const res = await fetch("http://localhost:5000/api/admin/product/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const orderFetch = createAsyncThunk("orderFetch", async () => {
  const res = await fetch("http://localhost:5000/api/admin/order", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const changeOrderStatus = createAsyncThunk(
  "changeOrderStatus",
  async (body) => {
    console.log(body);
    const res = await fetch("http://localhost:5000/api/admin/order/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);
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

    [changeStatus.pending]: (state, action) => {
      state.loading = true;
    },
    [changeStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checked = payload.checked;
      if (payload.message) {
        state.message = payload.message;
      }
      if (payload.checked === true) {
        toast.success(payload.message, {
          position: "bottom-right",
        });
      }
    },
    [changeStatus.rejected]: (state, action) => {
      state.loading = true;
    },
    [addProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.checked = payload.checked;
      state.message = payload.message;
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = true;
    },

    [orderFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [orderFetch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checked = payload.checked;
      if (payload.checked === true) {
        state.items = payload.results;
      } else {
        state.message = payload.message;
      }
    },
    [orderFetch.rejected]: (state, action) => {
      state.loading = true;
    },

    [changeOrderStatus.pending]: (state, action) => {
      state.loading = true;
    },
    [changeOrderStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.checked = payload.checked;
      if (payload.checked === true) {
        state.items = payload.results;
      } else {
        state.message = payload.message;
      }
    },
    [changeOrderStatus.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});
export const {} = adminSlice.actions;
export default adminSlice.reducer;
