import { useState } from "react";
import toast from "react-hot-toast";
import { useWebSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const useRegister = () => {
    const { webSocket } = useWebSocket();
    const { setAuthUser } = useAuthContext();

    const register = async (username: string, password: string) => {
        const success = handleInputErrors(username, password);
        if (!success) return;

        try {
           if (webSocket) {


            webSocket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'REGISTER',
                    data: { user: username, pass: password }
                }
            }));


            webSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.status === "error") {
                    if (data.mes === 'Creating account error, Duplicate Username') {
                        toast.error("Tài khoản đã tồn tại, vui lòng nhập tài khoản khác.");
                    } else {
                        toast.error(data.mes);
                    }
                    return;
                }


                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);

                toast.success("Register successful!");
            };
           }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return { register };
};

export default useRegister;

function handleInputErrors(username: string, password: string): boolean {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
