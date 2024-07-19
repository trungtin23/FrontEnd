import { useState } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {

    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();

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

                toast.success("Đăng xuất thành công!");
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
