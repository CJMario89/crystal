import './css/Navbar.css';
import { Link } from "react-router-dom";
// import Logo3D from './Logo3D';


interface PROP{
    path: String
}

function Navbar(props: PROP) {
    let AuditedClassName = "ts" + (props.path.includes("projects") ? " cts" : "");
    let RequestClassName = "ts" + (props.path.includes("request") ? " cts" : "");
    let PendingClassName = "ts" + (props.path.includes("pending") ? " cts" : "");
    let TeamClassName = "ts" + (props.path.includes("team") ? " cts" : ""); 
    let mainClassName = "tm" + (props.path === '/' ? " ctm" : "");
    return (
        <div>
            <div className='navbarContainer navbarOnload'>
                <Link to="/" className={mainClassName}>
                    Crystal Audit
                    <div className='logo3D'>
                        {/* <Logo3D></Logo3D> */}
                    </div>
                </Link>
                <Link to="/projects" className={AuditedClassName}>Projects</Link>
                <Link to="/request" className={RequestClassName}>Request</Link>
                <Link to="/pending" className={PendingClassName}>Pending</Link>
                <Link to="/team" className={TeamClassName}>Team</Link>
                <div className='socialCon'>
                    <Link to="" className='ss telegram'>
                        <img src="/telegram.svg" alt=''></img>
                    </Link>
                    <Link to="" className='ss twitter'>
                        <img src="/twitter.svg" alt=''></img>
                    </Link>
                </div>
            </div>
            
        </div>
    );
}

export default Navbar;
