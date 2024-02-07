import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("User")))
    const navgate = useNavigate()

    const [signInfo, setSignInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const updateSignInfo = useCallback((info) => {
        setSignInfo(info)
    }, [])

    const logoutUser = useCallback(() => {
        navgate('/')
        sessionStorage.removeItem("User");
        window.location.reload()
    })

    return (
        <AuthContext.Provider value={{ user, signInfo, updateSignInfo, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}
