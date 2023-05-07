import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {  ModalDataContext, UserDataContext } from '../../context/ContextProvider';
import { useState } from 'react';

import { getSearch, newChats } from '../../helper/chatsHelper';
import { ChatState } from '../../context/ChatProvider';

import { FaChevronLeft } from 'react-icons/fa'
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai'
import { IoNotifications } from 'react-icons/io5'

import UsersListCard from '../cards/UsersListCard';
import ContactList from '../cards/ContactList';
import ModalGroup from '../modals/modalGroup';



export default function Sidebar() {

    const searchInput = useRef();

    const user = UserDataContext();

    const [keyword, setKeyword] = useState({
        isSearch: false,
        value: ''
    })

    const { chats, setChats, search, setSearch, setContacts, load, setLoad } = ChatState();

    useEffect(()=>{
        if(keyword.isSearch) {
            const doSearch = async ()  => {
                setLoad({ search: true  })
                const data = await getSearch({ keyword: keyword.value, user })
                setSearch(data)
                setLoad({ search: false  })
            } 
            doSearch()
        }
    },[keyword])

    const handleSubmitSearch =  (e) => {
        e.preventDefault();
        const v = searchInput.current.value;
        setKeyword({...keyword, value: v, isSearch: true});
    }   

    const handleBack = () => {
        setKeyword({...keyword, value: '', isSearch: false})
        searchInput.current.value = "";
    } 

    const getAccessChat = async (id) => {
        if(id.trim().length === 0) return;
        const userId = id
        setLoad({connect: true})
        const data = await newChats({ userId, user })
        if(!chats.find((c)=>c._id === data._id)) setChats([data, ...chats])
        setContacts(data)
        setLoad({connect: false })
        setKeyword({...keyword, value: '', isSearch: false})
    }

    const {isOpen, setIsOpen} = ModalDataContext();

    const handleIsGroup = () => {
        setIsOpen({ visible: true, target: "group", action: "add" })
        setContacts([])
    }
    return (
        <>
        <nav className="h-screen bg-white border-l shadow-md px-2 overflow-hidden">
            <div className="grid gap-y-3 my-5 mx-2">
                <div className="flex gap-2">
                <button onClick={handleIsGroup} className="w-full bg-gray-200 hover:bg-gray-300 justify-center rounded-md text-gray-800 h-10 flex items-center gap-x-2 font-semibold">
                    <AiOutlinePlus size={20} />
                    New group
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 px-3 justify-center rounded-md text-gray-800 h-10 flex items-center gap-x-2 font-semibold">
                    <IoNotifications size={20} />
                </button>
                </div>
            
                <h2 className="text-4xl font-semibold">
                    Chats
                </h2>
                <div className="flex justify-start gap-2">
                    {keyword.isSearch ? <button onClick={handleBack} ><FaChevronLeft size={20} /></button> : null}
                    <div className=" bg-gray-200 rounded-md ps-1 w-full">
                        <form onSubmit={handleSubmitSearch} className="relative">
                            <div className="flex items-center">
                                <input type="text" ref={searchInput}  className="w-full bg-transparent p-2 outline-none border-none" placeholder="Search to chats" />
                                <button type="submit" onClick={handleSubmitSearch} className="me-2">
                                    <AiOutlineSearch size={24} /> 
                                </button>
                            </div>
                        </form>
                    </div> 
                </div>
            </div>
            <div className="overflow-y-auto w-full h-[80%]">
                {keyword.isSearch ? 
                    <div className="inline-flex mx-2 items-center gap-x-2 mb-2">
                        <AiOutlineSearch size={25} />
                        <p className="text-sm">Search contacts for "{keyword.value}"</p>
                    </div> 
                    : null 
                }
                { keyword.isSearch ? 
                    load.search || load.connect || load.contact ?
                        <div className="flex justify-center items-center">Loading...</div>
                    : Object.keys(search)?.length === 0 ? 
                        <div className="text-center mx-2 items-center gap-x-2 mb-2">
                            <p className="text-lg text-gray-700">No result</p>
                        </div> 
                        : <div className="grid">
                            {
                                search?.map((item,idx)=>(
                                    <UsersListCard 
                                        key={idx}
                                        user={item}
                                        onClick={()=>getAccessChat(item._id)}
                                    />
                                ))
                            }
                        </div> 
                    : <div className="grid"> <ContactList /> </div> 
                }   
            </div>
        </nav>
        {isOpen.target === "group" ? 
            <ModalGroup 
                {...{
                    isOpen,
                    setIsOpen
                }}
            />
        : null }
        </>
    
  )
}
