import React, { Fragment } from 'react'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {FaEllipsisV, FaVideo} from 'react-icons/fa'
import { HiCheckBadge} from 'react-icons/hi2'
import { getInfo } from '../../../utils'
import { Menu, Transition } from '@headlessui/react'
import { ModalDataContext, UserDataContext } from '../../../context/ContextProvider'
import ModalDetails from '../../modals/ModalDetails'
import moment from 'moment'
import { ChatState } from '../../../context/ChatProvider'

export default function ChatTitle(props) {
    const { info, user } = props
    const { isOpen, setIsOpen } = ModalDataContext()
    const handleViewDetails = () => {
        setIsOpen({ visible: true, target: "details" })
    }
    const auth = UserDataContext()
    const handleEditGroup = () => {
        setIsOpen({ ...isOpen, visible: true, target: "group", action: "edit" })
    }

  return (
    <div className="p-2 flex justify-between items-center bg-white border-b shadow-sm h-full">
            <div className="flex items-center gap-x-2">
                {info.isGroup ? 
                <>
                <div className="flex -space-x-5">
                    {info?.users.slice(0,3)?.map((item,idx)=>(
                        <img key={idx} className="w-9 h-9 border-2 border-white rounded-full dark:border-gray-800" src={item.image} alt=""></img>
                    ))}
                    {(info.users.length - 3) > 0 ? <span className="w-9 h-9 border-2 border-white rounded-full dark:border-gray-800 flex items-center justify-center bg-gray-300">
                        <span className="font-medium text-gray-500 leading-none dark:text-gray-400 text-xs">+{info.users.length - 3}</span>
                    </span> : null }
                </div>
                </> : <img src={!info.isGroup ? getInfo(auth, info.users, "single").image : ''}  className="h-14 w-14 rounded-full border p-1" />
                }
                <div className="grid">
                    <label className="font-semibold" >{ info.isGroup ? <span className="inline-flex items-center gap-1">{ info.chatName } {info.groupAdmin._id === user._id ? <HiCheckBadge size={20} className="text-blue-600" /> : null }  </span>  : getInfo(user, info.users, "single").name  }</label>
                    <p className="text-gray-500 text-sm">{ info.isGroup ?  <span className="text-normal mt-[3px] text-xs text-gray-500" > Created at { moment(info.createdAt).format("MMMM DD, YYYY - hh:mm A") } </span> : getInfo(user, info.users, "single").email  }</p>
                </div>
            </div>
            <div className="flex justify-end gap-x-3 items-center">
                <button className="rounded-full h-10 w-10 flex items-center  hover:bg-gray-200 p-3">
                    <BsFillTelephoneFill size={20} className="text-blue-700" />
                </button>
                <button className="rounded-full h-10 w-10 flex items-center  hover:bg-gray-200 p-3">
                    <FaVideo size={20} className="text-blue-700" />
                </button >
                <div className="text-right">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="rounded-full h-10 w-10 flex items-center  hover:bg-gray-200 p-3" >
                                <FaEllipsisV size={20} className="text-blue-700" />
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
                            {info.isGroup ? (
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                onClick={handleEditGroup}
                                                className={`${
                                                active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                                                } group flex w-full items-center py-2 text-sm px-2`}
                                            >
                                                Edit
                                            </button>
                                            )}
                                        </Menu.Item>
                                    )  : ( 
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                onClick={handleViewDetails}
                                                className={`${
                                                active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                                                } group flex w-full items-center py-2 text-sm px-2`}
                                            >
                                                Profile
                                            </button>
                                            )}
                                        </Menu.Item>
                                    ) }
                                
                            </div>
                        </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            {isOpen.target === "details" ?
                <ModalDetails {...{
                    isOpen,
                    setIsOpen,
                    user: info.isGroup ? info.chatName : getInfo(user, info.users, "all"),
                }} />    
            : null}
    </div>
  )
}
