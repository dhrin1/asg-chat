import { createContext, useContext } from "react";

export const UserContext  = createContext({});
export const ModalContext = createContext({});

export const UserDataContext = () => {
    return useContext(UserContext);
}

export const ModalDataContext = () => {
    return useContext(ModalContext)
}
