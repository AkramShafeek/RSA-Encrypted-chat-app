import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  otherUser: null
}

const roomSlice = createSlice({
  name: 'roomId',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    unsetRoomId: (state, action) => {
      state.roomId = null;
    },
    setOtherUser: (state, action) => {
      state.otherUser = action.payload;
    },
    unsetOherUser: (state) => {
      state.otherUser = null;
    },
    clearRoomState: (state) => {
      state.roomId = null;
      state.otherUser = null;
    }
  }
});

export const { setRoomId, unsetRoomId, setOtherUser, unsetOherUser, clearRoomState } = roomSlice.actions;
export default roomSlice.reducer;