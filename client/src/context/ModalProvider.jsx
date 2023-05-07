import React, { useMemo, useState } from 'react'
import { ModalContext } from './ContextProvider'

export default function ModalProvider({children}) {
    const [ isOpen, setIsOpen ] = useState({
        visible: false,
        target: "",
        action: ""
    })
    const modal = useMemo(()=>({isOpen, setIsOpen}), [isOpen, setIsOpen])
  return (
    <ModalContext.Provider value={modal} >
        {children}
    </ModalContext.Provider>
  )
}
