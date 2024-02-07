import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";

export const useFetchRecipinet = (chat, user) => {
    const [recipinetUser, setRecipinetUser] = useState(null);

    const recipinetId = chat?.members.find((id) => id !== user?.id)

    useEffect(() => {
        const getUser = () => {

            if (!recipinetId) return null
            fetch(`${url}/users/find/${recipinetId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {

                        setRecipinetUser(data)

                    }

                })
        }
        getUser()


    }, [recipinetId])

    return { recipinetUser }
}


export const useFetchLastMessage = (chat) => {
    const { newMessage, notifications, messages } = useContext(ChatContext);
    const [lastestMessage, setLastestMessage] = useState(null);

    useEffect(() => {

        const getMessage = () => {

            fetch(`${url}/msg/${chat?._id}`)
                .then((res) => res.json())
                .then((data) => {
                    const lastmessage = data[data?.length - 1];
                    setLastestMessage(lastmessage)
                })

        }
        getMessage()
    }, [newMessage, notifications, messages])

    return { lastestMessage }
}



