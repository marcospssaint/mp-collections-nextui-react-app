import React, { createContext, useContext, useState } from 'react';

import * as api from '../services/api';

interface AuthContextData {
    signed: boolean;
    username: string | null;
    login(user: object): Promise<void>;
    logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [username, setUsername] = useState<string | null>(null);

    async function login(userData: object) {
        const response = (await api.post(userData));
        if (response.data.status === 200) {
            setUsername(response.data.username);
        } else {
            throw new Error("Username invalid!");
        }
    }

    function logout() {
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={{ signed: Boolean(username), username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export default AuthContext;