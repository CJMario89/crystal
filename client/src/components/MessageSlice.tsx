import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";


interface MESSAGE_STATE{
    data: string[]
    counter: number
}

const initialState:MESSAGE_STATE = {
    data: [],
    counter: 0,
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        alertMsg: (state, action:PayloadAction<string>) => {
            state.data.push(action.payload)
            state.counter++
        },
        removeMsg: (state, action:PayloadAction<string>) =>{
            state.data = state.data.filter((msg)=>{
                return msg !== action.payload
            })
            state.counter = 0;
        }
    }
})


export const alertMsg = messageSlice.actions.alertMsg
export const removeMsg = messageSlice.actions.removeMsg

export const selectMsgCounter = (state:RootState) => state.message.counter
export const selectMessage = (state:RootState) => state.message.data

export default messageSlice.reducer

