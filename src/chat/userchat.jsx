import React, { lazy } from 'react'
import { useFetchLastMessage, useFetchRecipinet } from '../api/api';
import avarter from "../img/user.png"

import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { url } from '../servirce';
import moment from 'moment';

function UserChat({ chat, user }) {
    const { onlineUser, markthisread } = useContext(ChatContext)
    const { recipinetUser } = useFetchRecipinet(chat, user)

    const { lastestMessage } = useFetchLastMessage(chat)


    return (
        <>
            {recipinetUser ?
                <button type='button' className='tab' onClick={() => { markthisread(lastestMessage?.chatId, lastestMessage?.senderId) }}>
                    <div className="userlist">
                        <div className="list">
                            <div className="img-online">

                                <img src={recipinetUser?.Avatar ? `${url}/users/avatar/${recipinetUser?._id}` : avarter} alt="img" />
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
                        {lastestMessage !== undefined && lastestMessage?.senderId !== user?.id ?
                            <div className="time">

                                <div className={lastestMessage?.isRead ? '' : 'point'}></div>
                            </div>
                            : ''}
                    </div >

                </button >
                : <><div className="userlist glimmer-panel">
                    <div className="listglimmer-panel">
                        <div className="img-online">

                            <div className='img-glimmer-line'></div>

                        </div>


                        <div className='user-recip glimmer-line'>

                            <h3></h3>

                            <div className="user-text glimmer-line">

                            </div>


                        </div>
                    </div>

                </div ></>}
        </>
    )
}

export default UserChat