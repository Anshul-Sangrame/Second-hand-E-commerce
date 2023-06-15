import { createContext,useContext,useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthToolsContext = createContext(null)

export function Auth({ children, isAuth }) {
    var IsAuth = false;

    const CheckAuth =  () => {
        IsAuth = isAuth;
    }

    CheckAuth();

    // useEffect(() => {
    //     IsAuth = true;
    // },[]);

    console.log(IsAuth)

    if (!IsAuth) 
    {
        return <Navigate to='/' />
    }

    return (
        <AuthToolsContext.Provider value={IsAuth}>
            {children}
        </AuthToolsContext.Provider>
    )
}

export function GetTools() 
{
    return useContext(AuthToolsContext)
}