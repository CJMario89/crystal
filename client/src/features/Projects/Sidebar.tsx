import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const path = useLocation().pathname;
    const auditedClassName = (path.includes('audited') ? 'sidebarOption focusOption':'sidebarOption');
    const criteriaClassName = (path.includes('criteria') ? 'sidebarOption focusOption':'sidebarOption');
    const rejectedClassName = (path.includes('rejected') ? 'sidebarOption focusOption':'sidebarOption');
    return (
        <div>
            <div className='sidebar'>
                <Link className={auditedClassName} to='/projects/audited'>Audited</Link>
                <Link className={criteriaClassName} to='/projects/criteria'>Criteria</Link>
                <Link className={rejectedClassName} to='/projects/rejected'>Rejected</Link>
            </div>
        </div>
    )
}

export default Sidebar