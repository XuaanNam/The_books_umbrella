import { createSlice } from "@reduxjs/toolkit";
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
  // totalPrice: cartItems.maping((item) => {
  //   temp += item.price;
  // })
  count: 1,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    totalPrice(state, action) {
      action.payload.map((item) => {
        if (item.isChecked === true) state.orderItems.push(item);
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

      //
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
      // else if (state.cartItems[itemIndex].cartQuantity === 1) {
      //   const nextCartItems = state.cartItems.filter(
      //     (item) => item.id !== action.payload.id
      //   );

      //   state.cartItems = nextCartItems;

      //   toast.error("Đã xóa sản phẩm", {
      //     position: "bottom-right",
      //   });
      // }

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
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-right" });
    },
  },
});

export const {
  totalPrice,
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
