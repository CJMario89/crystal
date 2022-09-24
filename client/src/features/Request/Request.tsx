import './Request.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Request() {
    return (
        <div>
            <div className='contentCon'>
                <div className='requestDes'>
                    Every request is free to be Audited in the early stage, 
                    <br/>
                    it can be Audited within a week at the latest,
                    <br/>
                    if there is no secure problem in contract,
                    <br/>
                    and all the requests waiting to be audited are in the pending page.
                    <br/>
                    if you want to submit a request to audit,
                    <br/>
                    click below button and finish the form.
                </div>
                <Link to='/request/projectInfoSection'>
                    <button className='requestBut'>
                        Request Audit
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Request;
