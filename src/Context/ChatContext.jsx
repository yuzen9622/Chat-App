import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, emit, on, Socket } from "socket.io-client";
import { url } from "../servirce";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChat] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setsocket] = useState(null);
  const [onlineUser, setonlineUser] = useState();
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  const [lodingChat, setLodingChat] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [UserProfile, setUserProfile] = useState(null);
  const [userprofileChat, setUserProfileChat] = useState(null);
  const [SendLoading, setSendLoading] = useState(false);
  const [Friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(false);
  const [AllFriend, setAllFriend] = useState(null);
  const [isHidden, setHidden] = useState(false);
  const [Typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState([]);
  useEffect(() => {
    const newSocket = io("https://chat-socket-97vj.onrender.com");
    setsocket(newSocket);

    return () => {
      newSocket.disconnect((res) => {
        setonlineUser(res);
      });
      newSocket.off("disconnect");
    };
  }, [user, isHidden]);

  useEffect(() => {
    if (socket === null) return;
    if (document.hidden) return;
    socket.emit("addNewUser", user?.id);

    socket.on("getonlineUsers", (res) => {
      setonlineUser(res);
    });

    return () => {
      socket.off("getonlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    if (!user?.id) return;
    const id = user?.id;
    const status = Typing;
    const recipientId = currentChat?.members.find((id) => id !== user?.id);
    socket.emit("typing", { id, recipientId, status });

    socket.on("userTyping", (res) => {
      var typingdata = [...typingUser];
      if (res.istype) {
        setTypingUser((prev) => [...prev, res]);
      } else {
        var data = typingdata.filter((user) => user?.id !== res.id);
        setTypingUser(data);
      }
    });
  }, [socket, Typing]);

  const updateTyping = useCallback((status) => {
    setTyping(status);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members.find((id) => id !== user?.id);
    if (!recipientId) return;
    if (recipientId) {
      socket.emit("sendMessage", { ...newMessage, recipientId });
    }
  }, [socket, newMessage, currentChat]);

  useEffect(() => {
    if (socket === null) return;

    const handleReceivedMessage = (res) => {
      console.log(res);
      if (currentChat?._id === res.chatId) {
        setMessages((prev) => [...prev, res]);
      }
    };

    socket.on("getMessage", handleReceivedMessage);
    socket.on("getNotification", (res) => {
      const ischatOpen = currentChat?.members.some((id) => id === res.senderId);

      if (ischatOpen) {
        markthisread(currentChat?._id, res.senderId);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, newMessage, currentChat]);

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const response = await fetch(`${url}/users`);
        const data = await response.json();

        const pChats = await data.filter((u) => {
          let isChatCreated = false;
          if (user.id === u._id) return false;

          if (userChats) {
            userChats?.some((chat) => {
              if (chat.members[0] === u._id || chat.members[1] === u._id) {
                isChatCreated = true;
                return true;
              }
              return false;
            });
          }

          return !isChatCreated;
        });

        setPotentialChats(pChats);
        setAllUsers(data);
      };
      getUser();
    }
  }, [userChats, searchUser]);

  useEffect(() => {
    const getUserchat = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`${url}/chat/${user?.id}`);
          const data = await response.json();
          setUserChat(data);
          setLodingChat(false);
        } catch (error) {
          console.error("Error fetching user chat:", error);
        }
      }
    };
    getUserchat();
  }, [user, notifications, AllFriend]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch(`${url}/msg/${currentChat?._id}`);
        const data = await response.json();
        setMessages(data);
        setLoadingUser(false);
      } catch (err) {}
    };
    getMessage();
  }, [currentChat, newMessage]);

  const updateCurrentChat = useCallback((chat) => {
    const recipientId = currentChat?.members.find((id) => id !== user?.id);
    if (chat?.members[0] == recipientId || chat?.members[1] == recipientId)
      return;
    setLoadingUser(true);
    setNewMessage(null);
    setMessages(null);
    setCurrentChat(chat);
  });

  const sendMessage = useCallback(
    async (textmessage, sender, currentChatId, isRead, repeatmsg) => {
      if (!textmessage) return null;
      try {
        setSendLoading(true);
        const response = await fetch(`${url}/msg`, {
          method: "POST",
          body: JSON.stringify({
            chatId: currentChatId,
            senderId: sender.id,
            text: textmessage,
            isRead: isRead,
            repeatmsg: repeatmsg,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setNewMessage(data);
        setMessages((prev) => [...prev, data]);
        setSendLoading(false);
      } catch (err) {}
    },
    []
  );

  const createChat = useCallback((firstId, secondId, newuserChat) => {
    console.log(newuserChat);
    fetch(`${url}/chat`, {
      method: "POST",
      body: JSON.stringify({
        firstId,
        secondId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentChat(data);

        if (newuserChat?.find((user) => user._id === data._id) === undefined) {
          setUserChat((prev) => [...prev, data]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const delChat = useCallback(async (userId, secondId) => {
    try {
      const response = await fetch(`${url}/chat/delete/${userId}/${secondId}`);
      const data = await response.json();
      setUserChat(data);
      setCurrentChat(null);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const markthisNotificationRead = useCallback(
    (thisNoifications, notifications) => {
      const mNotitfication = notifications.map((el) => {
        let notification;
        thisNoifications.forEach((n) => {
          if (n?.senderId === el?.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = el;
          }
        });
        return notification;
      });

      setNotifications(mNotitfication);
    },
    []
  );

  const markthisread = useCallback(async (chatId, senderId) => {
    if (senderId == user.id) return;
    if (chatId && senderId) {
      try {
        const response = await fetch(`${url}/msg/read/${chatId}/${senderId}`);
        const data = await response.json();

        setMessages(data);
      } catch (error) {}
    }
  }, []);

  const search = useCallback((name, userId) => {
    if (name == "") return setSearchUser(null);
    fetch(`${url}/users/findname/${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        const pChats = data.filter((u) => {
          let isChatCreated = false;
          if (userId === u._id) return false;

          return !isChatCreated;
        });
        setSearchUser(pChats);
      })
      .catch((err) => {
        setSearchUser(null);
        console.error(err);
      });
  }, []);

  const getUserProfile = useCallback(async (userId, secondId) => {
    if (!userId) return;

    try {
      if (secondId) {
        const chatres = await fetch(`${url}/chat/find/${userId}/${secondId}`);
        const chatData = await chatres.json();
        setUserProfileChat(chatData[0]);
      }
      const response = await fetch(`${url}/users/find/${userId}`);
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {}
  }, []);

  const isMobile = useCallback(() => {
    const isMobile = [
      "Android",
      "webOS",
      "iPhone",
      "iPad",
      "iPod",
      "BlackBerry",
      "IEMobile",
      "Opera Mini",
    ].some((keyword) => navigator.userAgent.includes(keyword));
    return isMobile;
  }, []);

  const createFriend = useCallback(async (member1, member2) => {
    if (!member1 && !member2) return;
    try {
      setLoading(true);
      const response = await fetch(`${url}/friend/create`, {
        method: "POST",
        body: JSON.stringify({
          firstId: member1,
          secondId: member2,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const formattedData = await data.members?.find((id) => id !== user.id);
      console.log(formattedData);
      setFriend((prev) => [...prev, formattedData]);
      setAllFriend((prev) => [...prev, data]);
      setLoading(false);
    } catch (error) {}
  }, []);
  const delFriend = useCallback(async (member1, member2) => {
    setLoading(true);
    const response = await fetch(`${url}/friend/delete`, {
      method: "POST",
      body: JSON.stringify({
        firstId: member1,
        secondId: member2,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const formattedData = await data?.map((entry) =>
      entry.members?.find((id) => id !== user.id)
    );
    setAllFriend(data);
    setFriend(formattedData);
    setCurrentChat(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const response = await fetch(`${url}/friend/${user.id}`);
        const data = await response.json();
        const formattedData = await data?.map((entry) =>
          entry.members?.find((id) => id !== user.id)
        );
        setAllFriend(data);
        setFriend(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, [UserProfile]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        sendMessage,
        onlineUser,
        newMessage,
        notifications,
        allUsers,
        markthisNotificationRead,
        search,
        searchUser,
        markthisread,
        lodingChat,
        loadingUser,
        isMobile,
        delChat,
        getUserProfile,
        UserProfile,
        userprofileChat,
        SendLoading,
        createFriend,
        Friend,
        delFriend,
        AllFriend,
        loading,
        updateTyping,
        typingUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
