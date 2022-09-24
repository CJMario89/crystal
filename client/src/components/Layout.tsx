import React from 'react'
import { useLocation } from 'react-router-dom'
import Background from './Background'
import Navbar from './Navbar'

const Layout = () => {
    const path = useLocation().pathname;
    const three = (path === "/") ? true : false
    return (
        <>
            {three || <Background/>}
            <Navbar path={path}/>
        </>
    )
}

export default Layout;