import React from 'react'
import { useFetchLastMessage, useFetchRecipinet } from '../api/api';
import avarter from "../img/arect.svg"
import PotentialChats from './PotentialChats';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import moment from 'moment';

function UserChat({ chat, user }) {
    const { onlineUser, notifications, markthisNotificationRead } = useContext(ChatContext)
    const { recipinetUser } = useFetchRecipinet(chat, user)

    const { lastestMessage } = useFetchLastMessage(chat)

    const unreadNotificationsFunc = (notifie) => {
        return notifie?.filter((n) => n?.isRead === false)
    }
    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNoifications = unreadNotifications?.filter(
        n => n.senderId == recipinetUser?._id
    )
    return (
        <>

            <button type='button' className='tab' onClick={() => markthisNotificationRead(thisUserNoifications, notifications)}>
                <div className="userlist">
                    <div className="list">
                        <div className="img-online">

                            <img src={avarter} alt="img" />
                            <div className={onlineUser?.some((user) => user.userId === recipinetUser?._id) ? "online" : ""}></div>
                        </div>


                        <div className='user-recip'>

                            <h3>{recipinetUser?.name}</h3>
                            {lastestMessage !== undefined ?
                                <div className="user-text">
                                    {<> <p className='txt'>{lastestMessage?.senderId == user?.id ? `You:${lastestMessage?.text}` : `${lastestMessage?.text}`}</p><p className="text-time">·</p><p className='text-time'>{moment(lastestMessage?.createdAt).fromNow()}</p></>}
                                </div>
                                : ""}

                        </div>
                    </div>

                    <div className="time">
                        <div className={thisUserNoifications?.length > 0 ? 'point' : ""}></div></div>
                </div >

            </button >
        </>
    )
}

export default UserChat
