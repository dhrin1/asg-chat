import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMsg, isSender, isSenderUser, setSenderMagin } from '../../../utils'
import { UserDataContext } from '../../../context/ContextProvider'

export default function ChatBox(props) {
    const { data: { recent }, 
        event:  isTyping 
    } = props // content, recent
    const auth = UserDataContext()
    
  return (
    
    <section className="h-full overflow-y-auto">
        <ScrollableFeed className="px-3 py-2">
            { recent && recent.map((item, idx)=> (
                <div className="flex gap-2 " key={idx} >
                    {(isSender(recent, item, idx, auth._id) || isLastMsg(recent, idx, auth._id)) &&
                    ( 
                    <>      
                        <div className="relative group">   
                            <img src={item.sender.image} key={idx} alt={item.sender.name}   data-tooltip-target="tooltip-default" className="w-10 h-10 rounded-full relative" /> 
                            <div className="invisible absolute z-10 w-9 text-white bg-gray-800 p-2 rounded-sm group-hover:visible">dasda</div>
                        </div>
                    </>
                    
                    )}
                    <span 
                        className={`${item.sender._id === auth._id ? `bg-blue-600 text-white` : `bg-gray-200`  }  max-w-[75%] rounded-full text-sm p-2 break-words`}
                        style={{
                            marginLeft: setSenderMagin(recent, item, idx, auth._id),
                            marginTop: isSenderUser(recent, item, idx, auth._id) ? 3 : 5
                        }}
                    >
                        {item.content}
                    </span>    
                </div>
            )) }
            {isTyping ? 
                <i className="ms-12 text-sm">Typing...</i>
            : null }
        </ScrollableFeed>
    </section>
  )
}
