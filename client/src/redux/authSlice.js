import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import history from "../history.js";

const initialUser = localStorage.getItem('/auth')
? JSON.parse(localStorage.getItem('/auth'))
: null;

const initialState = {
  isLoading: false,
  currentUser: initialUser,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const register = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      'http://localhost:4000/auth/register',
      user,
      config
    );

    if (response.data) {
      console.log(response.data);
      
      dispatch(registerSuccess(response.data));
      history.push('/signin');
      window.location.reload();
    } else {
      dispatch(registerFailure('Registration failed without a specific error'));
    }
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
  }
};

export const signin = (user) => async(dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/auth/signin',
      user
    );
    
    if(response) {
      localStorage.setItem('/auth', JSON.stringify(response.data));
      dispatch(loginSuccess(response.data))
      history.push('/dashboard');
      window.location.reload();
    }else{
      dispatch(loginFailure());
    }
  } catch (error) {
    dispatch(loginFailure())
  }
}
