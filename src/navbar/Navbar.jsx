import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
function Navbar() {
    const { user, logoutUser } = useContext(AuthContext)

    return (
        <div className="nav">
            <nav>
                <ul>
                    <li><h1>Chatta</h1></li>

                    {user ? <div><Link>Setting</Link><Link onClick={() => logoutUser()}>Logout</Link></div> :
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
