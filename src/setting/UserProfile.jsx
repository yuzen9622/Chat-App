import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";
import avarter from "../img/user.png";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserChat from "../chat/userchat";

export default function UserProfile() {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const {
    getUserProfile,
    UserProfile,
    createChat,
    createFriend,
    Friend,
    delFriend,
    loading,
    userChats,
  } = useContext(ChatContext);

  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile(id, user.id);
  }, [id]);

  useEffect(() => {
    if (UserProfile)
      document.title = `${UserProfile?.name}(${UserProfile?.email_id}) • chatta`;
  }, [UserProfile]);
  if (user.id == UserProfile?._id) navigate("/Profile");
  return (
    <div className="profile">
      {UserProfile?._id == id && !loading ? (
        <>
          <div className="profile-img">
            <img
              src={
                UserProfile?.Avatar
                  ? `${url}/users/avatar/${UserProfile._id}`
                  : avarter
              }
              alt="user-avatar"
            />
          </div>

          <div className="profile-user">
            <div className="profile-alt">
              <h1 className="name" id="name">
                {UserProfile?.email_id}
              </h1>
            </div>

            <div className="profile-alt">
              <h2 className="name"> {UserProfile?.name}</h2>
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
                {UserProfile.bio ? UserProfile.bio : ""}
              </span>
            </p>
            {!Friend?.some((user) => user == id) ? (
              <button onClick={() => createFriend(user.id, id)}>
                加入好友
              </button>
            ) : (
              <>
                <button onClick={() => delFriend(user.id, id)}>解除好友</button>
                <button
                  onClick={() => {
                    createChat(user.id, id, userChats);
                    navigate("/chat");
                  }}
                >
                  發送訊息
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="loader-chat"></div>
      )}
    </div>
  );
}
