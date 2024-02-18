import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navbar.css'
import { AuthContext } from '../Context/AuthContext';
import Search from '../chat/search';
import avarter from "../img/user.png"
import { url } from '../servirce';
import Icon from '../img/icon.png'
import { ChatContext } from '../Context/ChatContext';
import chat from '../img/chat.png'
function Navbar() {
    const { user, logoutUser } = useContext(AuthContext)
    const { allUsers } = useContext(ChatContext)
    const User = allUsers?.find(id => id._id === user.id)

    return (
        <div className="nav">
            <nav>
                <ul>
                    <div className="log">
                        <li><img id='chat-icon' src={chat} alt="" width={"40px"} /></li>
                        <li><img id='chatta-icon' src={Icon} alt="" width={"120px"} /></li>
                        {user ? <li><Search /></li> : ""}

                    </div>

                    {user ? <div className='nav-user'><NavLink to={'/chat'}><i class="fa-regular fa-comment-dots"></i><p>Chat</p></NavLink>
                        <NavLink to={'/Profile'}><span>   {User ? <img src={user?.Avatar ? `${url}/users/avatar/${user?.id}` : avarter} /> : <div className='img-glimmer-line'></div>}  </span><p>Profile</p></NavLink>
                        <Link to={'/'} onClick={() => logoutUser()}><i class="fa-solid fa-arrow-right-from-bracket"></i><p>Logout</p></Link></div> :
                        <div className='log'>
                            <li><Link to={'/login'}>Login</Link></li>
                            <li><Link to={'/sign'}>Register</Link></li>
                        </div>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
