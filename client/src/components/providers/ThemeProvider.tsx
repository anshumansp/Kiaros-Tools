'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    // Initialize with false to avoid hydration mismatch
    const [darkMode, setDarkMode] = useState(false);
    // Add a state to track if we're mounted to avoid hydration issues
    const [mounted, setMounted] = useState(false);

    // Only run once after initial render (client-side only)
    useEffect(() => {
        setMounted(true);
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);

        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#f5f5f5';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.style.backgroundColor = '#FFFFFF';
            document.body.style.color = '#000000';
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#f5f5f5';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.style.backgroundColor = '#FFFFFF';
            document.body.style.color = '#000000';
        }
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {mounted ? children : null}
        </ThemeContext.Provider>
    );
} 