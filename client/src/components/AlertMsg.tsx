import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from "../app/hook"
import {  selectMessage, selectMsgCounter} from "./MessageSlice"
import Message from "./Message"
import { v4 as uuidv4 } from 'uuid';

interface MESSAGE{
    data: string,
    class: string
}

const AlertMsg = () => {
    const msgCounter = useAppSelector(selectMsgCounter);
    const dispatch = useAppDispatch();
    const messageData = useAppSelector(selectMessage);
    const [ message, setMessage ] = useState<MESSAGE[]>([{data:'', class:''}]);
    const msgCon = useRef<MESSAGE[]>();


   
    useEffect(()=>{
        if(msgCounter !== 0){
            setMessage((msgArr) => {
                for(let i = 0; i < msgArr.length; i++){//prevent from rapidly alerting
                    msgArr[i].data = ''
                    msgArr[i].class = ''
                }
                return [{data: messageData[messageData.length - 1], class: 'msgCon'}]
            });
            msgCon.current = [{data: messageData[messageData.length - 1], class: 'msgCon'}] //only display last one
        }
    }, [msgCounter, dispatch, messageData])


    useEffect(()=>{
        msgCon.current = [];
    }, [message]) // after message state is actually set


    return (
        <>
            {
                msgCon.current?.map(msg=><Message {...msg} key={uuidv4()}/>)
            }
        </>
    )
}

export default AlertMsg