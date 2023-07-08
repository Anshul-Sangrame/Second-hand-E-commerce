import { Outlet, useLocation, useNavigate, useOutletContext, matchPath } from "react-router-dom";
import './Style/sidebar.css';

function HighlightedButton({ myPath, children }) {
    const loc = useLocation();
    const nav = useNavigate()
    const path = loc.pathname;
    let match = false;
    if (path === myPath || path === (myPath + "/") || (path + "/") === myPath) {
        match = true;
    }

    const styleColor = { color: 'orange' };
    const handleClick = function () {
        nav(`${myPath}`);
    };

    return (
        <button
            onClick={handleClick}
            style={(match ? styleColor : {})}
        >
            {children}
        </button>
    )
}

export default function SideBar() {
    const showSB = useOutletContext();

    return (
        <div className="side-bar-container">
            <div className={"side-bar" + (!showSB ? " invisible" : "")} >
                <div className="content">
                    <HighlightedButton myPath="/home">Home</HighlightedButton>
                    <HighlightedButton myPath="/editProfile">Profile</HighlightedButton>
                </div>
            </div>
            <Outlet />
        </div>
    )
}