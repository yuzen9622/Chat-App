import React, { useContext, useEffect, useRef, useState } from "react";
import "./view.css";
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";
import avarter from "../img/user.png";
export default function View() {
  const {
    recpientVideo,
    userCall,
    leaveCall,
    anwserCall,
    callAccepted,
    callEnded,
    getCall,
    callType,
    UserProfile,
  } = useContext(ChatContext);
  console.log(recpientVideo);

  return (
    <div>
      {getCall && !callAccepted ? (
        <button onClick={() => anwserCall(callType)}>接通</button>
      ) : (
        ""
      )}
      <div className="call-view">
        {callAccepted && !callEnded ? (
          <div className="camera">
            <video
              style={{ width: "100%", minWidth: "300px" }}
              ref={recpientVideo}
              autoPlay
              playsInline
              controls
            ></video>
            <p>{UserProfile?.name}</p>
            {!callEnded ? (
              <>
                <button onClick={() => leaveCall()}>離開</button>{" "}
              </>
            ) : (
              ""
            )}
          </div>
        ) : userCall ? (
          <div className="view-profile">
            <img
              src={
                UserProfile?.Avatar
                  ? `${url}/users/avatar/${UserProfile._id}`
                  : avarter
              }
              alt=""
            />
            <p>正在撥打給{UserProfile?.name}...</p>
          </div>
        ) : getCall ? (
          <div className="view-profile">
            <img
              src={
                UserProfile?.Avatar
                  ? `${url}/users/avatar/${UserProfile._id}`
                  : avarter
              }
              alt=""
            />
            <p>{UserProfile?.name}打給你要接嗎</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
