import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("User")))
    const navgative = useNavigate();
    const [signInfo, setSignInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const updateSignInfo = useCallback((info) => {
        setSignInfo(info)
    }, [])

    const logoutUser = useCallback(() => {
        window.location.reload()
        sessionStorage.removeItem("User");
        navgative('/login')



    })
    useEffect(() => {

    })
    return (
        <AuthContext.Provider value={{ user, signInfo, updateSignInfo, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
