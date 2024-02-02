import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
function Sign() {
    const { signInfo, updateSignInfo } = useContext(AuthContext);
    console.log(signInfo)
    let url = "http://localhost:5000/users/register"
    const sign = (e) => {
        e.preventDefault();
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signInfo)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log(data)
                }
            })
    }

    return (
        <div className="sign">
            <h1>Chatta</h1>
            <h3>Register</h3>
            <form onSubmit={sign}>
                <div className="user">

                    <input type="text" id='name' placeholder='' onChange={(e) => { updateSignInfo({ ...signInfo, name: e.target.value }) }} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="user">

                    <input type="email" id='email' placeholder='' onChange={(e) => { updateSignInfo({ ...signInfo, email: e.target.value }) }} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="user">
                    <input type="password" id='password' placeholder='' onChange={(e) => { updateSignInfo({ ...signInfo, password: e.target.value }) }} />
                    <label htmlFor="password">Password</label>
                </div>
                <button type='submit'>註冊</button>
            </form>
        </div>
    )
}

export default Sign
