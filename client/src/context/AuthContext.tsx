import React, { createContext, useContext, useState, ReactNode } from "react";


interface AuthContextType {
    authUser: any; //
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<any>(JSON.parse(localStorage.getItem("user") || "null")); // Replace `any` with a more specific type if you have one

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
