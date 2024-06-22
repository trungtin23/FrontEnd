import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from "./pages/resgister/Register";
import Home from './pages/home/Home';

const App = () => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setWebSocket={setWebSocket} />} />
                <Route path="/register" element={<Register setWebSocket={setWebSocket} />} />
                <Route path="/home" element={<Home webSocket={webSocket} />} />
                <Route path="/" element={<Login setWebSocket={setWebSocket} />} />
            </Routes>
        </Router>
    );
};

export default App;
