import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const useReLogin = () => {
    const [loading, setLoading] = useState(false);
    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();

    const reLogin = async (username, code) => {
        try {
            setLoading(true);
            // Gửi yêu cầu re-login thông qua WebSocket
            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'RE_LOGIN',
                    data: { user: username, code: code }
                }
            }));

            // Lắng nghe kết quả từ server
            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.error) {
                    throw new Error(data.error);
                }

                // Xử lý khi re-login thành công
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);

                // Hiển thị thông báo hoặc thực hiện hành động phù hợp khi re-login thành công
                toast.success("Re-login successful!");
            };

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const { user: username, code } = JSON.parse(user);
            reLogin(username, code);
        }
    }, []);

    return { loading, reLogin };
};

export default useReLogin;
