import './Audited.css';
import React from "react";


function Audit() {
  return (
    <>
        <div className='sideBar'>
            <div>Audited</div>
            <div>Criteria</div>
            <div>Rejected</div>
        </div>
        <div className='auditedDes'>
            Projects has been audited
        </div>
        <div className='audited'>
            There is no project been audited yet.
        </div>
        
    </>
  );
}

export default Audit;
