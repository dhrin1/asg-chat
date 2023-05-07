import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/ContextProvider";

const PrivateRoute = ({ component: component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem("user"));
  return user ? 
    <UserContext.Provider value={user} >
        <Outlet />
    </UserContext.Provider>
   : <Navigate to="/login" />;
};

export default PrivateRoute;