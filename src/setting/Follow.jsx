import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import FollowUser from "./FollowUser";
import { AuthContext } from "../Context/AuthContext";

function Follow() {
  const { AllFriend, lodingChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="follow">
      <div style={{ width: "auto", maxWidth: "400px" }}>
        <div style={{ margin: "5px", padding: "0 15px" }}>
          <h1>朋友</h1>
          <p style={{ color: "rgb(115, 115, 115)" }}>
            {AllFriend?.length}位朋友
          </p>
        </div>
        {!lodingChat ? (
          <div className="follow-site">
            {AllFriend?.map((friend) => (
              <FollowUser chat={friend} user={user} />
            ))}
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
}

export default Follow;
