import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from "redux";

// Importing reducers
import state from '@features/stateSlice'
import user from '@features/userSlice'
const persistConfig = {
  key: 'root',
  storage,
  user
}

const rootReducer = combineReducers({
  user,
  state
})

const persisted = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persisted,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
