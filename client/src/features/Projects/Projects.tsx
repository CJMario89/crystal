import './Projects.css';
import React from "react";
import Sidebar from './Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Audited from './Audited';
import Criteria from './Criteria';
import Rejected from './Rejected';


function Projects() {
    

    return (
        <>
            <Sidebar/>
            <Routes>
                <Route index element={<Navigate to='audited'/>}/>
                <Route path='audited' element={<Audited/>}/>
                <Route path='criteria' element={<Criteria/>}/>
                <Route path='rejected' element={<Rejected/>}/>
            </Routes>
        </>
    );
}

export default Projects;
