import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { url } from '../servirce'
import avarter from "../img/user.png"
function Profile() {
    const { user } = useContext(AuthContext);
    const updateAvatar = () => {
        var input = document.createElement('input');
        input.type = 'file';

        input.addEventListener('change', function (event) {
            var selectedFile = event.target.files[0];
            var formData = new FormData();
            formData.append('userId', user?.id)
            formData.append('img', selectedFile)

            fetch(`${url}/users/pic/upload/${user?.id}`, { method: "POST", body: formData })
                .then(res => res.json())
                .then((data) => {
                    user.Avatar = data.Avatar
                    const sessionUser = JSON.parse(sessionStorage.getItem("User"));

                    sessionStorage.setItem("User", JSON.stringify(sessionUser))
                    window.location.reload()
                    console.log(sessionUser)
                })

        })
        input.click();
    }

    return (
        <div className="profile">

            <div className="profile-img">
                <img src={user?.Avatar ? `${url}/users/avatar/${user.id}` : avarter} alt="user-avatar" />
            </div>
            <div className="profile-name">
                <h1 className='name'>{user?.name}<button><i class="fa-solid fa-pencil"></i></button></h1>
                <h2 className='mail'>{user?.email}<button><i class="fa-solid fa-pencil"></i></button></h2>
                <pre>Id:{user?.id}</pre>
                <button onClick={updateAvatar}>Change Photo</button>
            </div>
        </div>
    )
}

export default Profile
