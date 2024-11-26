import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";
import { AuthContext } from "../Context/AuthContext";

export const useFetchRecipinet = (chat, user) => {
  const [recipinetUser, setRecipinetUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const recipinetId = chat?.members.find((id) => id !== user?.id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipinetId) return null;
      try {
        setLoading(true);
        const response = await fetch(`${url}/users/find/${recipinetId}`);
        const data = await response.json();
        setRecipinetUser(data);
        setLoading(false);
      } catch (error) {}
    };
    getUser();
  }, [recipinetId]);

  return { recipinetUser, loading };
};

export const useFetchLastMessage = (chat) => {
  const { user } = useContext(AuthContext);
  const { newMessage, notifications, messages } = useContext(ChatContext);
  const [lastestMessage, setLastestMessage] = useState(null);
  const [NoReadMessages, setNoReadMessage] = useState(null);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await fetch(`${url}/msg/${chat?._id}/10`);
        let data = await response.json();
        data = data?.messages;
        const lastmessage = data[data?.length - 1];
        const noReadMessage = data?.filter(
          (msg) => msg?.isRead !== true && msg?.senderId !== user.id
        );
        setLastestMessage(lastmessage);
        setNoReadMessage(noReadMessage);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getMessage();
  }, [newMessage, notifications, messages]);

  return { lastestMessage, NoReadMessages, Loading };
};
