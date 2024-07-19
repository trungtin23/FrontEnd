import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import {WebSocketProvider} from "./context/SocketContext";
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(

    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <WebSocketProvider>
                    <App />
                    <ToastContainer
                        position="top-right" // Thay đổi vị trí của thông báo
                        autoClose={1000} // Thay đổi thời gian tự động đóng
                        hideProgressBar={false} // Hiển thị hoặc ẩn thanh tiến trình
                        closeOnClick // Hiển thị nút đóng
                        pauseOnHover
                        draggable
                        pauseOnFocusLoss
                        theme="light" // Hoặc "dark" tùy thuộc vào theme của bạn
                    />
                </WebSocketProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
