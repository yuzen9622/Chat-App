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
    const { currentChat, loadingUser, messages, sendMessage, onlineUser, isMobile } = useContext(ChatContext);
    const { user } = useContext(AuthContext)
    const [textmessage, setTextmessage] = useState("")
    const { recipinetUser } = useFetchRecipinet(currentChat, user)
    const scroll = useRef();
    const { lastestMessage } = useFetchLastMessage(currentChat)
    const mobile = isMobile()
    useEffect(() => {

        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [currentChat, messages])
    const spliceEmail = (email) => {
        const mailId = email.split("@");
        const id = "@" + mailId[0];
        return id
    }

    return (

        <>
            {!recipinetUser ? <p style={{ textAlign: "center", width: "100%" }}>No conversation yet...</p> : <><div className="chat-board">
                {!loadingUser ? <>

                    <div className="chat-title">
                        <div className="chat-img">
                            <img src={recipinetUser?.Avatar ? `${url}/users/avatar/${recipinetUser?._id}` : avarter} alt="" />
                            <div className={onlineUser?.some((user) => user.userId === recipinetUser?._id) ? "online" : ""}></div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}> <h1>{recipinetUser.name}</h1>
                            <pre>{spliceEmail(recipinetUser?.email)}</pre></div>

                    </div>
                    <div className="chat-main">
                        {messages && messages.map((message, index) => (
                            <div ref={scroll} className={`${message?.senderId === user.id ? "user-message" : "other-message"}`} key={index}>
                                < div className='message' >
                                    <span className='text'>{message.text}</span>

                                </div>
                                <div className='time'><div className="time">{message?.senderId === user.id && lastestMessage?.isRead ? "已讀" : message?.senderId === user.id && message?.isRead ? "已讀" : ""}</div>{moment(message.createdAt).locale('zh-tw').calendar()} </div>
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                        {isMobile() ? <input type='text' className='react-input-emoji--input text-input' placeholder='Messages...' value={textmessage} onInput={(e) => setTextmessage(e.target.value)} /> : <InputEmoji keepOpened onChange={setTextmessage} value={textmessage} placeholder='Message...' fontFamily='Helvetica, Arial, sans-serif' cleanOnEnter onEnter={() => sendMessage(textmessage, user, currentChat._id, false, sendMessage)} />}


                        {textmessage &&
                            <button className={textmessage == "" ? "btn" : "btn istext"} type='button' onClick={() => { sendMessage(textmessage, user, currentChat._id, false, sendMessage); setTextmessage("") }}><i class="fa-solid fa-paper-plane"></i></button>
                        }
                    </div></> : <div className='loader'></div>}
            </div></>}


        </>
    )
}

export default ChatBoard