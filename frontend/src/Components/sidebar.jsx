import { Outlet, useNavigate } from "react-router-dom";
import './Style/sidebar.css';

export default function SideBar() {
    const nav = useNavigate()

    const handleClick = function ()
    {
        nav('/home');
    };


    return (
        <div className="side-bar-container">
            <div className="side-bar">
                <div className="content">
                    <button onClick={handleClick}>Home</button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}