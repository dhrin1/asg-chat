import React, { useEffect } from 'react'
import  { ChatState } from '../../context/ChatProvider'
import { getChats } from '../../helper/chatsHelper'
import { UserDataContext } from '../../context/ContextProvider'
import ChatListItem from './chat/ChatListItem'

export default function ContactList() {
    
    const user = UserDataContext()

    const { contacts, chats, setChats, setContacts,  setLoad, reload, } = ChatState()

    useEffect(()=>{
        const v  = async () => {
            setLoad({ connect: true })
            const data = await getChats({ user  })
            setChats(data)
            setLoad({ connect: false })
        }
        v()
    },[setChats, setContacts, reload])
    
  return (
    <>
    {
         chats?.map((item, idx)=> (
                <ChatListItem 
                    key={idx} 
                    onClick={()=>setContacts(item)}
                    data={item }
                    active={contacts === item}
                />
            
        ))}
    </>
        
    
  )
}
