import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();

    const login = async (username: string, password: string) => {
        try {
            const success = handleInputErrors(username, password);
            if (!success) return;

            // Check WebSocket ready state before sending login request
            if (webSocket && webSocket.readyState === WebSocket.OPEN) {
                webSocket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'LOGIN',
                        data: { user: username, pass: password }
                    }
                }));

                webSocket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    console.log("Server response:", data); // Log server response
                    if (data.status === "error") {
                        if (data.mes === "Login error, Wrong Username or Password") {
                            toast.error("Bạn đã nhập sai tài khoản hoặc mật khẩu, vui lòng đăng nhập lại!!!");
                        } else {
                            toast.error(data.mes);
                        }
                        return;
                    }
                    localStorage.setItem("user", JSON.stringify(data));
                    setAuthUser(data);

                    toast.success("Login successful!");
                };
            } else {
                console.warn("WebSocket is not open yet. Waiting to send login request.");
                // Optionally handle case where WebSocket is not open yet
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return { login };
};

function handleInputErrors(username: string, password: string) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}

export default useLogin;
