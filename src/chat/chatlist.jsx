import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
import UserChat from './userchat'
import { Link } from 'react-router-dom'

function Chatlist() {
    const { userChats, updateCurrentChat } = useContext(ChatContext)
    const { user } = useContext(AuthContext)

    function active(node) {

        let button = document.querySelectorAll('.tab');
        button[node].classList.add('active')

        for (let i = 0; i < button.length; i++) {
            if (i !== node) {
                button[i].classList.remove('active')

            }
        }


    }

    let dropopen = false
    const opendrop = () => {

        let drop = document.getElementsByClassName("side-drop")[0];
        if (dropopen) {
            drop.style.display = 'none'
            dropopen = false

        } else {
            drop.style.display = 'flex'

            dropopen = true
        }
    }

    return (
        <>

            <div className='chat-list'>

                <div className="add">
                    <h3>message</h3>

                </div>


                {
                    userChats?.map((chat, index) => (
                        <div className="userchat-list" key={index} onClick={() => { updateCurrentChat(chat); active(index) }}>

                            <UserChat user={user} chat={chat} key={index} />
                        </div>
                    ))
                }

            </div>

        </>
    )
}

export default Chatlist
