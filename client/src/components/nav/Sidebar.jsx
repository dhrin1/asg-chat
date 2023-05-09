import React, { useEffect, useRef, Fragment } from 'react'
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

import { Menu, Transition } from '@headlessui/react'



export default function Sidebar() {

    const searchInput = useRef();

    const user = UserDataContext();

    const [keyword, setKeyword] = useState({
        isSearch: false,
        value: ''
    })

    const { chats, setChats, search, setSearch, setContacts, load, setLoad, notif, setNotif } = ChatState();

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

    const handleClickNotif = (item) => {
        setContacts(item.chat)
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
                <Menu as="div" className="relative inline-block text-end">
                    <div>
                        <Menu.Button className="bg-gray-200 hover:bg-gray-300 px-3 justify-center rounded-md text-gray-800 h-10  gap-x-2 font-semibold relative inline-block" >
                            <IoNotifications size={20} />
                            <label className="absolute ms-2 rounded-full bg-green-500 text-white font-medium w-4 h-4 text-center ">
                                <p className="text-xs">{notif.length}</p>
                            </label>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                            
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {notif.length > 0 ?
                            notif.map((item,idx)=>(
                                <Menu.Item key={idx}  >
                                    {({ active }) => (
                                        <>
                                        <button      
                                            onClick={()=>handleClickNotif(item)}  
                                            className={`${
                                                active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                                            } group grid w-full items-center py-2 text-xs px-2`}
                                        >
                                            {item.sender.name}: {item.content}
                                        </button>
                                        </>
                                    )}
                                    
                                </Menu.Item>
                            ))
                            
                            : <Menu.Item>
                            {({ active }) => (
                                <button        
                                    className={`${
                                        active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                                    } group flex w-full items-center py-2 text-sm px-2`}
                                >
                                    No available notification
                                </button>
                            )}
                        </Menu.Item> }
                            </div>
                        </Menu.Items>
                        </Transition>
                    </Menu>
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
