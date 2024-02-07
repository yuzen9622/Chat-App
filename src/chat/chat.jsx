import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import ChatBoard from './chatBoard';
import Chatlist from './chatlist';
import './chat.css';
import './RWD.css'
function Chat() {
    const { user } = useContext(AuthContext);
    const navgitave = useNavigate()
    useEffect(() => {
        if (user === null) {
            navgitave('/login')
        }
    }, [user])
    console.log(user)
    return (
        <>
            <div className='chat'>
                <Chatlist />
                <ChatBoard />
            </div>
        </>
    )
}

export default Chat
