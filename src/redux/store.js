import { combineReducers, configureStore } from "@reduxjs/toolkit";
import exampleSlice from "@/redux/slice/example"
import productSlice from "@/redux/slice/product"
import personSlice from "@/redux/slice/person"

const reducer = combineReducers({
    example: exampleSlice,
    product: productSlice,
    person: personSlice
})

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

    reducer: reducer
})