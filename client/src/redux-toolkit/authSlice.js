import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
  user: "",
  token: "",
  loading: false,
  error: "",
};
export const signInUser = createAsyncThunk(
  "signinuser", 
  async (body) => {  
   
    const res = await fetch(
      "http://localhost:5000/api/login", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      // console.log(res)
    return await res.json();
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    // [signUpUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [signUpUser.fullfilled]: (state, { payload: { error, msg } }) => {
    //   state.loading = false;
    //   if (error) {
    //     state.error = error;
    //   }
    //   else{
    //     state.msg = msg;
    //   }
    // },
    // [signUpUser.rejected]: (state, action) => {
    //   state.loading = true;
    // },

    [signInUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (
      state,
      { payload: { error, msg, token, user } }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
        state.token = token;
        state.user = user;
        localStorage.setItem("msg", 5);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    [signInUser.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});
export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
