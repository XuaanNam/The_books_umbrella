import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  auth: "",
  signinmsg: "",
  signupmsg: "",
  username: "",
  token: "",
  loading: false,
  error: "",
  checked: true,
  emailChecked: true,
};
export const authentication = createAsyncThunk("authentication", async () => {
  const res = await fetch("http://localhost:5000/api/isauth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const signInUser = createAsyncThunk("signinuser", async (body) => {
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
export const getProfile = createAsyncThunk("getProfile", async () => {
  const res = await fetch("http://localhost:5000/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await res.json();
});
export const changeProfile = createAsyncThunk("changeProfile", async (body) => {
  console.log("body", body);
  const res = await fetch("http://localhost:5000/api/profile/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});
export const emailChecked = createAsyncThunk("emailChecked", async (body) => {
  console.log("body", body);
  const res = await fetch("http://localhost:5000/api/check/email", {
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
    auth: (state, action) => {},
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    [emailChecked.pending]: (state, action) => {
      state.loading = true;
    },
    [emailChecked.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.emailChecked = payload.checked;
      if (payload.checked === false) {
        state.msg = payload.message;
      }
    },
    [emailChecked.rejected]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (
      state,
      { payload: { error, message, checked } }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
        state.signupmsg = message;
      } else {
        if (checked) {
          state.signupmsg = message;
          state.checked = checked;
        }
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
      { payload: { error, authentication, token, username, checked, message } }
    ) => {
      if (error) {
        state.error = error;
        state.loading = true;
      } else {
        if (checked) {
          state.loading = false;
          state.auth = authentication;
          state.token = token;
          state.username = username;
          localStorage.setItem("auth", authentication);
          localStorage.setItem("token", token);
          localStorage.setItem("user", username);
          state.signinmsg = "";
          if (authentication !== 1) {
            window.location.reload();
          }
        } else {
          state.signinmsg = message;
        }
      }
    },
    [signInUser.rejected]: (state, action) => {
      state.loading = true;
    },

    [authentication.pending]: (state, action) => {
      state.loading = true;
    },
    [authentication.fulfilled]: (state, { payload }) => {
      state.auth = payload.authentication;
    },
    [authentication.rejected]: (state, action) => {
      state.loading = true;
    },
    [getProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      if (payload.results) state.items = { ...payload.results[0] };
      else {
        state.message = payload.message;
      }
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = true;
    },

    [changeProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [changeProfile.fulfilled]: (state, { payload }) => {
      if (payload.checked === true) {
        state.checked = payload.checked;
        toast.success("C???p nh???t th??ng tin th??nh c??ng", {
          position: "bottom-right",
        });
      } else {
        state.message = payload.message;
      }
    },
    [changeProfile.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});
export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
