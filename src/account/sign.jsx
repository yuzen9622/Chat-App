import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { url } from '../servirce';

function Sign() {
    const { signInfo, updateSignInfo } = useContext(AuthContext);
    const [signStatus, setSignStatus] = useState("")
    const [isSign, setIsSign] = useState(false)
    const sign = (e) => {
        setIsSign(true)
        e.preventDefault();
        fetch(`${url}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signInfo)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data._id) {
                    setSignStatus("註冊成功")
                    console.log(data)
                } else {
                    setSignStatus(data)
                }
                setIsSign(false)
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
                <h3 className='sign-status'>{signStatus}</h3>
                {isSign ? <button disabled>註冊中</button> : <button type='submit'>註冊</button>}
            </form>
        </div>
    )
}

export default Sign
