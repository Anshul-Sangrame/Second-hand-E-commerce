import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import './Style/sidebar.css';

export default function SideBar() {
    const nav = useNavigate()
    const showSB = useOutletContext();

    const hiddenStyle = {
        sideBar: {
            minWidth: 0,
            flexBasis: 0,
            margin: 0,
            overflow: "hidden",
            transition: "all 1s ease"
        }
    };

    const showStyle = {
        sideBar: {
            minWidth: 0,
            overflow: "hidden",
            transition: "all 1s ease"
        }
    }

    const handleClick = function () {
        nav('/home');
    };


    return (
        <div className="side-bar-container">
            {
                <div className="side-bar" style={showSB ? showStyle.sideBar : hiddenStyle.sideBar}>
                    <div className="content">
                        <button onClick={handleClick}>Home</button>
                    </div>
                </div>
            }
            <Outlet />
        </div>
    )
}