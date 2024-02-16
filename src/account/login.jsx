import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import './acc.css'
import { url } from "../servirce";
function Login() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [islogin, setlogin] = useState(false)
    const [loginError, setLoginError] = useState("")

    const login = (e) => {

        e.preventDefault();
        fetch(`${url}/users/login`, {
            method: "POST", body: JSON.stringify({
                email: email,
                password: pass
            })
            , headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.json())
            .then((data) => {

                let datas = {}
                console.log(data)
                if (data.name) {

                    datas = { id: data._id, name: data.name, Avatar: data.Avatar, email: data.email, bio: data.bio }
                    sessionStorage.setItem("User", JSON.stringify(datas))
                    window.location.reload()
                    setlogin(false)
                } else {
                    setlogin(false)
                    setLoginError(data)
                }


            })
            .catch((err) => {

                console.error(err);
            })
    }
    useEffect(() => {
        setlogin(false)
        if (user !== null) {
            navigate('/chat')


        }

    }, [user])
    return (
        <div className="login">

            <h1>Chatta</h1>
            <h3>Login</h3>
            <form autoFocus onSubmit={(e) => { login(e); setlogin(true); }}>


                <div className="user">


                    <input type="text" id="email" required placeholder="  " value={email}
                        onChange={(e) => { setEmail(e.target.value); }} />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="user">

                    <input type="password" id="pass" required value={pass} placeholder=" "
                        onChange={(e) => setPass(e.target.value)} />
                    <label htmlFor="pass">Password</label>
                </div>

                <h4>{loginError}</h4>
                {islogin ? <button disabled >Login...</button> : <button type="submit">Log in</button>}

            </form>
        </div>
    )
}

export default Login
