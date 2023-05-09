import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatTitle from '../cards/chat/ChatTitle'
import Home from './Home'
import ChatBox from '../cards/chat/ChatBox';
import { ChatState } from '../../context/ChatProvider';
import ChatForm from '../cards/chat/ChatForm';
import { UserDataContext } from '../../context/ContextProvider';
import { getAllMessage, getSendMessage } from '../../helper/messageHelper';
import io from 'socket.io-client';
import animate from '../../../public/assets/animations/typing.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animate,
    redererSettings: {
        preserveAspecRatio: "xMidYMid slice"
    }
}

var socket, selectedChatCompare;


export default function Chats() {

    const [isSocketConnected, setIsSocketConnection] = useState(false);
    const { userId } = useParams();
    const { contacts, setContacts, setNotif, notif, reload, setReload } = ChatState();
    const [load, setLoad] = useState(false)
    const auth = UserDataContext()

    const [message, setMessage] = useState({
        content: "",
        recent: [],
    })

    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)


    const onSend = async (e) => {
        e.preventDefault()
        socket.emit("stop typing", contacts._id); 
        if(message.content ){  
            try {
                setLoad(true)
                setMessage({...message, content: ""})
                const data = await getSendMessage({
                    req: { content: message.content },
                    id: contacts._id,
                    user: auth
                })
                socket.emit("new message", data);
                setMessage({ ...message, content: "",  recent: [...message.recent, data] })
                setReload(!reload)
                setLoad(false)
            } catch (error) {
                console.log(error.message)
                setLoad(false)
            }
        }
    };

    useEffect(()=>{
        socket = io(import.meta.env.VITE_SOCKET)
        socket.emit("setup", auth);
        socket.on("connected", () => setIsSocketConnection(true));
        socket.on("typing", () => setIsTyping(true) );
        socket.on("stop typing", () => setIsTyping(false));
    },[]);



    useEffect(()=>{
        const fetchMsg = async () => {
            if(Object.keys(contacts) !== 0 ){
                setLoad(true)
                const data = await getAllMessage({ chatId: contacts._id,  user: auth })
                setMessage({ ...message, recent: data })
                setLoad(false)
                socket.emit("join chat", contacts._id);
            }
        }
        fetchMsg();
        selectedChatCompare = contacts;
    },[contacts, setContacts, reload])

    

    useEffect(()=>{
        socket.on("message recieved", (newMessageRecieved) => {
            if (selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id ) {
                if (!notif.includes(newMessageRecieved)) {
                  setNotif([newMessageRecieved, ...notif]);
                  setReload(!reload);
                }
            }else{
                if(message.recent) return setMessage({ ...message,  recent: [...message.recent, newMessageRecieved] })
            }
        })
    })

    const onType = (e) => {
        setMessage({ ...message, content: e.target.value});
        if(!isSocketConnected) return;

        if (!typing)  {
            setTyping(true);
            socket.emit("  ", contacts._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", contacts._id);
                setTyping(false);
            }
        }, timerLength);
    }

   return (
    <main className="h-screen ">
        {userId && Object.keys(contacts).length !== 0 ? 
        <div className="h-full ">
            <div className="h-[10%]">
                <ChatTitle 
                    info={contacts}
                    user={auth}
                />
            </div>
            <div className="h-[80%]  overflow-y-auto ">
                <ChatBox 
                    data={message}
                    event={isTyping}
                />
            </div>
            <div className="h-[10%]">
                <ChatForm 
                    send={onSend}
                    type={onType}
                    value={message}      
                />
            </div>
        </div>
        : <Home /> }
    </main>
  )
}
