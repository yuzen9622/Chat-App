import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import ChatBoard from "./chatBoard";
import Chatlist from "./chatlist";
import "./chat.css";
import "./RWD.css";
import { ChatContext } from "../Context/ChatContext";

function Chat() {
  const { user } = useContext(AuthContext);
  const navgitave = useNavigate();
  const { getCall, anwserCall, callType, allUsers, recpientName, leaveCall } =
    useContext(ChatContext);

  useEffect(() => {
    if (!getCall) return;
    console.log(recpientName);
    const recipient = allUsers?.find((user) => user._id === recpientName);

    const userget = window.confirm(`來自${recipient?.name}的電話`);
    if (userget) {
      anwserCall(callType);
      navgitave("/view");
    } else {
      leaveCall();
    }
  }, [getCall]);

  useEffect(() => {
    document.title = "chatta • 聊天室";
    if (user === null) {
      navgitave("/login");
    }
  }, [user]);

  return (
    <>
      <div className="chat">
        <Chatlist />
        <ChatBoard />
      </div>
    </>
  );
}

export default Chat;
