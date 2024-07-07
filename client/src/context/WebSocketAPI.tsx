export class WebSocketAPI {
    private socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
    }

    getSocket(): WebSocket {
        return this.socket;
    }

    registerUser(user: string, pass: string) {
        const message = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: { user, pass }
            }
        });
        this.socket.send(message);
    }

    loginUser(user: string, pass: string) {
        const message = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: { user, pass }
            }
        });
        this.socket.send(message);
    }

    sendMessageToRoom(room: string, message: string) {
        const chatMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: { type: 'room', to: room, mes: message }
            }
        });
        this.socket.send(chatMessage);
    }

    sendMessageToUser(user: string, message: string) {
        const chatMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: { type: 'people', to: user, mes: message }
            }
        });
        this.socket.send(chatMessage);
    }

    createRoom(roomName: string) {
        const createRoomMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'CREATE_ROOM',
                data: { name: roomName }
            }
        });
        this.socket.send(createRoomMessage);
    }

    joinRoom(roomName: string) {
        const joinRoomMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'JOIN_ROOM',
                data: { name: roomName }
            }
        });
        this.socket.send(joinRoomMessage);
    }

    getPeopleChatMessages(userName: string, page: number) {
        const getMessagesMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'GET_PEOPLE_CHAT_MES',
                data: { name: userName, page }
            }
        });
        this.socket.send(getMessagesMessage);
    }

    getUserList() {
        const getUserListMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST'
            }
        });
        this.socket.send(getUserListMessage);
    }

    checkUser(userName: string) {
        const checkUserMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'CHECK_USER',
                data: { user: userName }
            }
        });
        this.socket.send(checkUserMessage);
    }

    logout() {
        const logoutMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'LOGOUT'
            }
        });
        this.socket.send(logoutMessage);
    }
}
