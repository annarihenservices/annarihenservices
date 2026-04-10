import adminReducer from "../redux/admin/adminSlice"
import languageReducer from "../redux/language/languageSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";


//===== Redux Persist's Code ======//
const rootReducer = combineReducers({
  admin: adminReducer,
  language: languageReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin","language"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//===== Redux Store ======//
export const store = configureStore({
  reducer: persistedReducer,

  //==== Middlware for serializable check =====//
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
