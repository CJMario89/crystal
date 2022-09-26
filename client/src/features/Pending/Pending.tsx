import './Pending.css'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../app/hook'
import PendingContainer from './PendingContainer';
import { fetchPending, getPendingStatus, PENDING_STATE, selectAllPending } from './PendingSlice';
import { alertMsg } from '../../components/MessageSlice';




const Pending = () => {
    const dispatch = useAppDispatch();
    const pendingStatus = useAppSelector(getPendingStatus);
    const pending = useAppSelector(selectAllPending);
    const [ pendingCon, setPendingCon ] = useState<PENDING_STATE[]>();

    useEffect(()=>{
        if(pendingStatus === 'idle'){
            dispatch(fetchPending())
        }else if(pendingStatus === 'successed'){
            setPendingCon(pending);
        }else if(pendingStatus === 'refetch'){
            dispatch(fetchPending())
            dispatch(alertMsg("Request successed"));
        }
    }, [pendingStatus, dispatch, pending])

    return (
        <>
            <div className='pendingDes'>
                These Projects has submited a request waiting to be audited.
            </div>
            <div className='pending'>
                <div className='pendingContainerT'>
                    <div className='pendingT name'>
                        Name
                    </div>
                    
                    <div className='pendingT website'>
                        Website
                    </div>
                    <div className='pendingT telegramC'>
                        Telegram
                    </div>
                    <div className='pendingT launchTime'>
                        Launch Time
                    </div>
                    <div className='pendingT requestTime'>
                        Request time
                    </div>
                </div>
                {pendingCon?.map(pending=><PendingContainer {...pending} key={uuidv4()}/>)}
            </div>
        </>
        
    )
}

export default Pending