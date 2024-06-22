// server.js
const io = require('socket.io')(3000);

// Example users list
const users = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('onchat', (data) => {
        const action = data.action;
        const event = data.data.event;

        if (action === 'onchat') {
            if (event === 'REGISTER') {
                const userData = data.data.data;
                // Handle registration logic here
                if (users.find(user => user.username === userData.user)) {
                    socket.emit('registration_response', { status: 'failure', message: 'Username already exists' });
                } else {
                    users.push({ username: userData.user, password: userData.pass });
                    console.log('User registered:', userData);
                    socket.emit('registration_response', { status: 'success', message: 'Registered successfully' });
                }
            } else if (event === 'LOGIN') {
                const userData = data.data.data;
                // Handle login logic here
                const user = users.find(user => user.username === userData.user && user.password === userData.pass);
                if (user) {
                    console.log('User logged in:', userData);
                    socket.emit('login_response', { status: 'success', message: 'Logged in successfully' });
                } else {
                    socket.emit('login_response', { status: 'failure', message: 'Invalid username or password' });
                }
            }
            // Additional event handling (SEND_CHAT, etc.) can be added here
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

console.log('Socket.io server running on port 3000');
