import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    getUser: (state) => {
      return state.user;
    },
  },
})

// Action creators are generated for each case reducer function
export const { removeUser, setUser, getUser } = authSlice.actions

export default authSlice.reducer