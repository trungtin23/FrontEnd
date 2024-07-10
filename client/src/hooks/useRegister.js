import { useState } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext"; // Đảm bảo đường dẫn đúng

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const { registerUser } = useWebSocket();

    const register = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            // Gửi yêu cầu đăng ký thông qua WebSocket
            registerUser(username, password);

            // Lắng nghe kết quả từ server
            // Ví dụ: Tạm thời không cần thiết vì đã được xử lý trong WebSocketProvider

            // Xử lý khi đăng ký thành công (ví dụ: hiển thị thông báo)
            toast.success("Registration successful! Please log in.");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};

export default useRegister;

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
