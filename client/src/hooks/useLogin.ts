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
                    console.log(data)
                    if (data.status === "success") {
                        const authData = {
                            username: username,
                            reLoginCode: data.data.RE_LOGIN_CODE
                        };
                        setAuthUser(authData);
                        localStorage.setItem("user", JSON.stringify(authData));
                        toast.success("Login Successful!");
                    } else if (data.status === "error") {
                        toast.error("Username or password is wrong!!!");
                    }
                };
            } else {
                console.warn("WebSocket is not open yet. Waiting to send login request.");
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred during login");
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
