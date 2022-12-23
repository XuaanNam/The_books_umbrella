import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  orderItems: localStorage.getItem("orderItems")
    ? JSON.parse(localStorage.getItem("orderItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  count: 1,
  loading: false,
  check: false,
  message: "",
  error: "",
  paypalLink: "",
};
export const cartFetch = createAsyncThunk("cartfetch", async () => {
  const res = await fetch("http://localhost:5000/api/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const addCart = createAsyncThunk("addcart", async (body) => {
  console.log(body);
  const res = await fetch("http://localhost:5000/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const updateCart = createAsyncThunk("updatecart", async (body) => {
  const res = await fetch("http://localhost:5000/api/cart/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const removeCart = createAsyncThunk("removecart", async (body) => {
  const res = await fetch("http://localhost:5000/api/cart/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const payOrder = createAsyncThunk("payorder", async (body) => {
  const res = await fetch("http://localhost:5000/api/cart/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const paypal = createAsyncThunk("paypal", async (body) => {
  const res = await fetch("http://localhost:5000/api/payment/paypal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    mergeInfo(state, { payload }) {
      let order = [];
      order = state.orderItems.map((item) => {
        return {
          ...item,
          fullname: payload.fullname,
          emailOrder: payload.emailOrder,
          phone: payload.phone,
          address: payload.address,
        };
      });
      state.orderItems = [...order];
      localStorage.setItem("orderItems", JSON.stringify(order));
    },
    mergeMethod(state, { payload }) {
      let order = [];
      order = state.orderItems.map((item) => {
        return {
          ...item,
          deliveryMethod: payload.ship,
          paymentMethod: payload.pay,
        };
      });
      state.orderItems = [...order];
      localStorage.setItem("orderItems", JSON.stringify(order));
    },
    listOrder(state, { payload }) {
      if (state.orderItems) {
        state.orderItems = [];
      }
      console.log(payload);
      payload.map((item) => {
        if (item.isChecked) state.orderItems.push(item);
        return state;
      });
      localStorage.setItem("orderItems", JSON.stringify(state.orderItems));
    },
    increment: (state) => ({
      ...state,
      count: state.count + 1,
    }),
    decrement: (state) => ({
      ...state,
      count: state.count > 1 ? state.count - 1 : state.count,
    }),
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity:
            state.cartItems[existingIndex].cartQuantity + state.count,
        };
        toast.info(`Đã thêm ${state.count} quyển vào giỏ`, {
          position: "bottom-right",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: state.count };
        state.cartItems.push(tempProductItem);
        toast.success("Sản phẩm đã được thêm vào giỏ", {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIndex].cartQuantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Đã xóa sản phẩm", {
            position: "bottom-right",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      localStorage.clear("orderItems");
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
      console.log(total);
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-right" });
    },
  },
  extraReducers: {
    [cartFetch.pending]: (state, action) => {
      state.loading = true;
    },
    [cartFetch.fulfilled]: (state, { payload: { results, checked } }) => {
      state.cartItems = results;
      state.loading = false;
      if (results) {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    [cartFetch.rejected]: (state, { payload }) => {
      state.loading = true;
      state.message = payload.message;
    },
    //addCart
    [addCart.pending]: (state, action) => {
      state.loading = true;
    },
    [addCart.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.message = payload.message;
      state.check = payload.checked;
      if (payload.duplicate) {
        toast.info(`Đã thêm ${state.count} quyển vào giỏ`, {
          position: "bottom-right",
        });
      } else {
        toast.success("Sản phẩm đã được thêm vào giỏ", {
          position: "bottom-right",
        });
      }
    },
    [addCart.rejected]: (state, { payload }) => {
      state.loading = true;
      state.message = payload.message;
    },
    //update
    [updateCart.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCart.fulfilled]: (state, { payload }) => {},
    [updateCart.rejected]: (state, { payload }) => {
      state.loading = true;
      state.message = payload.message;
    },
    //Remove
    [removeCart.pending]: (state, action) => {
      state.loading = true;
    },
    [removeCart.fulfilled]: (state, { payload }) => {},
    [removeCart.rejected]: (state, { payload }) => {
      state.loading = true;
      state.message = payload.message;
    },
    //creatOrder
    [payOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [payOrder.fulfilled]: (state, { payload }) => {
      state.check = payload.checked;
      state.loading = false;
    },
    [payOrder.rejected]: (state, { payload }) => {
      state.loading = true;
      state.checked = payload.checked;
    },
    //paypal
    [paypal.pending]: (state, action) => {
      state.loading = true;
    },
    [paypal.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.paypalLink = payload.payment_link;
      window.open(state.paypalLink, "Payment with PayPal");
    },
    [paypal.rejected]: (state, { payload }) => {
      state.loading = true;
      state.checked = payload.checked;
    },
  },
});

export const {
  mergeInfo,
  mergeMethod,
  listOrder,
  increment,
  decrement,
  addToCart,
  increaseCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
