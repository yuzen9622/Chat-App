import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import avarter from "../img/user.png"
import { url } from '../servirce'
function Search() {
    const { search, searchUser, createChat, potentialChats, userChats } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        search(searchName, user?.id)
    }, [searchName, userChats])

    const spliceEmail = (email) => {
        const mailId = email.split("@");
        const id = "@" + mailId[0];
        return id
    }
    return (
        <div className="search">

            <div className="user">
                <input type="search" autocomplete="off" id='search' placeholder='' value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                <label htmlFor="search" >#Search</label>

            </div>
            {searchUser?.length > 0 ?

                <div className="search-user">
                    {searchUser?.map((u) => (
                        <div className='search-data'>
                            <img src={u?.Avatar ? `${url}/users/avatar/${u._id}` : avarter} alt="" />
                            <div className='search-profile'>{u.name}<pre>{spliceEmail(u.email)}</pre></div>


                            {potentialChats?.some((user) => user._id == u?._id) ?
                                <button onClick={() => createChat(user.id, u._id)}>Follow</button>
                                : <button >Unfollow</button>}

                        </div>
                    ))}

                </div>
                : ""}
        </div>
    )
}

export default Search