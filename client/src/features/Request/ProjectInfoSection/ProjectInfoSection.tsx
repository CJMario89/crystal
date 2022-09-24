import React, {useEffect, useState, SyntheticEvent} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/hook'
import Progressbar from '../Progrssbar/Progressbar'
import { setCheckStage, selectRequset } from '../RequestSlice'
import { fillRequeset } from '../RequestSlice'
import { REQUEST_STATE } from "../RequestSlice"

const ProjectInfoSection = () => {
    const dispatch = useAppDispatch();
    const request = useAppSelector(selectRequset);
    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState<REQUEST_STATE>(new REQUEST_STATE())
    const [ nextClassName, setNextClassName ] = useState("requestButDisable");

    useEffect(()=>{
        setProjectInfo(request)
    }, [request, dispatch])

    useEffect(()=>{
        if(checkInvalid().status){
            setNextClassName('requestBut');
        }else{
            setNextClassName('requestButDisable');
        }
    }, [projectInfo])

    const onProjectInfoChange = async(e:SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        await setProjectInfo(projectInfo => ({...projectInfo, [target.name]:target.value}))
    }



    const checkInvalid = () => {
        const inputs = document.querySelectorAll("input");
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].type === 'number'){
                if(!Number.isInteger(Number(inputs[i].value)) || Number(inputs[i].value) === 0){
                    // alert("Chain ID must be positive integer!")
                    return {"status": false, "node":inputs[i]};
                }
            }
            if(inputs[i].value === ''){
                // alert(`${inputs[i].name} must be filled`);
                return {"status": false, "node":inputs[i]};
            }
        }
        return {"status": true, "node":null};
    }



    const storeRequest = () => {
        dispatch(fillRequeset(projectInfo))
    }

    const goBack = () => {
        storeRequest();
        navigate('/request')
    }
    const goNext = () => {
        storeRequest();
        const {status, node} = checkInvalid();
        if(status){
            dispatch(setCheckStage(0));
            navigate('/request/contactInfoSection')
        }else{
            node?.focus();
        }
    }


    return (
        <div id="#top">
            <Progressbar/>
            <div className='requestCon'>
                <div className='requestInfo'>
                    <label>Project Name *</label>
                    <input type="text" name="name" defaultValue={request.name} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Website URL *</label>
                    <input type="text" name="website_URL" defaultValue={projectInfo.website_URL} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Chain ID *</label>
                    <input type="number" name="chain_id" defaultValue={projectInfo.chain_id} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Verified Contract Address *</label>
                    <input type="text" name="verified_contract_address" defaultValue={projectInfo.verified_contract_address} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Deposit fees *</label>
                    <input type="text" name="deposit_fees" defaultValue={projectInfo.deposit_fees} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Withdraw fees *</label>
                    <input type="text" name="withdrawal_fees" defaultValue={projectInfo.withdrawal_fees} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Daily ROI *</label>
                    <input type="text" name="daily_ROI" defaultValue={projectInfo.daily_ROI} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Launch time (GMT) *</label>{/*2022-09-23T04:00*/}
                    <input type="datetime-local" name="launch_time" defaultValue={projectInfo.launch_time} onChange={onProjectInfoChange}></input>
                </div>
                <div className="requestButControl">
                    <button className='requestBut' onClick={goBack}>
                        Back
                    </button>
                    <button className={nextClassName} onClick={goNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfoSection