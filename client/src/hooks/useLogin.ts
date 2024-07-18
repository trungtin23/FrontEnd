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
                    if (data.status === "success") {
                        // Update authUser with username
                        const authData = {
                            username: username,
                            reLoginCode: data.data.RE_LOGIN_CODE // Optionally save reLoginCode if needed
                        };
                        setAuthUser(authData);
                        localStorage.setItem("user", JSON.stringify(authData));
                        console.log(authData.username)
                        toast.success("Login successful!");
                    } else if (data.status === "error") {
                        toast.error(data.mes || "Login error");
                    } else {
                        console.error("Unexpected response from server:", data);
                    }
                };
            } else {
                console.warn("WebSocket is not open yet. Waiting to send login request.");
                // Optionally handle case where WebSocket is not open yet
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
