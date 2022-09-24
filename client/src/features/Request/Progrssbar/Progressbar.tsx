import React from 'react'
import { useLocation } from 'react-router-dom'
import "./Progressbar.css"

const Progressbar = () => {
    let path = useLocation().pathname
    path = path.substring(path.lastIndexOf("/") + 1)
    return (
        <>
            <div className='progressbar'>
                <div className='progressNodeCon'>
                    <div className={path === ('projectInfoSection' || 'contactInfoSection' || 'otherInfoSection' || 'finishSection') ? 'progressNode' : 'progressNodeDisable'}></div>
                    <div className={path === ('contactInfoSection' || 'otherInfoSection' || 'finishSection') ? 'progressNode' : 'progressNodeDisable'}></div>
                    <div className={path === ('otherInfoSection' || 'finishSection') ? 'progressNode' : 'progressNodeDisable'}></div>
                    <div className={path === 'finishSection' ? 'progressNode' : 'progressNodeDisable'}></div>
                </div>
                <div className='progressInfoCon'>
                    <div className={path === ('projectInfoSection' || 'contactInfoSection' || 'otherInfoSection' || 'finishSection') ? 'progressInfo' : 'progressInfoDisable'}><p>Project Info</p></div>
                    <div className={path === ('contactInfoSection' || 'otherInfoSection' || 'finishSection') ? 'progressInfo' : 'progressInfoDisable'}><p>Contact Info</p></div>
                    <div className={path === ('otherInfoSection' || 'finishSection') ? 'progressInfo' : 'progressInfoDisable'}><p>Other Info</p></div>
                    <div className={path === 'finishSection' ? 'progressInfo' : 'progressInfoDisable'}><p>Check</p></div>
                </div>
                    
            </div>
            
        </>
    )
}

export default Progressbar