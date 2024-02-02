import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import avarter from "../img/arect.svg"
function Search() {
    const { search, searchUser, createChat, potentialChats, userChats } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [searchName, setSearchName] = useState("")
    useEffect(() => {
        search(searchName, user?.id)
    }, [searchName, userChats])

    return (
        <div className="search">
            <h2>new message</h2>
            <div className="user">
                <input type="text" autocomplete="off" id='search' placeholder='' onChange={(e) => setSearchName(e.target.value)} />
                <label htmlFor="search" >Name</label>

            </div>
            <div className="search-user">
                {searchUser?.length > 0 ? searchUser.map((u) => (
                    <div className='search-data'>
                        <img src={avarter} alt="" />
                        {u.name}
                        <button onClick={() => createChat(user.id, u._id)}>新增</button>
                    </div>
                )) : <h3>No user here</h3>}

            </div>
        </div>
    )
}

export default Search
