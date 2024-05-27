import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PERSIST, PURGE, REGISTER, PAUSE } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import { user } from './slice/user'

const userPersistConfig = { key: "userAuth", storage, version: 1 }
const userPersistReducer = persistReducer(userPersistConfig, user.reducer)

export const Store = configureStore({
    reducer: {
        User: userPersistReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(Store);