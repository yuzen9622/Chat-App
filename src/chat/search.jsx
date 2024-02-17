import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import avarter from "../img/user.png"
import { url } from '../servirce'
import { useNavigate } from 'react-router-dom'
function Search() {
    const { search, searchUser, userChats } = useContext(ChatContext)
    const { user } = useContext(AuthContext)
    const [searchName, setSearchName] = useState("");
    const navigate = useNavigate()
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
                <label id='search' htmlFor="search" >#Search</label>

            </div>
            <a style={{ display: "none" }}><i class="fa-solid fa-magnifying-glass"></i></a>
            {searchUser?.length > 0 ?

                <div className="search-user">
                    {searchUser?.map((u) => (
                        <div className='search-data' style={{ cursor: "pointer" }} onClick={() => { navigate(`/user/${u?._id}`); setSearchName("") }}>
                            <img src={u?.Avatar ? `${url}/users/avatar/${u._id}` : avarter} alt="" />
                            <div className='search-profile'>{u.name}<pre>{spliceEmail(u.email)}</pre></div>



                        </div>
                    ))}

                </div>
                : ""}
        </div>
    )
}

export default Search
