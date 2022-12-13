import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  auth: "",
  msg: "",
  username: "",
  token: "",
  loading: false,
  error: "",
};
export const signInUser = createAsyncThunk("signinuser", async (body) => {
  console.log("body", body);
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const signUpUser = createAsyncThunk("signupuser", async (body) => {
  console.log("body", body);
  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
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
      state.username = localStorage.getItem("user");
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
      window.location.reload();
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload: { error, msg } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
      }
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = true;
    },

    [signInUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (
      state,
      { payload: { error, authentication, token, username } }
    ) => {
      if (error) {
        state.error = error;
        state.loading = true;
      } else {
        state.loading = false;

        state.auth = authentication;
        state.token = token;
        state.username = username;
        localStorage.setItem("auth", authentication);
        localStorage.setItem("token", token);
        localStorage.setItem("user", username);
        window.location.reload();
      }
    },
    [signInUser.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});
export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
