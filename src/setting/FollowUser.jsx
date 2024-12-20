import React, { useContext, useEffect, useState } from "react";
import { useFetchRecipinet } from "../api/api";
import { url } from "../servirce";
import avatar from "../img/avatar.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
export default function FollowUser({ chat, user }) {
  const { recipinetUser } = useFetchRecipinet(chat, user);
  const navigate = useNavigate();
  const { getAvatar } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    getAvatar(recipinetUser?._id).then((res) => {
      setUserAvatar(res || avatar);
    });
  }, [recipinetUser, getAvatar]);
  return (
    <>
      {recipinetUser ? (
        <div
          className="follow-user"
          onClick={() => navigate(`/user/${recipinetUser?._id}`)}
        >
          <div className="follow-img">
            <img src={userAvatar && userAvatar} alt="user-avatar" />
          </div>

          <div className="follow-name">
            <p className="wrap">{recipinetUser?.name}</p>
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className=" glimmer-panel-profile"></div>
            <div className=" glimmer-line"></div>
          </div>
        </>
      )}
    </>
  );
}
