import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
import UserChat from './userchat'
import PotentialChats from './PotentialChats'
import Search from './search'
import { Link } from 'react-router-dom'
function Chatlist() {
    const { userChats, updateCurrentChat } = useContext(ChatContext)
    const { user, logoutUser } = useContext(AuthContext)

    function active(node) {
        console.log(node)
        let button = document.querySelectorAll('.tab');
        button[node].classList.add('active')
        for (let i = 0; i < button.length; i++) {
            if (i !== node) {
                button[i].classList.remove('active')
            }
        }


    }
    let isopen = false
    const opensearch = () => {
        let search = document.getElementsByClassName("search")[0];
        let drop = document.getElementsByClassName("side-drop")[0];
        if (isopen) {
            search.style.display = 'none';
            isopen = false

        } else {
            search.style.display = 'flex';
            drop.style.display = 'none'
            dropopen = false
            isopen = true
        }

    }
    let dropopen = false
    const opendrop = () => {
        let search = document.getElementsByClassName("search")[0];
        let drop = document.getElementsByClassName("side-drop")[0];
        if (dropopen) {
            drop.style.display = 'none'
            dropopen = false

        } else {
            drop.style.display = 'flex'
            search.style.display = 'none';
            isopen = false
            dropopen = true
        }
    }

    return (
        <>

            <div className='chat-list'>
                <div className="user-sett">
                    <button onClick={opendrop}>{user.name} <i class="fa-solid fa-chevron-down"></i></button>
                    <div className="side-drop">
                        <ul>
                            <li>
                                <Link>Setting</Link>
                            </li>
                            <li>
                                <Link onClick={() => logoutUser()}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="add">
                    <h3>message</h3>
                    <button type='button' onClick={opensearch}><i class="fa-solid fa-plus"></i></button>
                </div>


                {
                    userChats?.map((chat, index) => (
                        <div className={index} key={index} onClick={(e) => { updateCurrentChat(chat); active(index) }}>

                            <UserChat user={user} chat={chat} key={index} />
                        </div>
                    ))
                }
                <Search />
            </div>

        </>
    )
}

export default Chatlist
