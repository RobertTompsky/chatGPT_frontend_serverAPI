import { api } from "@/shared/api";
import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import { persistedReducer } from "./config";

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    'chats/sendMessage/fulfilled'
                ],
            }
        }).concat(api.middleware)
})

export const persistor = persistStore(store)