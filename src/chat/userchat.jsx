import React, { lazy, useEffect } from "react";
import { useFetchLastMessage, useFetchRecipinet } from "../api/api";
import avarter from "../img/user.png";

import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";
import moment from "moment";

function UserChat({ chat, user }) {
  const { onlineUser, markthisread, isMobile } = useContext(ChatContext);
  const { recipinetUser } = useFetchRecipinet(chat, user);
  const { lastestMessage, NoReadMessages } = useFetchLastMessage(chat);

  return (
    <>
      {recipinetUser ? (
        <button
          type="button"
          className="tab"
          style={
            isMobile()
              ? { backgroundColor: "transparent", borderRadius: "0" }
              : {}
          }
          onClick={() => {
            markthisread(lastestMessage?.chatId, lastestMessage?.senderId);
          }}
        >
          <div
            className="userlist"
            style={isMobile() ? { justifyContent: "space-between" } : {}}
          >
            <div className="list">
              <div
                className="img-online"
                style={isMobile() ? { marginRight: "20px" } : {}}
              >
                <img
                  src={
                    recipinetUser?.Avatar
                      ? `${url}/users/avatar/${recipinetUser?._id}`
                      : avarter
                  }
                  alt="img"
                />
                <div
                  className={
                    onlineUser?.some(
                      (user) => user.userId === recipinetUser?._id
                    )
                      ? "online"
                      : ""
                  }
                ></div>
              </div>

              <div
                className="user-recip"
                style={isMobile() ? { display: "flex" } : {}}
              >
                <h3>{recipinetUser?.name}</h3>
                {lastestMessage !== undefined ? (
                  <div
                    className="user-text"
                    style={isMobile() ? { alignItems: "center" } : {}}
                  >
                    {
                      <>
                        {" "}
                        <p
                          className="txt"
                          style={
                            lastestMessage?.senderId == user?.id ||
                            lastestMessage?.isRead
                              ? { fontWeight: "400" }
                              : { fontWeight: "600" }
                          }
                        >
                          {NoReadMessages?.length > 3
                            ? `${NoReadMessages?.length}+則訊息`
                            : lastestMessage?.senderId == user?.id
                            ? `你:${lastestMessage?.text}`
                            : `${lastestMessage?.text}`}
                        </p>
                        <p
                          className="text-time"
                          style={{ fontWeight: "400", fontSize: "10px" }}
                        >
                          •
                        </p>
                        <p className="text-time">
                          {moment(lastestMessage?.createdAt).fromNow()}
                        </p>
                      </>
                    }
                  </div>
                ) : (
                  <div
                    className="user-text"
                    style={isMobile() ? { alignItems: "center" } : {}}
                  >
                    <p
                      className="txt"
                      style={{ color: "hsl(207, 91%, 55%)", fontWeight: "600" }}
                    >
                      快來發送訊息
                    </p>
                  </div>
                )}
              </div>
            </div>
            {lastestMessage !== undefined &&
            lastestMessage?.senderId !== user?.id ? (
              <div className="time">
                <div className={lastestMessage?.isRead ? "" : "point"}></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </button>
      ) : (
        <>
          <div className="userlist glimmer-panel">
            <div className="listglimmer-panel">
              <div className="img-online">
                <div className="img-glimmer-line"></div>
              </div>

              <div className="user-recip glimmer-line">
                <div className="user-text glimmer-line"></div>
                <div
                  className="user-text glimmer-line"
                  style={{ marginTop: "5px" }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserChat;
