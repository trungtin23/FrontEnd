import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const useReLogin = () => {
    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();

    const reLogin = async (username: string, code: string) => {
        try {
            if (webSocket) {



            // Send re-login request via WebSocket
            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'RE_LOGIN',
                    data: { user: username, code: code }
                }
            }));

            // Listen for server response
            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.error) {
                    throw new Error(data.error);
                }

                // Handle successful re-login
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);

                toast.success("Re-login successful!");
            };
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const { user: username, code } = JSON.parse(user);
            reLogin(username, code);
        }
    }, [webSocket, setAuthUser]); // Added dependencies to ensure useEffect runs correctly

    return { reLogin };
};

export default useReLogin;
