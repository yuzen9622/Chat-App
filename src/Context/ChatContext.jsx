import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, emit, on } from "socket.io-client";
import { url } from "../servirce";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChat] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState();
    const [newMessage, setNewMessage] = useState(null);;
    const [socket, setsocket] = useState(null);
    const [onlineUser, setonlineUser] = useState();
    const [notifications, setNotifications] = useState([]);
    const [allUsers, setAllUsers] = useState([])
    const [searchUser, setSearchUser] = useState(null)
    const [lodingChat, setLodingChat] = useState(true)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const newSocket = io("https://chat-socket-97vj.onrender.com");
        setsocket(newSocket)

        return () => {
            socket.on("disconnect", (res) => {
                setonlineUser(res)
            })
        }
    }, [user]);

    useEffect(() => {
        if (socket === null) return

        socket.emit("addNewUser", user?.id);

        socket.on("getonlineUsers", (res) => {
            setonlineUser(res)


        })

        return () => {
            socket.off("getonlineUsers")
        }
    }, [socket])

    useEffect(() => {
        if (socket === null) return;

        const recipientId = currentChat?.members.find((id) => id !== user?.id);


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
            console.log(ischatOpen)

            if (ischatOpen) {
                markthisread(currentChat?._id, res.senderId)
            } else {
                setNotifications((prev) => [res, ...prev])
            }
        })

        return () => {
            socket.off("getMessage");
            socket.off("getNotification")
        };
    }, [socket, newMessage, currentChat]);

    console.log(messages)
    useEffect(() => {
        if (user) {
            const getUser = async () => {
                const response = await fetch(`${url}/users`)
                const data = await response.json()

                const pChats = await data.filter((u) => {
                    let isChatCreated = false
                    if (user.id === u._id) return false

                    if (userChats) {
                        userChats?.some((chat) => {

                            if (chat.members[0] === u._id || chat.members[1] === u._id) {
                                isChatCreated = true;
                                return true;
                            }
                            return false;

                        })
                    }

                    return !isChatCreated


                })

                setPotentialChats(pChats);
                setAllUsers(data)


            }
            getUser()
        }

    }, [userChats, searchUser])




    useEffect(() => {

        const getUserchat = async () => {

            if (user?.id) {
                try {

                    const response = await fetch(`${url}/chat/${user?.id}`);
                    const data = await response.json();
                    setUserChat(data);
                    setLodingChat(false)
                } catch (error) {
                    console.error('Error fetching user chat:', error);

                }
            }
        }
        getUserchat()
    }, [user, notifications]);

    useEffect(() => {

        const getMessage = async () => {

            try {

                const response = await fetch(`${url}/msg/${currentChat?._id}`)
                const data = await response.json();
                setMessages(data)
                setLoadingUser(false)
            } catch (err) {

            }
        }
        getMessage()
    }, [currentChat, newMessage])


    const updateCurrentChat = useCallback((chat) => {

        if (chat?.members[0] == currentChat?.members[0] || chat?.members[1] == currentChat?.members[1]) return;
        setLoadingUser(true)
        setCurrentChat(chat)

    })

    const sendMessage = useCallback(async (textmessage, sender, currentChatId, isRead) => {

        if (!textmessage) return null
        try {
            const response = await fetch(`${url}/msg`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        chatId: currentChatId,
                        senderId: sender.id,
                        text: textmessage,
                        isRead: isRead
                    }), headers: { "Content-Type": "application/json" }
                })
            const data = await response.json()
            setNewMessage(data)
            setMessages((prev) => [...prev, data])
        } catch (err) {

        }

    }, [])

    const createChat = useCallback((firstId, secondId) => {
        fetch(`${url}/chat`, {
            method: "POST", body: JSON.stringify({
                firstId,
                secondId
            }), headers: { "Content-Type": "application/json" }
        }).then((res) => res.json())
            .then((data) => {
                setUserChat((prev) => [...prev, data]);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])
    const delChat = useCallback((userId, secondId) => {

    })

    const markthisNotificationRead = useCallback((thisNoifications, notifications) => {
        const mNotitfication = notifications.map(el => {
            let notification
            thisNoifications.forEach(n => {
                if (n?.senderId === el?.senderId) {
                    notification = { ...n, isRead: true }
                } else {
                    notification = el
                }
            });
            return notification
        })

        setNotifications(mNotitfication)
    }, [])

    const markthisread = useCallback(async (chatId, senderId) => {
        if (senderId == user.id) return
        if (chatId && senderId) {
            try {
                const response = await fetch(`${url}/msg/read/${chatId}/${senderId}`)
                const data = await response.json()
                console.log(data)
                setMessages(data)
            } catch (error) {

            }
        }
    }, [])

    const search = useCallback((name, userId) => {
        if (name == "") setSearchUser(null);
        fetch(`${url}/users/findname/${name}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data) return

                const pChats = data.filter((u) => {
                    let isChatCreated = false
                    if (userId === u._id) return false



                    return !isChatCreated


                })
                setSearchUser(pChats)

            })
            .catch((err) => {
                setSearchUser(null)
                console.error(err);
            })
    }, [])

    return <ChatContext.Provider value={{
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
        loadingUser
    }}>{children}</ChatContext.Provider>
}