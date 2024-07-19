import { create } from 'zustand';

// Define the shape of the conversation object
// (Not strictly necessary in JavaScript, but helps with documentation)
const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    conversations: [], // Initialize conversations array
    setConversations: (conversations) => set({ conversations }),
    addMessage: (newMessage) => set((state) => ({
        messages: [...state.messages, newMessage],
    })),
    removeConversation: (id) => set((state) => ({
        conversations: state.conversations.filter(convo => convo.id !== id),
    })),
    messages: [],
    setMessages: (messages) => set({ messages }),
    recipient: null,
    setRecipient: (recipient) => set({ recipient }),
}));

export default useConversation;
