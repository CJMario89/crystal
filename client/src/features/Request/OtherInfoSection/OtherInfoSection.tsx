import React, {useEffect, useState, SyntheticEvent} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../app/hook'
import Progressbar from '../Progrssbar/Progressbar'
import { selectCheckStage, selectRequset, setCheckStage } from '../RequestSlice'
import { fillRequeset } from '../RequestSlice'
import { REQUEST_STATE } from "../RequestSlice"

const OtherInfoSection = () => {
    const dispatch = useAppDispatch();
    const request = useAppSelector(selectRequset);
    const checkStage = useAppSelector(selectCheckStage);
    const navigate = useNavigate();

    useEffect(()=>{
        if(checkStage[0] === false){
            navigate('/request/projectInfoSection');
        }else if(checkStage[1] === false){
            navigate('/request/contactInfoSection');
        }
    }, [navigate, checkStage])
    

    const [projectInfo, setProjectInfo] = useState<REQUEST_STATE>(new REQUEST_STATE())


    useEffect(()=>{
        setProjectInfo(request)
    }, [request])

    const onProjectInfoChange = async(e:SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        await setProjectInfo(projectInfo => ({...projectInfo, [target.name]:target.value}))
    }


    const storeRequest = () => {
        dispatch(fillRequeset(projectInfo))
    }

    const goBack = () => {
        storeRequest();
        navigate('/request/contactInfoSection')
    }
    const goNext = () => {
        storeRequest();
        dispatch(setCheckStage(2));
        navigate('/request/finishSection')
    }

    return (
        <div>
            <Progressbar/>
            <div className='requestCon'>
                <div className='requestInfo'>
                    <label>Past Projects</label>
                    <input type="text" name="past_projects" defaultValue={projectInfo.past_projects} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Other Audits</label>
                    <input type="text" name="other_audits" defaultValue={projectInfo.other_audits} onChange={onProjectInfoChange}></input>
                </div>

                <div className='requestInfo'>
                    <label>Other Comments</label>
                    <input type="text" name="other_comments" defaultValue={projectInfo.other_comments} onChange={onProjectInfoChange}></input>
                </div>

                <div className="requestButControl">
                    <button className='requestBut' onClick={goBack}>
                        Back
                    </button>
                    <button className="requestBut" onClick={goNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OtherInfoSection