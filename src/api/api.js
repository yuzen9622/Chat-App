import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../Context/ChatContext";
import { url } from "../servirce";

export const useFetchRecipinet = (chat, user) => {
    const [recipinetUser, setRecipinetUser] = useState(null);

    const recipinetId = chat?.members.find((id) => id !== user?.id)

    useEffect(() => {
        const getUser = async () => {

            if (!recipinetId) return null
            try {
                const response = await fetch(`${url}/users/find/${recipinetId}`)
                const data = await response.json()
                setRecipinetUser(data)
            } catch (error) {

            }

        }
        getUser()


    }, [recipinetId])

    return { recipinetUser }
}


export const useFetchLastMessage = (chat) => {
    const { newMessage, notifications, messages } = useContext(ChatContext);
    const [lastestMessage, setLastestMessage] = useState(null);

    useEffect(() => {

        const getMessage = async () => {
            try {
                const response = await fetch(`${url}/msg/${chat?._id}`)
                const data = await response.json()
                const lastmessage = data[data?.length - 1];
                setLastestMessage(lastmessage)
            } catch (error) {

            }

        }
        getMessage()
    }, [newMessage, notifications, messages])

    return { lastestMessage }
}



