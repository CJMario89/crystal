import './PendingContainer.css'
import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { PENDING_STATE } from './PendingSlice'


const PendingContainer = (props:PENDING_STATE) => {
    const [ lauchTime, setLaunchTime ] = useState('');
    const [ requestTime, setRequestTime ] = useState('');

    const goWebsiteURL = () =>{
        window.open(props.website_URL, '_blank');
    }

    const goTelegram = () =>{
        window.open(props.project_telegram_link, '_blank');
    }

    const parseDate = async (dateISO: string) => {
        let month = '';
        let date = '';
        const parsed = await parseISO(dateISO);
        let d = parsed.getDate()
        if(d < 10){
            date = "0" + d;
        }else{
            date = "" + d;
        }
        let m = parsed.getMonth() + 1
        if(m < 10){
            month = "0" + m;
        }else{
            month = "" + m;
        }
        const year = parsed.getFullYear()
        return (`${year} ${month}-${date} (GMT)`)
    }

    useEffect(()=>{
        parseDate(props.launch_time).then(time => setLaunchTime(time))
        parseDate(props.created_at).then(time => setRequestTime(time))
    })


    return (
        <div className='pendingContainer'>
            <div className='pendingC name'>
                {props.name}
            </div>
            
            <div className='pendingC website' onClick={goWebsiteURL}>
                <img src='/web.svg'></img>
            </div>
            <div className='pendingC telegramC' onClick={goTelegram}>
                <img src='/telegram.svg'></img>
            </div>
            <div className='pendingC launchTime'>
                {lauchTime}
            </div>
            <div className='pendingC requestTime'>
                {requestTime}
            </div>
        </div>
    )
}

export default PendingContainer