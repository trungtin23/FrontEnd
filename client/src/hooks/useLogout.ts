import { useState } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const useLogout = () => {

    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const logout = async () => {

        try {
           if (webSocket) {


            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'LOGOUT'
                }
            }));

            // Listen for response from server
            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.error) {
                    throw new Error(data.error);
                }

                // Clear user data from localStorage and context
                localStorage.removeItem("user");
                setAuthUser(null);
                navigate('/login'); // Điều hướng về trang đăng nhập sau khi đăng xuất

                toast.success("Logout successful!");

            };
           }
        } catch (error: any) { // Catch-all type for error handling
            toast.error(error.message);
        } finally {

        }
    };

    return {  logout };
};

export default useLogout;
