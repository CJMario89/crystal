import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import type { RootState } from "../../app/store";
import axios from "axios";


export class REQUEST_STATE{
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
}

interface INITIAL_STATE {
    request_stage: boolean[], //sections complete or not
    request: REQUEST_STATE,
    post_status: 'successed' | 'idle' | 'failed' | 'pending'
};

const initialState : INITIAL_STATE = {
    request_stage: [false, false, false],
    request: new REQUEST_STATE(),
    post_status: 'idle'
}

export const postRequested = createAsyncThunk('request/postRequest', (data:REQUEST_STATE)=>{
    return axios.post('/api/requested', data, {
        headers:{
            "content-type": "application/json"
        }
    }).then(({data}) => {
        return data
    })
});
    
export const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers:{
        // Use the PayloadAction type to declare the contents of `action.payload`
        fillRequest: {
            reducer(state, action:PayloadAction<REQUEST_STATE>){
                state.request = action.payload
            },
            prepare(projectInfo:REQUEST_STATE){
                return {
                    payload:{
                        ...projectInfo,
                        created_at: format(Date.now(), "yyyy-MM-dd hh':'mm':'ss")
                    },
                }
            }
        },
        setCheckStage: (state, action: PayloadAction<number>)=>{
            state.request_stage[action.payload] = true;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(postRequested.fulfilled, (state)=>{
            state.post_status = 'successed'
        })
        .addCase(postRequested.rejected, (state)=>{
            state.post_status = 'failed'
        })
        .addCase(postRequested.pending, (state)=>{
            state.post_status = 'pending'
        })
    },
});

export const selectRequset = (state: RootState) => state.request.request
export const selectPostStatus = (state: RootState) => state.request.post_status
export const selectCheckStage = (state: RootState) => state.request.request_stage;//requested 3 section(stage) in which, if it's wrong then redirect


export const fillRequeset = requestSlice.actions.fillRequest;
export const setCheckStage = requestSlice.actions.setCheckStage;

export default requestSlice.reducer
