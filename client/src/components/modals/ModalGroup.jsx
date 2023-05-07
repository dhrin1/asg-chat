
import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { getSearch } from '../../helper/chatsHelper'
import { UserDataContext } from '../../context/ContextProvider'
import UsersListCard from '../cards/UsersListCard'
import UserBadge from '../cards/group/UserBadge'
import { createGroup, removeUser, updateGroup } from '../../helper/groupHelper'
import { ChatState } from '../../context/ChatProvider'
import { toast } from 'react-toastify'


export default function ModalGroup(props) {
    const {isOpen, setIsOpen} = props

    const closeModal = () => setIsOpen({ visible: false})

    const user = UserDataContext()
    
    const [group, setGroup] = useState({
        name: "",
        selected: []
    })

    const [search, setSearch] = useState({
        value: "",
        result: [],
        load: false
    })

    const [error, setError] = useState({
        group: ""
    })

    const [load, setLoad] = useState(false)
    
    const { chats, setChats, setContacts, contacts, reload, setReload } = ChatState()

    
    const handleSearch = async (e) => {
        const entry = e.target.value;
        try {
            setSearch({ load: true })
            const data = await getSearch({ keyword: entry, user  })
            setSearch({ load: false, result: data })
        } catch (error) {
            console.log(error.message)
            setSearch({ load: false })
        }
    }

    const handleSave =  async () => {
        const {name, selected} = group
        if(!name || !selected || Object.keys(selected).length === 0) {
            setError({ group: "Please complete all fields" })
        }else{
            if(isOpen.action === "add" ) {
                try {
                    setLoad(true)
                    const data = await createGroup({ name: name, members: JSON.stringify(selected.map((v)=>v._id)), user })
                    setChats([data, ...chats])
                    setContacts(data)
                    setLoad(false)
                    setIsOpen({ visible: false })
                } catch (error) {
                    toast.error(error.message,{
                        theme: "dark"
                    })
                    setLoad(false)
                }
            }else if (isOpen.action === "edit") {

                if(contacts.groupAdmin._id !== user._id){
                    setError({ group: "You are not allowed on admin can modify this." })
                }else{
                    try {
                        setLoad(true)
                        const data = await updateGroup({ id:contacts._id, name: name, members: JSON.stringify(selected.map((v)=>v._id)), user, entry: "name"})
                        setContacts(data)
                        setReload(!reload)
                        setLoad(false)
                        setIsOpen(false)
                        setIsOpen({ visible: false })
                    
                    } catch (error) {
                        toast.error(error.message,{
                            theme: "dark"
                        })
                        setLoad(false)
                    }
                }
            }        
        }
    }

    const handleOnClickUser = async (item) => {
        setError({ group: "" })
        const payload = isOpen.action;
        if(payload === "edit") {
            if(contacts.groupAdmin._id !== user._id){
                setError({ group: "You are not allowed!, Admin only can modify this." })
            }else{
                
                if(contacts.users.find((v)=>v._id === item._id) && isOpen.action === "edit"){
                    setError({ group: "This account in already on the group." })

                }else{
                    if(group.selected.includes(item)) return false;
                    setGroup({ ...group, selected: [...group.selected, item]})

                    setLoad(true)
                    const data = await updateGroup({ id: contacts._id, name: "Hello World", member: item, user, entry: "member"})
                    setContacts(data)
                    setReload(!reload)
                    setLoad(false)
                }
            }
        }else if (payload === "add") {
            if(group.selected.includes(item)) return false;
            setGroup({ ...group, selected: [...group.selected, item]}) 
        }
    }

    const handleRemove = async (entry) => {
        const payload = isOpen.action
        if(payload === "edit") {
            if(contacts.groupAdmin._id !== user._id){
                return setError({ group: "You are not allowed!, Admin only can modify this." })
            } else{
                if(entry._id !== user._id){
                    if(Object.keys(contacts.users).length > 2) {
                        setLoad(true)
                        const data = await removeUser({ id: contacts._id, member: entry, user })
                        setContacts(data)
                        setReload(!reload)
                        setLoad(false)
                    }
                    else{
                        return setError({ group: "Not allowed to remove someone, maximum of 2 members required." })
                    }
                }else{
                    return setError({ group: "You are not allowed to leave the group." })
                }
            }
        } else{
            setGroup({...group, selected: group.selected.filter((a)=>a._id !== entry._id) })
            setError({ group: "" })
        }
    }

    const handleChangeName = (e) => {
        setGroup({...group, name: e.target.value})
    }
    useEffect(()=>{
        if(isOpen.action === "edit") {
            if(Array.isArray(contacts.users)){
                setGroup({...group, name: contacts.chatName, selected: contacts.users })
            }
        }
    },[isOpen.action, setGroup, setContacts, contacts])

    const handleLeaveGroup = async () => {
        try {
            setLoad(true)
            const data = await removeUser({ id: contacts._id, member: user, user })
            setContacts(data)
            setIsOpen({ visible: false, target: "group" })
            setReload(!reload)
            setLoad(false)
        } catch (error) {
            toast.error(error.message,{
                theme: "dark"
            })
            setLoad(false)
        }
        
    }

  return (

    <Transition appear show={isOpen.visible} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {isOpen.action === "add" ? 'Create' : 'Edit' } group
              </Dialog.Title>
              
              <div className="mt-2">
                <label className="font-medium text-gray-800 text-sm">Name</label>
                <input type="text" onChange={handleChangeName} value={group.name} className="w-full p-2 bg-gray-200 rounded-md focus:outline-none active:ring-0" />
              </div>
              <div className="mt-2">
                
                <label className="font-medium text-gray-800 text-sm">Members</label>
                <div className="relative w-full bg-gray-200 rounded-md p-2">
                    <div className="flex-wrap mt-1">
                        {Object.keys(group.selected).length > 0 ? 
                            group.selected.map((item, idx)=>(
                                <UserBadge 
                                    key={idx}
                                    user={item}
                                    onRemove={()=>handleRemove(item)}
                                />
                            ))
                        : null }
                        
                    </div>
                    <input type="text" onChange={handleSearch} className="w-full h-full bg-transparent focus:outline-none active:ring-0" />
                </div>
                {error.group ? <span className="text-xs mt-2 text-red-700">{error.group}</span> : null  }
                
              </div>

              <div className="mt-2 grid">
                { search.result !== undefined && search.result?.slice(0, 4).map((item, idx)=>(
                    <UsersListCard 
                        key={idx}
                        user={item}
                        onClick={()=>handleOnClickUser(item)}
                    />
                ))}
              </div>

              <div className="mt-4 inline-flex gap-x-2">
                <button
                  type="button"
                  disabled={load}
                  className={`inline-flex  justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${load ? 'opacity-40' : 'hover:bg-blue-600' } `}
                  onClick={handleSave}
                >
                  Save
                </button>
                {Object.keys(contacts).length > 0 ? 
                    <button
                    type="button"
                    disabled={load}
                    className={`inline-flex  justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 ${load ? 'opacity-40' : 'hover:bg-gray-400' } `}
                    onClick={handleLeaveGroup}
                >
                    Leave group
                </button>
                : null }
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}