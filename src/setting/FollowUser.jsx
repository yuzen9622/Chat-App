import React from "react";
import { useFetchRecipinet } from "../api/api";
import { url } from "../servirce";
import avatar from "../img/user.png";
import { useNavigate } from "react-router-dom";
export default function FollowUser({ chat, user }) {
  const { recipinetUser } = useFetchRecipinet(chat, user);
  const navigate = useNavigate();
  return (
    <>
      {recipinetUser ? (
        <div
          className="follow-user"
          onClick={() => navigate(`/user/${recipinetUser?._id}`)}
        >
          <img
            src={
              recipinetUser?.Avatar
                ? `${url}/users/avatar/${recipinetUser?._id}`
                : avatar
            }
            alt=""
          />
          <p>{recipinetUser?.name}</p>
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
