import { Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import './Style/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faIndianRupeeSign, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";

function HighlightedButton({ myPath, children, logout }) {
    const loc = useLocation();
    const nav = useNavigate();
    const path = loc.pathname;
    let match = false;
    if (path === myPath || path === (myPath + "/") || (path + "/") === myPath) {
        match = true;
    }

    const styleColor = { color: 'orange' };
    const handleClick = function () {
        if (logout) {
            sessionStorage.removeItem('token');
        }
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
    const contentRef = useRef(null);
    const [h, setH] = useState(0);

    useEffect(() => {
        const handlesize = () => {
            setH(contentRef.current.offsetHeight)
        }

        handlesize();

        window.addEventListener("resize", handlesize);
        return () => {
            window.removeEventListener("resize", handlesize);
        }
    }, [])

    return (
        <div className="side-bar-container">
            <div className={"side-bar" + (!showSB ? " invisible" : "")} style={{ "--height": h + "px" }} >
                <div className="content" ref={contentRef}>
                    <hr />
                    <HighlightedButton myPath="/home">
                        <FontAwesomeIcon icon={faHouse} size="xs" /> Home
                    </HighlightedButton>
                    <hr />
                    <hr />
                    <HighlightedButton myPath="/editProfile">
                        <FontAwesomeIcon icon={faUser} size="xs" /> Profile
                    </HighlightedButton>
                    <hr />
                    <hr />
                    <HighlightedButton myPath="/myProduct">
                        <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" /> Sell
                    </HighlightedButton>
                    <hr />
                    <hr />
                    <HighlightedButton myPath="/mycart">
                        <FontAwesomeIcon icon={faCartShopping} size="xs" /> Cart
                    </HighlightedButton>
                    <hr />
                    <hr />
                    <HighlightedButton myPath="/" logout={true}>
                        <FontAwesomeIcon icon={faRightFromBracket} size="xs" /> Log Out
                    </HighlightedButton>
                    <hr />
                </div>
            </div>
            <Outlet />
        </div>
    )
}