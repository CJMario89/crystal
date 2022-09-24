import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../Request/RequestSlice";
import type { RootState } from "../../app/store";


class PENDING_STATE{
    loading: 'idle' | 'failed' | 'successed' | 'pending';
    pending: REQUEST_STATE[];
    error: string | undefined;
}

const initialState:PENDING_STATE = {
    loading: 'idle',
    pending: [],
    error: ''
};

export const fetchPending = createAsyncThunk("pending/fetchPending", async()=>{
    const raw = await fetch("/api/getAllRequested");
    const json = await raw.json();
    return json;
});

export const pendingSlice = createSlice({
    name: "pending",
    initialState,
    reducers:{
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPending.fulfilled, (state:PENDING_STATE, action:PayloadAction<REQUEST_STATE[]>) => {
            state.pending = action.payload;
            state.loading = 'successed'
        })
        .addCase(fetchPending.pending, (state) => {
            state.loading = 'pending'
        })
        .addCase(fetchPending.rejected, (state, action) => {
            state.loading = 'failed'
            state.error = action.error.message
        })
    }
})

export const selectAllPending = (state:RootState) =>  state.pending.pending
export const getPendingStatus = (state:RootState) =>  state.pending.loading 
export const getPendingError = (state:RootState) =>  state.pending.error

export default pendingSlice.reducer