import { useState } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import {useAuthContext} from "../context/AuthContext"; // Đảm bảo đường dẫn đúng


const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const { webSocket } = useWebSocket();
    const {setAuthUser} = useAuthContext();

    const register = async (username, password) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            // Gửi yêu cầu đăng nhập thông qua WebSocket
            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'REGISTER',
                    data: { user: username, pass: password }
                }
            }));

            // Lắng nghe kết quả từ server
            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.status === "error") {
                    // Kiểm tra nếu lỗi là do trùng username
                    if (data.mes === 'Creating account error, Duplicate Username') {
                        toast.error("Tài khoản đã tồn tại, vui lòng nhập tài khoản khác.");
                    } else {
                        toast.error(data.mes);
                    }
                    return;
                }


                // Xử lý khi đăng nhập thành công
                localStorage.setItem("user", JSON.stringify(data));
                // setAuthUser(data); // Đặt lại authUser nếu cần
                setAuthUser(data);


                // Hiển thị thông báo hoặc thực hiện hành động phù hợp khi đăng nhập thành công
                toast.success("Register successful!");
            };

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
