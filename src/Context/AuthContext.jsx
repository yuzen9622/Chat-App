import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { url } from "../servirce";
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
    const updateAvatar = useCallback(() => {
        var input = document.createElement('input');
        input.type = 'file';

        input.addEventListener('change', async function (event) {
            var selectedFile = event.target.files[0];
            var formData = new FormData();
            formData.append('userId', user?.id)
            formData.append('img', selectedFile)
            try {

                const response = await fetch(`${url}/users/pic/upload/${user?.id}`, { method: "POST", body: formData })
                const data = await response.json();
                const datas = { id: data._id, name: data.name, Avatar: data.Avatar, email: data.email }
                sessionStorage.setItem("User", JSON.stringify(datas))
                window.location.reload()


            } catch (error) {

            }

        })
        input.click();
    })

    return (
        <AuthContext.Provider value={{ user, signInfo, updateSignInfo, logoutUser, updateAvatar }}>
            {children}
        </AuthContext.Provider>
    )
}