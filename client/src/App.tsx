import './App.css';
import React from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import Audited from './features/Audited/Audited';
import Request from './features/Request/Request';
import Pending from './features/Pending/Pending';
import Main from './features/Main/Main';
import ProjectInfoSection from './features/Request/ProjectInfoSection/ProjectInfoSection';
import Layout from './components/Layout';
import ContactInfoSection from './features/Request/ContactinfoSection/ContactInfoSection';
import OtherInfoSection from './features/Request/OtherInfoSection/OtherInfoSection';
import FinishSection from './features/Request/FinishSection/FinishSection';
import Team from './features/Team/Team';



function App() {
    return (
        <>
            <Layout/>
            <Routes>
                <Route path='/'>
                    <Route index element={<Main />}/>
                    <Route path="audited" element={<Audited />} />
                    <Route path="request">
                        <Route index element={<Request />} />
                        <Route path="projectInfoSection" element={<ProjectInfoSection />} />
                        <Route path="contactInfoSection" element={<ContactInfoSection />} />
                        <Route path="otherInfoSection" element={<OtherInfoSection />} />
                        <Route path="finishSection" element={<FinishSection />} />
                    </Route> 
                    <Route path="pending" element={<Pending />} />
                    <Route path="team" element={<Team />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
