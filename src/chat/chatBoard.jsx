import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { AuthContext } from "../Context/AuthContext";
import { useFetchRecipinet, useFetchLastMessage } from "../api/api";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import "moment/locale/zh-tw";
import { url } from "../servirce";
import avarter from "../img/user.png";
import { useNavigate } from "react-router-dom";
function ChatBoard() {
  const {
    currentChat,
    loadingUser,
    messages,
    sendMessage,
    onlineUser,
    isMobile,
    updateCurrentChat,
    SendLoading,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [textmessage, setTextmessage] = useState("");
  const [repeatMsg, setRepeatMsg] = useState(null);
  const { recipinetUser, loading } = useFetchRecipinet(currentChat, user);
  const scroll = useRef();

  const { lastestMessage } = useFetchLastMessage(currentChat);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loadingUser) scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat, messages, loadingUser]);
  useEffect(() => {
    setRepeatMsg(null);
  }, [currentChat, SendLoading]);
  const spliceEmail = (email) => {
    const mailId = email.split("@");
    const id = "@" + mailId[0];
    return id;
  };

  const continueFoucs = () => {
    const input = document.getElementById("text-input");
    console.log(input);
    if (input) input.focus();
  };

  return (
    <>
      {isMobile() ? (
        currentChat ? (
          <>
            {!recipinetUser ? (
              <div className="chat-board">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <div className="chat-board" style={{ margin: "0" }}>
                  {!loadingUser && !loading ? (
                    <>
                      <div className="chat-title">
                        {isMobile() ? (
                          <div
                            className="mobile-arrow"
                            style={{ cursor: "pointer", margin: "0 5px 0 0" }}
                            onClick={() => updateCurrentChat(null)}
                          >
                            <i class="fa-solid fa-arrow-left"></i>
                          </div>
                        ) : (
                          ""
                        )}
                        <div
                          className="chat-img"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/user/${recipinetUser?._id}`)
                          }
                        >
                          <img
                            src={
                              recipinetUser?.Avatar
                                ? `${url}/users/avatar/${recipinetUser?._id}`
                                : avarter
                            }
                            alt=""
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
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigate(`/user/${recipinetUser?._id}`)
                          }
                        >
                          {" "}
                          <h1>{recipinetUser.name}</h1>
                          <pre>{spliceEmail(recipinetUser?.email)}</pre>
                        </div>
                      </div>
                      <div className="chat-main">
                        {messages &&
                          messages.map((message, index) => (
                            <div
                              ref={scroll}
                              className={`${
                                message?.senderId === user.id
                                  ? "user-message"
                                  : "other-message"
                              }`}
                              key={index}
                            >
                              {message?.repeatMsg ? (
                                <div className="repeat-msg">
                                  <div className="repeat-user">
                                    <span>
                                      已回覆
                                      {message?.repeatMsg?.senderId === user.id
                                        ? user.name
                                        : recipinetUser?.name}
                                    </span>
                                    <div className="repeat-message">
                                      <span className="text">text</span>
                                    </div>
                                  </div>
                                  <div
                                    className="orign-message"
                                    style={
                                      message?.senderId === user.id
                                        ? {
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            alignItems: "flex-end",
                                          }
                                        : {
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "flex-end",
                                          }
                                    }
                                  >
                                    <div className="message">
                                      <span className="text">
                                        {message.text}
                                      </span>
                                    </div>
                                    <div className="time">
                                      <div className="time">
                                        {message?.senderId === user.id &&
                                        lastestMessage?.isRead
                                          ? "已讀"
                                          : message?.senderId === user.id &&
                                            message?.isRead
                                          ? "已讀"
                                          : ""}
                                      </div>
                                      {moment(message.createdAt)
                                        .locale("zh-tw")
                                        .format("A h:mm")}{" "}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="message">
                                    <span className="text">{message.text}</span>
                                  </div>
                                  <div className="time">
                                    <div className="time">
                                      {message?.senderId === user.id &&
                                      lastestMessage?.isRead
                                        ? "已讀"
                                        : message?.senderId === user.id &&
                                          message?.isRead
                                        ? "已讀"
                                        : ""}
                                    </div>
                                    {moment(message.createdAt)
                                      .locale("zh-tw")
                                      .format("A h:mm")}{" "}
                                  </div>
                                </>
                              )}

                              <div
                                className="tool"
                                style={{ rotate: "270deg" }}
                              >
                                <button onClick={() => setRepeatMsg(message)}>
                                  <i class="fa-solid fa-arrow-turn-up"></i>
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                      {repeatMsg ? (
                        <div className="repeat">
                          <div className="repeat-data">
                            <p>
                              回覆
                              {repeatMsg?.senderId === user.id
                                ? user.name
                                : recipinetUser?.name}
                            </p>
                            <button onClick={() => setRepeatMsg(null)}>
                              x
                            </button>
                          </div>
                          <span>
                            <p>{repeatMsg?.text}</p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="chat-input">
                        {isMobile() ? (
                          <input
                            type="text"
                            id="text-input"
                            className="react-input-emoji--input text-input"
                            placeholder="Messages..."
                            value={textmessage}
                            onInput={(e) => setTextmessage(e.target.value)}
                          />
                        ) : (
                          <InputEmoji
                            keepOpened
                            onChange={setTextmessage}
                            value={textmessage}
                            placeholder="Message..."
                            fontFamily="Helvetica, Arial, sans-serif"
                            cleanOnEnter
                            onEnter={() =>
                              sendMessage(
                                textmessage,
                                user,
                                currentChat._id,
                                false,
                                sendMessage
                              )
                            }
                          />
                        )}

                        {textmessage && (
                          <button
                            className={textmessage == "" ? "btn" : "btn istext"}
                            type="button"
                            onClick={(e) => {
                              sendMessage(
                                textmessage,
                                user,
                                currentChat._id,
                                false,
                                sendMessage
                              );
                              setTextmessage("");
                              continueFoucs();
                            }}
                          >
                            <i class="fa-solid fa-paper-plane"></i>
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="loader"></div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          ""
        )
      ) : (
        <>
          {" "}
          {!recipinetUser ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              No conversation yet...
            </p>
          ) : (
            <>
              <div className="chat-board">
                {!loadingUser && !loading ? (
                  <>
                    <div className="chat-title">
                      {isMobile() ? (
                        <div
                          className="mobile-arrow"
                          style={{ cursor: "pointer" }}
                          onClick={() => updateCurrentChat(null)}
                        >
                          <i class="fa-solid fa-arrow-left"></i>
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className="chat-img"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/user/${recipinetUser?._id}`)}
                      >
                        <img
                          src={
                            recipinetUser?.Avatar
                              ? `${url}/users/avatar/${recipinetUser?._id}`
                              : avarter
                          }
                          alt=""
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
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/user/${recipinetUser?._id}`)}
                      >
                        {" "}
                        <h1>{recipinetUser.name}</h1>
                        <pre>{spliceEmail(recipinetUser?.email)}</pre>
                      </div>
                    </div>
                    <div className="chat-main">
                      {messages &&
                        messages.map((message, index) => (
                          <div
                            ref={scroll}
                            className={`${
                              message?.senderId === user.id
                                ? "user-message"
                                : "other-message"
                            }`}
                            key={index}
                          >
                            {message?.repeatMsg ? (
                              <div className="repeat-msg">
                                <div className="repeat-user">
                                  <span>
                                    已回覆
                                    {message?.repeatMsg?.senderId === user.id
                                      ? message?.senderId === user.id
                                        ? "自己"
                                        : "你"
                                      : message?.senderId === user.id
                                      ? recipinetUser?.name
                                      : "自己"}
                                  </span>
                                  <div className="repeat-message">
                                    <span className="text">
                                      {message?.repeatMsg?.text}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  className="orign-message"
                                  style={
                                    message?.senderId === user.id
                                      ? {
                                          display: "flex",
                                          flexDirection: "row-reverse",
                                          alignItems: "flex-end",
                                        }
                                      : {
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "flex-end",
                                        }
                                  }
                                >
                                  <div className="message">
                                    <span className="text">{message.text}</span>
                                  </div>
                                  <div className="time">
                                    <div className="time">
                                      {message?.senderId === user.id &&
                                      lastestMessage?.isRead
                                        ? "已讀"
                                        : message?.senderId === user.id &&
                                          message?.isRead
                                        ? "已讀"
                                        : ""}
                                    </div>
                                    {moment(message.createdAt)
                                      .locale("zh-tw")
                                      .format("A h:mm")}{" "}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="message">
                                  <span className="text">{message.text}</span>
                                </div>
                                <div className="time">
                                  <div className="time">
                                    {message?.senderId === user.id &&
                                    lastestMessage?.isRead
                                      ? "已讀"
                                      : message?.senderId === user.id &&
                                        message?.isRead
                                      ? "已讀"
                                      : ""}
                                  </div>
                                  {moment(message.createdAt)
                                    .locale("zh-tw")
                                    .format("A h:mm")}{" "}
                                </div>
                              </>
                            )}

                            <div className="tool" style={{ rotate: "270deg" }}>
                              <button onClick={() => setRepeatMsg(message)}>
                                <i class="fa-solid fa-arrow-turn-up"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                    {repeatMsg ? (
                      <div className="repeat">
                        <div className="repeat-data">
                          <p>
                            回覆
                            {repeatMsg?.senderId === user.id
                              ? "自己"
                              : recipinetUser?.name}
                          </p>
                          <button onClick={() => setRepeatMsg(null)}>x</button>
                        </div>
                        <span>
                          <p>{repeatMsg?.text}</p>
                        </span>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="chat-input">
                      {isMobile() ? (
                        <input
                          type="text"
                          className="react-input-emoji--input text-input"
                          id="text-input"
                          placeholder="Messages..."
                          value={textmessage}
                          onInput={(e) => setTextmessage(e.target.value)}
                        />
                      ) : (
                        <InputEmoji
                          keepOpened
                          onChange={setTextmessage}
                          value={textmessage}
                          placeholder="Message..."
                          fontFamily="Helvetica, Arial, sans-serif"
                          cleanOnEnter
                          onEnter={() =>
                            sendMessage(
                              textmessage,
                              user,
                              currentChat._id,
                              false,
                              repeatMsg
                            )
                          }
                        />
                      )}

                      {textmessage && (
                        <button
                          className={textmessage == "" ? "btn" : "btn istext"}
                          type="button"
                          onClick={() => {
                            sendMessage(
                              textmessage,
                              user,
                              currentChat._id,
                              false,
                              repeatMsg
                            );
                            continueFoucs();
                            setTextmessage("");
                          }}
                        >
                          <i class="fa-solid fa-paper-plane"></i>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="loader"></div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ChatBoard;
