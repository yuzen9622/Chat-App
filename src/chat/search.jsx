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
        setTimeout(() => {
            search(searchName, user?.id) 
        }, 200);
        
    }, [searchName, userChats])

    const spliceEmail = (email) => {
        const mailId = email.split("@");
        const id = "@" + mailId[0];
        return id
    }
    const searchbtn = (e) => {
        const NavUser = document.getElementsByClassName('nav-user')[0]
        const box = document.getElementsByClassName('box')[0]
        const input = document.getElementsByClassName('input')[0]
        input.focus()
        NavUser.style.display = 'none' 
        box.classList.add('active-input')
        e.target.focus();
    }
    const searchout = () => {
        setTimeout(()=>{
            const NavUser = document.getElementsByClassName('nav-user')[0]
            NavUser.style.display = 'flex' 
            const box = document.getElementsByClassName('box')[0]
            box.classList.remove('active-input')
            setSearchName("")
        },100)
       
        
    }
    return (
        <div className="search">

            <div className="search-box">
                <input type="search" autocomplete="off" id='search'  placeholder='' value={searchName}  onChange={(e) => setSearchName(e.target.value)} />
                <label id='search' htmlFor="search" >#Search</label>

            </div>
        
            <div class="box" onClick={searchbtn} >
                <form name="search">
                        <input type="text"  class="input" placeholder='Search...' name="txt" id='search' onBlur={searchout} value={searchName}  onChange={(e) => setSearchName(e.target.value)} />
                </form>
    <i class="fas fa-search"></i>

</div>
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
