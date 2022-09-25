import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '../app/hook'
import './css/Message.css'
import { removeMsg } from './MessageSlice'


interface MESSAGE{
    data: string,
    class: string
}

const Message = (props:MESSAGE) => {
    const dispatch = useAppDispatch();
    const [ msg, setMsg ] = useState('');
    const [ className, setClassName ] = useState('');


    
    useEffect(()=>{
        setMsg(props.data)
        setClassName(props.class)
    }, [props])


    const DeleteMsg = (e:SyntheticEvent) => {
        const target = e.target as HTMLDivElement;
        dispatch(removeMsg((target.dataset.msg ? target.dataset.msg : '')))
    }

  return (
    <div className={className} data-msg={msg} onAnimationEnd={DeleteMsg}>{msg}</div>
  )
}

export default Message