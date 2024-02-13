import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { url } from '../servirce'
import avarter from "../img/user.png"
import { useSearchParams } from 'react-router-dom';
function Profile() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const updateAvatar = () => {
        var input = document.createElement('input');
        input.type = 'file';

        input.addEventListener('change', async function (event) {
            var selectedFile = event.target.files[0];
            var formData = new FormData();
            formData.append('userId', user?.id)
            formData.append('img', selectedFile)
            try {
                setLoading(true)
                const response = await fetch(`${url}/users/pic/upload/${user?.id}`, { method: "POST", body: formData })
                const data = await response.json();
                window.location.reload()
                user.Avatar = data.Avatar
                const sessionUser = JSON.parse(sessionStorage.getItem("User"))

                sessionStorage.setItem("User", JSON.stringify(sessionUser))

                setLoading(false)
            } catch (error) {

            }

        })
        input.click();
    }

    const updateProfile = (id) => {
        const profile = document.getElementById(id);
        var input = document.createElement('input');
        input.value = profile.textContent;
        input.type = 'text';
        profile.parentNode.replaceChild(input, profile);
    }
    function copy() {
        const Id = document.getElementById("Id")
        const IdBtn = document.getElementById('copy-btn');
        IdBtn.title = "Copied"
        navigator.clipboard.writeText(Id.innerText)
    }
    return (
        <div className="profile">
            {!loading ? <>
                <div className="profile-img">
                    <img src={user?.Avatar ? `${url}/users/avatar/${user.id}` : avarter} alt="user-avatar" />
                </div>

                <div className="profile-user">
                    <div className='profile-alt'>
                        <h1 className='name' id='name'>{user?.name}</h1><button onClick={() => updateProfile("name")}><i class="fa-solid fa-pencil"></i></button>
                    </div>
                    <div className='profile-alt'>
                        <h2 className='mail' id='mail'>{user?.email}<button onClick={() => updateProfile("mail")}><i class="fa-solid fa-pencil"></i></button></h2>
                    </div>
                    <div className="profile-alt">
                        <pre >Id:<span id='Id'>{user?.id}</span></pre><button id='copy-btn' title='Copied' onClick={copy}><i class="fa-solid fa-copy"></i></button>
                    </div>

                    <p>個人簡介:<span id='introduction'>介紹...</span><button onClick={() => updateProfile("introduction")}><i class="fa-solid fa-pencil"></i></button></p>
                    <button onClick={updateAvatar}>Change Photo</button>
                </div>
            </> : <div className='loader-chat'></div>}
        </div>
    )
}

export default Profile
