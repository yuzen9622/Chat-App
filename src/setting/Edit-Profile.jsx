import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { url } from '../servirce'
import avarter from "../img/user.png"

export default function EditProfile() {
    const { user, updateAvatar } = useContext(AuthContext)
    if (!user) window.location.replace('/')
    const [editUser, setEditUser] = useState({
        name: user.name,
        email: user.email,
        bio: ""
    })
    const spliceEmail = (email) => {
        const mailId = email.split("@");
        const id = "@" + mailId[0];
        return id
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>編輯個人檔案</h1>
            <div className="edit">


                <div className="edit-user">
                    <div className="edit-img">
                        <img src={user?.Avatar ? `${url}/users/avatar/${user.id}` : avarter} alt="user-avatar" />
                        <button onClick={() => updateAvatar()}>更換照片</button>
                    </div>
                    <div className="edit-alt">
                        名稱: <input type='text' className='name' id='name' value={editUser.name} onInput={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                    </div>
                    <div className='edit-alt'>
                        電子郵件: <input className='mail' id='mail' type='email' value={editUser.email} onInput={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                    </div>
                    <div><p>個人簡介:</p><textarea maxLength={100} id='introduction' value={editUser.bio} onInput={(e) => setEditUser({ ...editUser, bio: e.target.value })}></textarea>
                        <pre>{editUser?.bio.length}/100</pre></div>

                    <button onSubmit="">提交</button>
                </div>

            </div>
        </div>
    )
}
