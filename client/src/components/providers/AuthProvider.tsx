'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// User type definition
type User = {
    id: string;
    name: string;
    email: string;
} | null;

// Auth context type
type AuthContextType = {
    user: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    googleAuth: () => Promise<void>;
    logout: () => Promise<void>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    login: async () => { },
    signUp: async () => { },
    googleAuth: async () => { },
    logout: async () => { },
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is logged in on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Simulate API call to check authentication status
                // Replace with actual API call to your backend
                await new Promise(resolve => setTimeout(resolve, 500));

                // For demo purposes, check localStorage for user data
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Replace with actual API call to your backend
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate successful login
            const newUser = {
                id: '1',
                name: 'Demo User',
                email,
            };

            // Save user data
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    // Sign up function
    const signUp = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            // Replace with actual API call to your backend
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate successful signup
            const newUser = {
                id: '1',
                name,
                email,
            };

            // Save user data
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            console.error('Signup failed:', error);
            throw new Error('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Google authentication function
    const googleAuth = async () => {
        setIsLoading(true);
        try {
            // Replace with actual Google authentication logic
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate successful Google auth
            const newUser = {
                id: '1',
                name: 'Google User',
                email: 'google.user@example.com',
            };

            // Save user data
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            console.error('Google auth failed:', error);
            throw new Error('Google authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        setIsLoading(true);
        try {
            // Replace with actual logout API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // Clear user data
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                signUp,
                googleAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; 