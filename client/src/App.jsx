

import axios from "axios";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import DefaultLayout from "./components/pages/DefaultLayout";
import ErrorPage from './components/error/error-page'

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_HOST
  return (
    <>     
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="*" element={<PrivateRoute  />} >
                    <Route path="*" element={<DefaultLayout />} />
                </Route>
                <Route path="*" element={<ErrorPage />}  />
            </Routes>
        </BrowserRouter>
    </>   
  )
}
export default App









