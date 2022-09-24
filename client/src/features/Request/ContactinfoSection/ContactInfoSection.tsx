import React, {useEffect, useState, SyntheticEvent} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/hook'
import Progressbar from '../Progrssbar/Progressbar'
import { selectCheckStage, selectRequset, setCheckStage } from '../RequestSlice'
import { fillRequeset } from '../RequestSlice'
import { REQUEST_STATE } from "../RequestSlice"


const ContactInfoSection = () => {
    const dispatch = useAppDispatch();
    const request = useAppSelector(selectRequset);
    const checkStage = useAppSelector(selectCheckStage);
    const navigate = useNavigate()

    useEffect(()=>{
        if(checkStage[0] === false){
            navigate('/request/projectInfoSection');
        }
    }, [navigate, checkStage])

    

    const [projectInfo, setProjectInfo] = useState<REQUEST_STATE>(new REQUEST_STATE())
    const [ nextClassName, setNextClassName ] = useState('requestButDisable');

    

    useEffect(()=>{
        setProjectInfo(request)
    }, [request])

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
        for(let i = 0; i < inputs.length - 1; i++){
            
            if(inputs[i].value === ""){
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
        navigate('/request/projectInfoSection')
    }
    const goNext = () => {
        storeRequest();
        dispatch(setCheckStage(1));
        const { status, node } = checkInvalid();
        if(status){
            navigate('/request/otherInfoSection')
        }else{
            node?.focus();
        }
    }
    return (
        <div id="#top">
            <Progressbar/>
            <div className='requestCon'>
                <div className='requestInfo'>
                    <label>Owner Telegram Link *</label>
                    <input type="text" name="owner_telegram_link" defaultValue={projectInfo.owner_telegram_link} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Project Telegram Link *</label>
                    <input type="text" name="project_telegram_link" defaultValue={projectInfo.project_telegram_link} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Project Twitter</label>
                    <input type="text" name="project_twitter" defaultValue={projectInfo.project_twitter} onChange={onProjectInfoChange}></input>
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

export default ContactInfoSection