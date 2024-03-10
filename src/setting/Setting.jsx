import React, { useContext, useEffect } from "react";
import Profile from "./Profile";
import Follow from "./Follow";
import "./setting.css";
import "./sett_RWD.css";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { useNavigate } from "react-router-dom";
function Setting() {
  const { user } = useContext(AuthContext);
  const navgitave = useNavigate();
  const { allUsers, getCall, callType, leaveCall, anwserCall, recpientName } =
    useContext(ChatContext);

  if (!user) window.location.replace("/");
  useEffect(() => {
    document.title = "個人資料";
  });
  return (
    <div className="sett">
      <Profile />
      <Follow />
    </div>
  );
}

export default Setting;
