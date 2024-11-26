import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { url } from "../servirce";
import avarter from "../img/user.png";
import { Link } from "react-router-dom";

function Profile() {
  const { user, getAvatar } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    getAvatar(user?.id).then((res) => {
      setUserAvatar(res || avarter);
    });
  }, [user, getAvatar]);

  const spliceEmail = (email) => {
    const mailId = email.split("@");
    const id = "@" + mailId[0];
    return id;
  };
  function copy() {
    const Id = document.getElementById("Id");
    const IdBtn = document.getElementById("copy-btn");
    IdBtn.title = "Copied";
    navigator.clipboard.writeText(Id.innerText);
  }
  return (
    <div className="profile">
      {!loading ? (
        <>
          <div className="profile-img">
            <img src={userAvatar && userAvatar} alt="user-avatar" />
          </div>

          <div className="profile-user">
            <div className="profile-alt">
              <h1 className="name" id="name">
                {user?.name}
              </h1>
            </div>
            <div className="profile-alt">
              <h2 className="mail" id="mail">
                {user?.email}
              </h2>
            </div>
            <div className="profile-alt">
              <pre>
                Id:<span id="Id">{spliceEmail(user?.email)}</span>
                <button id="copy-btn" title="Copied" onClick={copy}>
                  <i class="fa-solid fa-copy"></i>
                </button>
              </pre>
            </div>

            <p>
              <span
                readOnly
                style={{
                  border: "none",
                  resize: "none",
                  outline: "none",
                  display: "flex",
                  whiteSpace: "pre-wrap",
                  width: "230px",
                }}
                id="introduction"
              >
                {user.bio ? user.bio : ""}
              </span>
            </p>

            <Link to={"/Edit"}>更改個人資料</Link>
          </div>
        </>
      ) : (
        <div className="loader-chat"></div>
      )}
    </div>
  );
}

export default Profile;
