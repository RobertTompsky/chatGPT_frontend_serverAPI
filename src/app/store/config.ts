import { chatReducer } from "@/entities/chat/model";
import { authReducer } from "@/entities/user/model";
import { api } from "@/shared/api";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [api.reducerPath]
}

const initialReducers = {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    chats: chatReducer
};

const rootReducer = combineReducers(initialReducers)

export const persistedReducer = persistReducer(
    persistConfig, 
    rootReducer
)