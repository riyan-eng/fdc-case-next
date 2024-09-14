import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios/person"

const initialState = {
    list: {
        data: [],
        totalPage:0,
        isLoading: true,
        isError: false
    }
}

export const getListPerson = createAsyncThunk(
    "person/list",
    async (payload) => {
        return await axios.get(`/api/users?page=${payload.page}`)
    }
)

const slice = createSlice({
    name: "person",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getListPerson.pending, (state) => {
            state.list.isLoading = true
        })
        builder.addCase(getListPerson.fulfilled, (state, action) => {
            state.list.isLoading = false
            // console.log(action.payload.data);

            const data = action.payload.data
            state.list.data = data.data
            state.list.totalPage = data.total_pages
        })
        builder.addCase(getListPerson.rejected, (state) => {
            state.list.isLoading = false
            state.list.isError = true
        })
    }
})

const {actions, reducer} = slice

export default reducer