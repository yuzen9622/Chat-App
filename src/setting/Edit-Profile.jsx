import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { url } from "../servirce";
import avarter from "../img/user.png";
import { useNavigate } from "react-router-dom";
export default function EditProfile() {
  const { user, updateAvatar, updateUser, loadingImg, getAvatar } =
    useContext(AuthContext);
  const navgative = useNavigate();
  if (!user) navgative("/");
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (loadingImg) return;
    getAvatar(user?.id).then((res) => {
      setUserAvatar(res || avarter);
    });
  }, [user, getAvatar, loadingImg]);
  const [editUser, setEditUser] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio ? user.bio : "",
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>編輯個人檔案</h1>
      <div className="edit">
        {!loadingImg ? (
          <div className="edit-user">
            <div className="edit-img">
              {loadingImg || !userAvatar ? (
                <div
                  className="img-glimmer-line"
                  style={{ width: "100px", height: "100px" }}
                ></div>
              ) : (
                <img src={userAvatar && userAvatar} alt="user-avatar" />
              )}

              <button onClick={() => updateAvatar()}>更換照片</button>
            </div>
            <p style={{ color: "red", fontSize: "12px" }}>
              #照片格式:PNG/JPEG,大小&lt;2MB
            </p>
            <div className="edit-alt">
              名稱:{" "}
              <input
                type="text"
                className="name"
                id="name"
                value={editUser.name}
                onInput={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
            </div>
            <div className="edit-alt">
              電子郵件:{" "}
              <input
                className="mail"
                id="mail"
                type="email"
                value={editUser.email}
                onInput={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <p>個人簡介:</p>
              <textarea
                maxLength={100}
                id="introduction"
                value={editUser.bio}
                onInput={(e) =>
                  setEditUser({ ...editUser, bio: e.target.value })
                }
              ></textarea>
              <pre>{editUser?.bio ? editUser.bio.length : 0}/100</pre>
            </div>

            <button
              onClick={() =>
                updateUser(user.id, editUser.name, editUser.email, editUser.bio)
              }
            >
              提交
            </button>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
}
