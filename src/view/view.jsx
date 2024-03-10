import React, { useContext, useEffect, useRef, useState } from "react";
import "./view.css";
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";
import avarter from "../img/user.png";
import { useNavigate } from "react-router-dom";

export default function View() {
  const {
    recpientVideo,
    userCall,
    leaveCall,
    callAccepted,
    callEnded,
    callType,
    UserProfile,
    userVideo,
  } = useContext(ChatContext);

  return (
    <div>
      <div className="call-view">
        {callAccepted && !callEnded && recpientVideo ? (
          callType ? (
            <>
              <div className="camera">
                <video
                  ref={recpientVideo}
                  autoPlay
                  controls
                  playsInline
                  preload="none"
                ></video>

                <video
                  ref={userVideo}
                  autoPlay
                  playsInline
                  muted
                  preload="none"
                ></video>

                {!callEnded ? (
                  <>
                    <button onClick={() => leaveCall()}>掛斷</button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <div
              className="camera"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <audio
                hidden
                ref={recpientVideo}
                controls
                autoPlay
                preload="metadata"
              ></audio>

              <img
                style={{ borderRadius: "50%", width: "150px" }}
                src={
                  UserProfile?.Avatar
                    ? `${url}/users/avatar/${UserProfile._id}`
                    : avarter
                }
                alt=""
              />

              <p>{UserProfile?.name}</p>
              {!callEnded ? (
                <>
                  <button onClick={() => leaveCall()}>掛斷</button>
                </>
              ) : (
                ""
              )}
            </div>
          )
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
