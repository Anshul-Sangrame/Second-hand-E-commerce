import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const CheckAuth = async (setIsAuth) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            setIsAuth(false);
            return;
        }

        const res = await fetch('http://localhost:5000/verify', {
            method: 'GET',
            headers: { token: token }
        });

        if (res.ok) {
            
            setIsAuth(true);
            return;
        }

        sessionStorage.removeItem('token');
        setIsAuth(false);
        return;
    } catch (err) {
        console.error(err.message);
    }
}

export function Public() {
    const [IsAuth, setIsAuth] = useState(false);

    useEffect(() => {
        CheckAuth(setIsAuth)
    }, [setIsAuth])

    if (!IsAuth) {
        return <Outlet />;
    }
    
    return <Navigate to="/home" />;
}

export function Private() {
    const [IsAuth, setIsAuth] = useState(true);

    useEffect(() => {
        CheckAuth(setIsAuth)
    }, [setIsAuth])

    if (!IsAuth) {
        return <Navigate to='/' />;
    }
    console.log("Private rendered");
    return <Outlet />;
}