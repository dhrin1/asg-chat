import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const ChatContext = createContext({})

export default function ChatProvider({children}) {
    const [chats, setChats] = useState();
    const [search, setSearch] = useState([]);
    const [notif, setNotif] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [load, setLoad] = useState({
        search: false,
        connect: false,
        contact: false
    });
    const [reload, setReload] = useState(false)
    return (
    <ChatContext.Provider value={{ 
        search, 
        setSearch,  
        chats,
        setChats, 
        notif, 
        setNotif, 
        contacts,
        setContacts, 
        load, 
        setLoad,
        reload,
        setReload
         }}>
        {children}
    </ChatContext.Provider>
  )
}

export const ChatState = () => {
    return useContext(ChatContext)
}