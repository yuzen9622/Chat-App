import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ChatContext } from '../Context/ChatContext';
import { url } from '../servirce';
import avarter from "../img/user.png"
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const params = useParams();
    const { user } = useContext(AuthContext)
    const { getUserProfile, UserProfile, potentialChats, createChat, delChat, updateCurrentChat, userprofileChat } = useContext(ChatContext)
    const { id } = params
    const navigate = useNavigate()

    function copy() {
        const Id = document.getElementById("Id")
        const IdBtn = document.getElementById('copy-btn');
        IdBtn.title = "Copied"
        navigator.clipboard.writeText(Id.innerText)
    }
    useEffect(() => {

        getUserProfile(id, user.id)
    }, [id])
    if (user.id == UserProfile?._id) navigate('/Profile')
    return (
        <div className="profile">
            {UserProfile?._id == id ? <>
                <div className="profile-img">
                    <img src={UserProfile?.Avatar ? `${url}/users/avatar/${UserProfile._id}` : avarter} alt="user-avatar" />
                </div>

                <div className="profile-user">
                    <div className='profile-alt'>
                        <h1 className='name' id='name'>{UserProfile?.email_id}</h1>
                    </div>

                    <div className="profile-alt">
                        <h2 className='name'> {UserProfile?.name}</h2>
                    </div>

                    <p><span readOnly style={{
                        border: "none", resize: 'none', outline: "none", display: "flex", whiteSpace: "pre-wrap", width: "230px"
                    }} id='introduction'>{UserProfile.bio ? UserProfile.bio : ""}</span></p>
                    {potentialChats?.some((user) => user._id == id) ?
                        <button onClick={() => createChat(user.id, id)}>加入好友</button>
                        : <><button onClick={() => delChat(user.id, id)} >解除好友</button><button onClick={() => { updateCurrentChat(userprofileChat); navigate('/chat') }} >發送訊息</button></>}

                </div>
            </> : <div className='loader-chat'></div>}
        </div>
    )
}