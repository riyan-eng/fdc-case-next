import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    list: {
        data: [],
        isLoading: true,
        isError: false
    }
}

export const getListExample = createAsyncThunk(
    "example/list",
    async (payload) => {
        return await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${payload.offset}&limit=8`)
    }
)

const slice = createSlice({
    name: "example",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getListExample.pending, (state) => {
            state.list.isLoading = true
        })
        builder.addCase(getListExample.fulfilled, (state, action) => {
            state.list.isLoading = false
            // console.log(action.payload.data);

            const data = action.payload.data
            state.list.data = data
        })
        builder.addCase(getListExample.rejected, (state) => {
            state.list.isLoading = false
            state.list.isError = true
        })
    }
})

const {actions, reducer} = slice

export default reducer