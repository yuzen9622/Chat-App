import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { AuthContext } from '../Context/AuthContext';
import Search from '../chat/search';
import avarter from "../img/user.png"
import { url } from '../servirce';

import { ChatContext } from '../Context/ChatContext';

function Navbar() {
    const { user, logoutUser } = useContext(AuthContext)
    const { allUsers } = useContext(ChatContext)
    const User = allUsers?.find(id => id._id === user.id)

    return (
        <div className="nav">
            <nav>
                <ul>
                    <div className="log">
                        <li><h1>Chatta</h1> </li>
                        {user ? <li><Search /></li> : ""}

                    </div>

                    {user ? <div className='nav-user'><Link to={'/chat'}><i class="fa-regular fa-comment-dots"></i><p>Chat</p></Link>
                        <Link to={'/Profile'}><span>{User?.Avatar ? <img src={User?.Avatar ? `${url}/users/avatar/${user?.id}` : avarter} alt="" width="35px" /> : <> <div className='img-glimmer-line'></div></>}</span><p>Profile</p></Link>
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
