import { useEffect } from "react";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import useGetUserList from "./useGetUserList";
import { toast } from 'react-toastify';

// Định nghĩa kiểu cho dữ liệu người dùng lưu trữ trong localStorage
interface AuthData {
    username: string;
    reLoginCode: string;
}

const useReLogin = () => {
    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();
    const usernames = useGetUserList(); // Gọi useGetUserList để lấy danh sách người dùng

    const reLogin = async (username: string, code: string) => {
        try {
            if (webSocket) {
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'RE_LOGIN',
                        data: { user: username, code: code }
                    }
                }));

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);

                    if (data.event === 'AUTH' && data.status === 'error' && data.mes === 'User not Login') {
                        toast.error("User is not logged in. Please log in again.");
                    } else if (data.event === 'RE_LOGIN' && data.status === "success") {
                        const authData: AuthData = {
                            username: data.data.username,
                            reLoginCode: data.data.RE_LOGIN_CODE
                        };
                        setAuthUser(authData);

                        localStorage.setItem("user", JSON.stringify(authData));
                        toast.success("Re-login successful!");


                    } else if (data.status === "error") {
                        toast.error(`Error: ${data.mes}`);
                    } else if (data.event === "ACTION_NOT_EXIT") {
                        toast.error(`Chat Error: ${data.mes}`);
                    }
                };
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            try {
                const { username, reLoginCode }: AuthData = JSON.parse(user);
                reLogin(username, reLoginCode);
            } catch (error) {
                console.error("Failed to parse user data from localStorage:", error);
            }
        }
    }, [webSocket, setAuthUser]);

    return { reLogin, usernames };
};

export default useReLogin;
