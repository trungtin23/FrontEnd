import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WebSocketContextType {
    webSocket: WebSocket | null;
    sendMessage: (message: any) => void;
    connectWebSocket: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    const connectWebSocket = () => {
        if (webSocket && (webSocket.readyState === WebSocket.OPEN || webSocket.readyState === WebSocket.CONNECTING)) {
            return;
        }
        const ws = new WebSocket('ws://140.238.54.136:8080/chat/chat');
        setWebSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setWebSocket(null);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    const sendMessage = (message: any) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify(message));
        } else if (webSocket && webSocket.readyState === WebSocket.CONNECTING) {
            webSocket.onopen = () => {
                webSocket.send(JSON.stringify(message));
            };
        } else {
            console.warn('WebSocket is not open or connecting. Unable to send message.');
        }
    };

    useEffect(() => {
        connectWebSocket();
        return () => {
            webSocket?.close();
        };
    }, [webSocket]);

    return (
        <WebSocketContext.Provider value={{ webSocket, sendMessage, connectWebSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
