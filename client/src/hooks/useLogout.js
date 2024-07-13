import { useState } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import {useAuthContext} from "../context/AuthContext"; // Đảm bảo đường dẫn đúng


const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { webSocket } = useWebSocket();
    const {setAuthUser} = useAuthContext();

    const logout = async () => {

        setLoading(true);
        try {
            // Gửi yêu cầu đăng nhập thông qua WebSocket
            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'LOGOUT'

                }
            }));

            // Lắng nghe kết quả từ server
            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.error) {
                    throw new Error(data.error);
                }



                localStorage.removeItem("user", JSON.stringify(data));
                setAuthUser(null);



            };

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
