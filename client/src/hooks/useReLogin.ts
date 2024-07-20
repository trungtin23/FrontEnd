import { useEffect } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import useGetUserList from "./useGetUserList";

const useReLogin = () => {
    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();
    const userList  = useGetUserList(); // Giả sử bạn có setter cho danh sách người dùng

    const reLogin = async (username: string, code: string) => {
        try {
            if (webSocket) {
                // Gửi yêu cầu đăng nhập lại qua WebSocket
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'RE_LOGIN',
                        data: { user: username, code: code }
                    }
                }));

                // Lắng nghe phản hồi từ server
                webSocket.onmessage = async (event) => {
                    const data = JSON.parse(event.data);

                    if (data.error) {
                        throw new Error(data.error);
                    }

                    // Cập nhật thông tin người dùng và lưu vào localStorage
                    localStorage.setItem("user", JSON.stringify(data));
                    setAuthUser(data);

                    // Gửi yêu cầu để lấy danh sách người dùng
                    webSocket.send(JSON.stringify({
                        action: 'onchat',
                        data: {
                            event: 'GET_USER_LIST'
                        }
                    }));

                    // Lắng nghe phản hồi danh sách người dùng
                    webSocket.onmessage = (event) => {
                        const userListData = JSON.parse(event.data);

                        if (userListData.error) {
                            throw new Error(userListData.error);
                        }


                    };
                };
            }
        } catch (error: any) {

        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const { user: username, code } = JSON.parse(user);
            reLogin(username, code);
        }
    }, [webSocket, setAuthUser]); // Thêm setUserList vào dependencies để useEffect chạy đúng

    return { reLogin };
};

export default useReLogin;
