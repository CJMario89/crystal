import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { fetchPending, getPendingStatus } from './PendingSlice';

const Pending = () => {
    const dispatch = useAppDispatch();
    const pendingStatus = useAppSelector(getPendingStatus);

    useEffect(()=>{
        if(pendingStatus === 'idle'){
            dispatch(fetchPending())
        }
    }, [pendingStatus, dispatch])
  return (
    <div>Pending</div>
  )
}

export default Pending