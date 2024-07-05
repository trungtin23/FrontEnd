import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from "./pages/resgister/Register";
import Home from './pages/home/Home';
import { WebSocketProvider } from './context/WebSocketContext';

const App = () => {
    return (
        <WebSocketProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </WebSocketProvider>
    );
};

export default App;
