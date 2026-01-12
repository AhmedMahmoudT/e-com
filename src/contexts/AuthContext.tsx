"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type User = {
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    login: (name: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'taest-auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
            if (storedUser) {
                setUser(JSON.parse(storedUser) as User);
            }
        } catch (error) {
            console.error('Failed to load auth from localStorage:', error);
        }
        setIsHydrated(true);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            try {
                if (user) {
                    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
                } else {
                    localStorage.removeItem(AUTH_STORAGE_KEY);
                }
            } catch (error) {
                console.error('Failed to save auth to localStorage:', error);
            }
        }
    }, [user, isHydrated]);

    const login = (name: string, email: string) => {
        setUser({ name, email });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
