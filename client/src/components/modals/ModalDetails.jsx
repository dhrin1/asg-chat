import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import moment from "moment"
import { FaCheckCircle } from 'react-icons/fa'

export default function ModalDetails(props) {
    const {isOpen, setIsOpen, user} = props
    const closeModal = () => setIsOpen({ visible: false  })
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
                Information
              </Dialog.Title>
              <div className="my-3 ">
                <div className="inline-flex gap-x-3 items-center border w-full p-2 rounded-md bg-gray-100">
                    <img src={user.image}  className="w-20 h-20 rounded-full p-1 border-2 border-blue-600" />
                    <div className="inline-block">
                        <div className="flex items-center gap-2">
                            <h2 className="font-semibold text-lg text-gray-800">{user.name} </h2> 
                            <FaCheckCircle className="text-blue-600" />
                        </div>
                        <p className="leading-6 text-sm text-gray-700">{user.email}</p>
                    </div>
                </div>
              </div>
              <span className="text-normal mt-[3px] text-sm text-gray-700" > joined access at { moment(user.createdAt).format("MMMM DD, YYYY") } </span>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
