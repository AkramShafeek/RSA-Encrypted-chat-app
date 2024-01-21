import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import chatReducer from "./features/chatSlice";
import uiModeReducer from "./features/uiModeSlice";
import searchedUsersSlice from "./features/searchedUsersSlice";
import notificationsSlice from "./features/notificationSlice";
import socketSlice from "./features/socketSlice";
import roomSlice from "./features/roomSlice";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducers = combineReducers({
  user: userReducer,
  chat: chatReducer,
  ui: uiModeReducer,
  searchedUsers: searchedUsersSlice,
  notifications: notificationsSlice,
  socketData: socketSlice,
  room: roomSlice
});

const persistConfig = { key: "root", storage, stateReconciler: autoMergeLevel2 };
const persistedReducer = persistReducer(persistConfig, reducers);

export const persistentStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})