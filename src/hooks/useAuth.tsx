import React, { createContext, useContext, useState } from 'react';

type User = {
    firstName: string;
    lastName: string;
    username: string;
};

type AuthContextType = {
    user: User | null;
    register: (newUser: User) => void;
    login: (username: string, password: string) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<{ [key: string]: User }>({});

    const register = (newUser: User) =>
    {
        setUserData({ ...userData, [newUser.username]: newUser });
    };

    const login = (username: string, password: string) =>
    {
        const user = userData[username];
        if (user)
        {
            setUser(user);
            return true;
        }
        return false;
    };

    const logout = () =>
    {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
{
    const context = useContext(AuthContext);
    if (!context)
    {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
