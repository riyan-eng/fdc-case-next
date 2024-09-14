"use client"


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios/example";

const initialState = {
    list: {
        data: [],
        totalPages: 0,
        isLoading: true,
        isError: false
    },
    create: {
        isSuccess: false,
        isLoading: true,
        isError: false
    },
    delete:{
        isSuccess: false
    }
}

export const getListExample = createAsyncThunk(
    "example/list",
    async (payload) => {
        return await axios.get(`/example?page=${payload.page}&per_page=4`)
    }
)

export const postExample = createAsyncThunk(
    "example/create",
    async (payload) => {
        return await axios.post(`/example`, {
            name: payload.name,
            detail: payload.detail
        })
    }
)

export const deleteExample = createAsyncThunk(
    "example/delete",
    async (payload) => {
        return await axios.delete(`/example/${payload.id}`)
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

            const data = action.payload.data.data
            state.list.data = data
            state.list.totalPages = action.payload.data.meta.total_pages
        })
        builder.addCase(getListExample.rejected, (state) => {
            state.list.isLoading = false
            state.list.isError = true
        })
        builder.addCase(postExample.pending, (state) => {
            state.create.isLoading = true
        })
        builder.addCase(postExample.fulfilled, (state) => {
            state.create.isSuccess = true
        })
        builder.addCase(postExample.rejected, (state) => {
            state.create.isError = true
        })
        builder.addCase(deleteExample.fulfilled, (state)=>{
            state.delete.isSuccess = true
        })
    }
})

const { actions, reducer } = slice

export default reducer