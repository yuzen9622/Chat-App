import React, { lazy, useEffect, useState } from "react";
import { useFetchLastMessage, useFetchRecipinet } from "../api/api";
import avarter from "../img/user.png";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";
import moment from "moment";
import { AuthContext } from "../Context/AuthContext";

function UserChat({ chat, user }) {
  const { onlineUser, markthisread, isMobile, typingUser, currentChat } =
    useContext(ChatContext);
  const { getAvatar } = useContext(AuthContext);
  const { recipinetUser } = useFetchRecipinet(chat, user);
  const { lastestMessage, NoReadMessages, Loading } = useFetchLastMessage(chat);
  const [Avatar, setAvatar] = useState(null);
  useEffect(() => {
    getAvatar(recipinetUser?._id).then((res) => {
      setAvatar(res || avarter);
    });
  }, [recipinetUser]);
  const isTyping = typingUser.some((uid) => uid.id === recipinetUser?._id);
  const hasUnreadMessages = NoReadMessages?.length > 3;
  const isLastMessageFromUser = lastestMessage?.senderId === user?.id;
  const lastMessageText = lastestMessage?.text || "";

  return (
    <>
      {recipinetUser ? (
        <button
          title={recipinetUser?.name}
          type="button"
          className={`tab ${
            currentChat?.members?.some(
              (userId) => userId === recipinetUser?._id
            )
              ? "active"
              : ""
          }`}
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
                {Avatar ? (
                  <img src={Avatar} alt="" />
                ) : (
                  <div className="img-glimmer-line"></div>
                )}
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
                    {Loading ? (
                      ""
                    ) : (
                      <>
                        {" "}
                        <p
                          className="txt"
                          style={
                            lastestMessage?.senderId === user?.id ||
                            lastestMessage?.isRead
                              ? { fontWeight: "400" }
                              : { fontWeight: "600" }
                          }
                        >
                          {isTyping && "對方輸入中..."}
                          {!isTyping &&
                            hasUnreadMessages &&
                            `${NoReadMessages.length}+則訊息`}
                          {!isTyping &&
                            !hasUnreadMessages &&
                            (isLastMessageFromUser
                              ? lastMessageText !== ""
                                ? `你: ${lastMessageText}`
                                : `你: 已傳送照片`
                              : lastMessageText !== ""
                              ? `${lastMessageText}`
                              : `對方傳送照片`)}
                        </p>
                        <p
                          className="text-time"
                          style={{ fontWeight: "400", fontSize: "10px" }}
                        >
                          •
                        </p>
                        <p className="text-time">
                          {typingUser.some(
                            (uid) => uid.id === recipinetUser?._id
                          )
                            ? "現在"
                            : moment(lastestMessage?.createdAt).fromNow(true) +
                              "前"}
                        </p>
                      </>
                    )}
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
                <div
                  className={
                    lastestMessage?.isRead ||
                    currentChat?._id === lastMessageText?.chat_id
                      ? ""
                      : "point"
                  }
                ></div>
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
