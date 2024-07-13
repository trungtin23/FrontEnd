import { useState } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext"; // Thay đổi đường dẫn phù hợp
import {useAuthContext} from "../context/AuthContext";
const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { webSocket } = useWebSocket();
    const {setAuthUser} = useAuthContext();
    const login = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            // Gửi yêu cầu đăng nhập thông qua WebSocket
            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'LOGIN',
                    data: { user: username, pass: password }
                }
            }));

            // Lắng nghe kết quả từ server
            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.error) {
                    throw new Error(data.error);
                }

                // Xử lý khi đăng nhập thành công
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);

                // Hiển thị thông báo hoặc thực hiện hành động phù hợp khi đăng nhập thành công
                toast.success("Login successful!");
            };

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
