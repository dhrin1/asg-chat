import React from 'react'
import { Link } from 'react-router-dom'
import { getInfo } from '../../../utils'
import { UserDataContext } from '../../../context/ContextProvider'

export default function ChatListItem(props) {
    const auth = UserDataContext()
    const { onClick: handleClick,  data: { _id,  chatName, users, isGroup, latestMessage  }, active } = props
  return (
    <Link to={`t/${_id}`} onClick={handleClick} className={`w-full h-[70px] items-center py-2 px-2 hover:bg-gray-200 rounded-md ${active?`bg-gray-200`:''}`} >
        <div className="flex gap-x-2 items-center">
            {isGroup ?
                <>
                    <div className="flex -space-x-5">
                        {users?.slice(0,3)?.map((item,idx)=>(
                            <img key={idx} className="w-9 h-9 border-2 border-white rounded-full dark:border-gray-800" src={item.image} alt=""></img>
                        ))}
                        {(users.length - 3) > 0 ? <span className="w-9 h-9 border-2 border-white rounded-full dark:border-gray-800 flex items-center justify-center bg-gray-300">
                            <span className="font-medium text-gray-500 leading-none dark:text-gray-400 text-xs">+{users.length - 3}</span>
                        </span> : null }
                    </div>
                </>
                : <img src={!isGroup ? getInfo(auth, users, "single").image : ''}  className="h-14 w-14 rounded-full border p-1" />
            }
            
            <div className="grid ">
                <h2 className="font-semibold mt-1"> { !isGroup ? getInfo(auth, users, "single").name : chatName  }</h2>
                <p className="text-gray-400 text-sm leading-5">
                    {latestMessage && (
                    <>
                        <label className="font-medium text-gray-600">{latestMessage.sender.name} : </label>
                        {latestMessage.content.length > 25
                        ? latestMessage.content.substring(0,25) + "..."
                        : latestMessage.content}
                    </>
                    )}
                </p>
            </div>
        </div>
    </Link> 
  )
}
