import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext';
import { useFetchRecipinet } from '../api/api';
import moment from "moment";
import InputEmoji from "react-input-emoji"
import "moment/locale/zh-tw";

function ChatBoard() {
    const { currentChat, messages, sendMessage } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    const [textmessage, setTextmessage] = useState("")
    const { recipinetUser } = useFetchRecipinet(currentChat, user)
    const scroll = useRef();

    useEffect(() => {

        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [currentChat, messages])
    return (
        <>
            {!recipinetUser ? <p style={{ textAlign: "center", width: "100%" }}>No conversation yet...</p> : <><div className="chat-board">
                <div className="chat-title">
                    <h1>{recipinetUser.name}</h1>
                </div>
                <div className="chat-main">
                    {messages && messages.map((message, index) => (
                        <div ref={scroll} className={`${message?.senderId === user.id ? "user-message" : "other-message"}`} key={index}>
                            < div className='message' >
                                <span className='text'>{message.text}</span>

                            </div>
                            <div className='time'>{moment(message.createdAt).locale('zh-tw').calendar()}</div>
                        </div>
                    ))}
                </div>

                <div className="chat-input">

                    <InputEmoji value={textmessage} onChange={setTextmessage} placeholder='Message...' fontFamily='Helvetica, Arial, sans-serif' cleanOnEnter onEnter={() => sendMessage(textmessage, user, currentChat._id, sendMessage)} />
                    {textmessage &&
                        <button className={textmessage == "" ? "btn" : "btn istext"} type='button' onClick={() => { sendMessage(textmessage, user, currentChat._id, sendMessage); setTextmessage("") }}><i class="fa-solid fa-paper-plane"></i></button>
                    }
                </div>
            </div></>}

        </>
    )
}

export default ChatBoard
