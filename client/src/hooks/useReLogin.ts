import { useEffect, useState } from "react";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
import useGetUserList from "./useGetUserList";

interface User {
    name: string;
    actionTime: string;
    id: string;
    type: number;
}

const useReLogin = () => {
    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();

    const usernames = useGetUserList();
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
                console.log(data)
                    if (data.event === 'AUTH' && data.status === 'error' && data.mes === 'User not Login') {
                        toast.error("User is not logged in. Please log in again.");
                    } else if (data.event === 'RE_LOGIN' && data.status === "success") {
                        const authData = {
                            username: data.data.username,
                            reLoginCode: data.data.RE_LOGIN_CODE
                        };
                        setAuthUser(authData);
                        localStorage.setItem("user", JSON.stringify(authData));
                        toast.success("Re-login successful!");

                        // Lấy lại danh sách người dùng sau khi tái đăng nhập thành công

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
            const { username, reLoginCode } = JSON.parse(user);
            reLogin(username, reLoginCode);
        }
    }, [webSocket, setAuthUser]);

    return { reLogin };
};

export default useReLogin;
