// zustand/useConversation.js

import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    recipient: null, // New state to store the recipient username
    setRecipient: (recipient) => set({ recipient }),
    addMessage: (newMessage) => set((state) => ({
        messages: [...state.messages, newMessage],
    })),
}));

export default useConversation;
