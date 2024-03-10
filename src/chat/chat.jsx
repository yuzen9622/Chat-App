import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import ChatBoard from "./chatBoard";
import Chatlist from "./chatlist";
import "./chat.css";
import "./RWD.css";
import callsound from "../audio/callsound.mp3";

import { ChatContext } from "../Context/ChatContext";

function Chat() {
  const { user } = useContext(AuthContext);
  const navgitave = useNavigate();
  const { getCall, anwserCall, callType, allUsers, recpientName, leaveCall } =
    useContext(ChatContext);

  useEffect(() => {
    const callsound = document.getElementById("soundcall");
    callsound.volume = 0.0;
    if (!getCall) return;
    callsound.volume = 1.0;
    callsound.play();
    const recipient = allUsers?.find((user) => user._id === recpientName);
    setTimeout(() => {
      const userget = window.confirm(`來自${recipient?.name}的電話`);
      if (userget) {
        anwserCall(callType);
        navgitave("/view");
        callsound.volume = 0.0;
      } else {
        leaveCall();
        callsound.volume = 0.0;
      }
    }, 1000);
  }, [getCall]);

  useEffect(() => {
    document.title = "chatta • 聊天室";
    if (user === null) {
      navgitave("/login");
    }
  }, [user]);

  return (
    <>
      <audio loop src={callsound} id="soundcall"></audio>
      <div className="chat">
        <Chatlist />
        <ChatBoard />
      </div>
    </>
  );
}

export default Chat;
