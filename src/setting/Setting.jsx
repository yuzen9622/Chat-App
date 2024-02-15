import React, { useContext } from 'react'
import Profile from './Profile'
import Follow from './Follow';
import './setting.css'
import { AuthContext } from '../Context/AuthContext';
function Setting() {
    const { user } = useContext(AuthContext)
    if (!user) window.location.replace('/')
    return (
        <div className="sett">
            <Profile />
            <Follow />
        </div>
    )
}

export default Setting
