import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'

function PotentialChats() {
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat, onlineUser } = useContext(ChatContext)

    return (
        <div className="all-user">
            {potentialChats && potentialChats.map((u, index) => (
                <div className="single-user" key={index} onClick={() => createChat(user.id, u._id)}>
                    <div className={onlineUser?.some((user) => user.userId === u._id) ? "online" : ""}></div>
                    {u.name}

                </div>
            ))}
        </div>
    )
}

export default PotentialChats
