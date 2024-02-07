import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext';
import { useFetchRecipinet, useFetchLastMessage } from '../api/api';
import moment from "moment";
import InputEmoji from "react-input-emoji"
import "moment/locale/zh-tw";
import { url } from '../servirce';
import avarter from "../img/user.png"

function ChatBoard() {
    const { currentChat, messages, sendMessage, onlineUser } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    const [textmessage, setTextmessage] = useState("")
    const { recipinetUser } = useFetchRecipinet(currentChat, user)
    const scroll = useRef();
    const { lastestMessage } = useFetchLastMessage(currentChat)

    useEffect(() => {

        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [currentChat, messages])
    return (
        <>
            {!recipinetUser ? <p style={{ textAlign: "center", width: "100%" }}>No conversation yet...</p> : <><div className="chat-board">
                <div className="chat-title">
                    <div className="chat-img">
                        <img src={recipinetUser?.Avatar ? `${url}/${recipinetUser?.Avatar}` : avarter} alt="" />
                        <div className={onlineUser?.some((user) => user.userId === recipinetUser?._id) ? "online" : ""}></div>

                    </div>
                    <h1>{recipinetUser.name}</h1>

                </div>
                <div className="chat-main">
                    {messages && messages.map((message, index) => (
                        <div ref={scroll} className={`${message?.senderId === user.id ? "user-message" : "other-message"}`} key={index}>
                            < div className='message' >
                                <span className='text'>{message.text}</span>

                            </div>
                            <div className='time'><div className="time">{message?.senderId === user.id && lastestMessage?.isRead ? "已讀" : ""}</div>{moment(message.createdAt).locale('zh-tw').calendar()} </div>
                        </div>
                    ))}
                </div>

                <div className="chat-input">

                    <InputEmoji value={textmessage} onChange={setTextmessage} placeholder='Message...' fontFamily='Helvetica, Arial, sans-serif' cleanOnEnter onEnter={() => sendMessage(textmessage, user, currentChat._id, false, sendMessage)} />
                    {textmessage &&
                        <button className={textmessage == "" ? "btn" : "btn istext"} type='button' onClick={() => { sendMessage(textmessage, user, currentChat._id, false, sendMessage); setTextmessage("") }}><i class="fa-solid fa-paper-plane"></i></button>
                    }
                </div>
            </div></>}

        </>
    )
}

export default ChatBoard
