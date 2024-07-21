import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
import useConversation from "./zustand/useConversation";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/resgister/Register";
import useReLogin from "./hooks/useReLogin";
import useGetUserList from "./hooks/useGetUserList";

const App: React.FC = () => {
    const { authUser } = useAuthContext(); // Lấy trạng thái đăng nhập từ context
    const { selectedConversation } = useConversation();
    const navigate = useNavigate();
    useEffect(() => {
        // Kiểm tra nếu đã đăng nhập và có selectedConversation

        if (authUser && selectedConversation) {
            const conversationName = selectedConversation.name;
            const conversationType = selectedConversation.type;
            selectedConversation.type ===1  ? navigate(`/group/${conversationName}`) : navigate(`/people/${conversationName}`);

        }
    }, [authUser, selectedConversation, navigate]);

    return (
        <div>
            <Routes>
                {/* Nếu đã đăng nhập, điều hướng đến trang Home, ngược lại điều hướng đến trang Login */}
                <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={authUser ? <Navigate to="/login" /> : <Register />} />
                {/* Route cho từng conversation */}
                <Route path="/people/:conversationName" element={<Home />} />
                <Route path="/group/:conversationName" element={<Home />} />
            </Routes>
            <Toaster />
        </div>
    );
};



export default App;
