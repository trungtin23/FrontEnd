import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/login/Login';



import Home from './pages/home/Home';
import { Toaster } from 'react-hot-toast';
import {useAuthContext} from "./context/AuthContext";
import Register from "./pages/resgister/Register";

const App: React.FC = () => {
    const { authUser } = useAuthContext();

    return (
       <div>
           <Routes>
               <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
               <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
               <Route path='/reg' element={authUser ? <Navigate to='/login' /> : <Register />} />
           </Routes>
           <Toaster />

       </div>


    );
};

export default App;
