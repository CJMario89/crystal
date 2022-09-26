import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export class PENDING_STATE{
    name: string;
	website_URL: string;
	chain_id: string;
	verified_contract_address: string;
	deposit_fees: string;
	withdrawal_fees: string;
	daily_ROI: string;
	launch_time: string;
	project_telegram_link: string;
	owner_telegram_link: string;
	project_twitter?: string;
	past_projects?: string;
	other_audits?: string;
	other_comments?: string;
    created_at: string;
}

class INITIAL_STATE{
    loading: 'idle' | 'failed' | 'successed' | 'pending' | 'refetch';
    pending: PENDING_STATE[];
    error: string | undefined;
}

const initialState:INITIAL_STATE = {
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
        refetch: ((state)=>{
            state.loading = 'refetch';
        }),
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPending.fulfilled, (state:INITIAL_STATE, action:PayloadAction<PENDING_STATE[]>) => {
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

export const refetch = pendingSlice.actions.refetch

export default pendingSlice.reducer