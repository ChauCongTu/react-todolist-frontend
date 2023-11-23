// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
    children: ReactNode;
}

interface AuthContextValue {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    const contextValue: AuthContextValue = {
        isLoggedIn,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider };
