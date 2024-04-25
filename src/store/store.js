import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./slices/auth";
import cartSlice from "./slices/cart";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    cart: cartSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([]),
});



export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export const selectCurrentUser = (state) => state?.auth?.user;
export const authSelector = (state) => state.auth;
export const selectToken = (state) => state.auth.keys?.access_key;

export const persistor = persistStore(store);

export default store;
