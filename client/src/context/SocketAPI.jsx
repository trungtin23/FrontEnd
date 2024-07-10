// WebSocketAPI.jsx
export class WebSocketAPI {
    constructor(socket) {
        this.socket = socket;
    }

    getSocket() {
        return this.socket;
    }

    registerUser(user, pass) {
        const message = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: { user, pass }
            }
        });
        this.socket.send(message);
    }

    loginUser(user, pass) {
        const message = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: { user, pass }
            }
        });
        this.socket.send(message);
    }

    sendMessageToRoom(room, message) {
        const chatMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: { type: 'room', to: room, mes: message }
            }
        });
        this.socket.send(chatMessage);
    }

    sendMessageToUser(user, message) {
        const chatMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: { type: 'people', to: user, mes: message }
            }
        });
        this.socket.send(chatMessage);
    }

    createRoom(roomName) {
        const createRoomMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'CREATE_ROOM',
                data: { name: roomName }
            }
        });
        this.socket.send(createRoomMessage);
    }

    joinRoom(roomName) {
        const joinRoomMessage = JSON.stringify({
            action: 'onchat',
            data: {
                event: 'JOIN_ROOM',
                data: { name: roomName }
            }
        });
        this.socket.send(joinRoomMessage);
    }

    getPeopleChatMessages(userName, page) {
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

    checkUser(userName) {
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
