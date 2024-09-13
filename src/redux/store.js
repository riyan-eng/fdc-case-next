import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exampleSlice from "@/redux/slice/slice"

const reducer = combineReducers({
    example: exampleSlice
})

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

    reducer: reducer
})