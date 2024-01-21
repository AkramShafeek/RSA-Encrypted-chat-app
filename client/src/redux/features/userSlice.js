import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null
}

const userSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    clearUsername: (state) => {
      state.username = null;
      state.token = null;
    },
    userLogin: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.username = user;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    }
  }
});

export const { clearUsername, userLogin, setUsername } = userSlice.actions;
export default userSlice.reducer;