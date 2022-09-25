import React from 'react'
import { useLocation } from 'react-router-dom'
import Background from './Background'
import Navbar from './Navbar'
import AlertMsg from './AlertMsg'
import Footer from './Footer'

const Layout = () => {
    const path = useLocation().pathname;
    const three = (path === "/") ? true : false
    return (
        <>
            {three || <Background/>}
            <Navbar path={path}/>
            <AlertMsg/>
            <Footer/>
        </>
    )
}

export default Layout;