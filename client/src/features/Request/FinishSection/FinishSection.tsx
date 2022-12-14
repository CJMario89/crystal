import "./FinishSection.css"
import React, { useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { postRequested, selectCheckStage, selectPostStatus, selectRequset } from '../RequestSlice'
import Progressbar from "../Progrssbar/Progressbar"
import { refetch } from "../../Pending/PendingSlice"
import { alertMsg } from "../../../components/MessageSlice"

const FinishSection = () => {
    const request = useAppSelector(selectRequset)
    const postStatus = useAppSelector(selectPostStatus)
    const dispatch = useAppDispatch();
    const submitLink = useRef('/');
    const checkStage = useAppSelector(selectCheckStage);
    const navigate = useNavigate();

    useEffect(()=>{
        if(checkStage[0] === false){
            navigate('/request/projectInfoSection');
        }else if(checkStage[1] === false){
            navigate('/request/contactInfoSection');
        }else if(checkStage[2] === false){
            navigate('/request/otherInfoSection');
        }
    }, [navigate, checkStage])
    

    const goBack = () => {
        navigate('/request/otherInfoSection');
    }


    const submitRequested = ()=>{
        if(postStatus === 'idle'){
            dispatch(postRequested(request))
        }
    }

    useEffect(()=>{
        if(postStatus === 'successed'){
            dispatch(refetch());
            navigate('/pending')
        }else if(postStatus === 'pending'){
            dispatch(alertMsg("Requesting"))
            submitLink.current = '#top'
        }else if(postStatus === 'failed'){
            dispatch(alertMsg("Whoops something went wrong, please contact"))
        }
    }, [postStatus, dispatch, navigate])

    return (
        <div id="#top">
            <Progressbar/>
            <div className='requestConF'>
                <div className='requestInfoF'>
                    <div className="requestTitle">
                        <div>Project Name * : </div>
                        <div>Website URL * : </div>
                        <div>Chain ID * : </div>
                        <div>Verified Contract Address * : </div>
                        <div>Deposit fees * : </div>
                        <div>Withdraw fees * : </div>
                        <div>Daily ROI * : </div>
                        <div>Launch time (GMT) * : </div>
                        <div>Owner Telegram Link * : </div>
                        <div>Project Telegram Link * : </div>
                        <div>Project Twitter : </div>
                        <div>Past Projects : </div>
                        <div>Other Audits : </div>
                        <div>Other Comments : </div>
                    </div>
                    <div className="requestContent">
                        <div>{request.name}&ensp;</div>
                        <div>{request.website_URL}&ensp;</div>
                        <div>{request.chain_id}&ensp;</div>
                        <div>{request.verified_contract_address}&ensp;</div>
                        <div>{request.deposit_fees}&ensp;</div>
                        <div>{request.withdrawal_fees}&ensp;</div>
                        <div>{request.daily_ROI}&ensp;</div>
                        <div>{request.launch_time}&ensp;</div>
                        <div>{request.owner_telegram_link}&ensp;</div>
                        <div>{request.project_telegram_link}&ensp;</div>
                        <div>{request.project_twitter}&ensp;</div>
                        <div>{request.past_projects}&ensp;</div>
                        <div>{request.other_audits}&ensp;</div>
                        <div>{request.other_comments}&ensp;</div>
                    </div>
                </div>
                
                <div className="requestButControl">
                    <button className='requestBut' onClick={goBack}>
                        Back
                    </button>
                    <button className='requestBut' onClick={submitRequested}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishSection