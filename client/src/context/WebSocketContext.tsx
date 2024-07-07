import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WebSocketContextType {
    webSocket: WebSocket | null;
    connectWebSocket: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    const connectWebSocket = () => {
        if (webSocket && (webSocket.readyState === WebSocket.OPEN || webSocket.readyState === WebSocket.CONNECTING)) {
            return; // WebSocket is already connected or connecting
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

    useEffect(() => {
        connectWebSocket();
        return () => {
            webSocket?.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ webSocket, connectWebSocket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
