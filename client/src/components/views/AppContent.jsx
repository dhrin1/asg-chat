import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../../routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const LoadingComponent = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid">
                <h2>Loading...</h2>
            </div>
        </div>
    )
}

export default function AppContent() {
  return (
    <>  
        <ToastContainer />
        <Suspense fallback={<LoadingComponent />}>
            <Routes>
                {routes.map((route, idx)=>{
                    return (
                        route.element && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                element={<route.element />}
                            />
                        )
                    )
                })}
                <Route  />
            </Routes>
        </Suspense>
    </>
    
  )
}
