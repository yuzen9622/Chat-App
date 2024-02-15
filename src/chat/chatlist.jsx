import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
import UserChat from './userchat'


function Chatlist() {
    const { userChats, updateCurrentChat, lodingChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)


    function active(actnode) {
        if (actnode == null) return
        let button = document.querySelectorAll('.tab');
        button[actnode].classList.add('active')

        for (let i = 0; i < button.length; i++) {
            if (i !== actnode) {
                button[i].classList.remove('active')

            }

        }


    }



    return (
        <>

            <div className='chat-list'>

                <div className="add">
                    <h3>message</h3>

                </div>


                {!lodingChat ?
                    userChats?.map((chat, index) => (

                        <div className="userchat-list" key={index} onClick={() => { updateCurrentChat(chat); active(index) }}>

                            <UserChat user={user} chat={chat} key={index} />

                        </div>

                    ))
                    : <div className='load-div'><div className='loader'></div></div>}

            </div >

        </>
    )
}

export default Chatlist
