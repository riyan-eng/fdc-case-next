import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios/product"

const initialState = {
    list: {
        data: [],
        isLoading: true,
        isError: false
    }
}

export const getListProduct = createAsyncThunk(
    "product/list",
    async (payload) => {
        return await axios.get(`/api/v1/products?offset=${payload.offset}&limit=8`)
    }
)

const slice = createSlice({
    name: "product",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getListProduct.pending, (state) => {
            state.list.isLoading = true
        })
        builder.addCase(getListProduct.fulfilled, (state, action) => {
            state.list.isLoading = false
            // console.log(action.payload.data);

            const data = action.payload.data
            state.list.data = data
        })
        builder.addCase(getListProduct.rejected, (state) => {
            state.list.isLoading = false
            state.list.isError = true
        })
    }
})

const {actions, reducer} = slice

export default reducer