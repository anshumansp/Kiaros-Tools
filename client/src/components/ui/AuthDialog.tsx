'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAuth } from '@/components/providers/AuthProvider';

// Types for the form
type AuthFormData = {
    email: string;
    password: string;
    name?: string;
};

type FormErrors = {
    email?: string;
    password?: string;
    name?: string;
    general?: string;
};

type AuthDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
};

const AuthDialog = ({ isOpen, onClose, initialMode = 'login' }: AuthDialogProps) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [formData, setFormData] = useState<AuthFormData>({
        email: '',
        password: '',
        name: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { darkMode } = useTheme();
    const { login, signUp, googleAuth } = useAuth();

    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling when dialog is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Reset form data when mode changes
    useEffect(() => {
        setFormData({
            email: '',
            password: '',
            name: mode === 'signup' ? '' : undefined,
        });
        setErrors({});
    }, [mode]);

    // Update mode when initialMode prop changes
    useEffect(() => {
        if (initialMode) {
            setMode(initialMode);
        }
    }, [initialMode]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (mode === 'signup' && formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        // Name validation for signup
        if (mode === 'signup' && !formData.name) {
            newErrors.name = 'Name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when typing
        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (mode === 'login') {
                await login(formData.email, formData.password);
                onClose();
            } else {
                if (formData.name) {
                    await signUp(formData.name, formData.email, formData.password);
                    onClose();
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            setErrors({
                ...errors,
                general: error instanceof Error ? error.message : 'Authentication failed. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleAuth = async () => {
        try {
            setIsSubmitting(true);
            await googleAuth();
            onClose();
        } catch (error) {
            console.error('Google auth error:', error);
            setErrors({
                ...errors,
                general: error instanceof Error ? error.message : 'Google authentication failed. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const dialogVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-md"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dialogVariants}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: darkMode ? '#1F2937' : 'white',
                            borderRadius: '1rem',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#E5E7EB',
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                padding: '1.5rem',
                                textAlign: 'center',
                                borderBottom: '1px solid',
                                borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#E5E7EB',
                                position: 'relative',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    color: darkMode ? '#F9FAFB' : '#111827',
                                }}
                            >
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '1.25rem',
                                    right: '1.25rem',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    padding: '0.25rem',
                                    cursor: 'pointer',
                                    color: darkMode ? '#9CA3AF' : '#6B7280',
                                    transition: 'color 150ms',
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.color = darkMode ? '#F9FAFB' : '#111827')}
                                onMouseOut={(e) => (e.currentTarget.style.color = darkMode ? '#9CA3AF' : '#6B7280')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Form */}
                        <div
                            style={{
                                padding: '1.5rem',
                            }}
                        >
                            {/* General error */}
                            {errors.general && (
                                <div
                                    style={{
                                        marginBottom: '1rem',
                                        padding: '0.75rem',
                                        borderRadius: '0.375rem',
                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                        color: '#EF4444',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {errors.general}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Name field (for signup) */}
                                {mode === 'signup' && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label
                                            htmlFor="name"
                                            style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: darkMode ? '#D1D5DB' : '#374151',
                                            }}
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name || ''}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '0.375rem',
                                                border: '1px solid',
                                                borderColor: errors.name ? '#EF4444' : (darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB'),
                                                backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'white',
                                                color: darkMode ? '#F9FAFB' : '#111827',
                                                outline: 'none',
                                                fontSize: '0.875rem',
                                                transition: 'border-color 150ms',
                                            }}
                                        />
                                        {errors.name && (
                                            <p
                                                style={{
                                                    marginTop: '0.25rem',
                                                    fontSize: '0.75rem',
                                                    color: '#EF4444',
                                                }}
                                            >
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Email field */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label
                                        htmlFor="email"
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: darkMode ? '#D1D5DB' : '#374151',
                                        }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid',
                                            borderColor: errors.email ? '#EF4444' : (darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB'),
                                            backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'white',
                                            color: darkMode ? '#F9FAFB' : '#111827',
                                            outline: 'none',
                                            fontSize: '0.875rem',
                                            transition: 'border-color 150ms',
                                        }}
                                    />
                                    {errors.email && (
                                        <p
                                            style={{
                                                marginTop: '0.25rem',
                                                fontSize: '0.75rem',
                                                color: '#EF4444',
                                            }}
                                        >
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password field */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <label
                                            htmlFor="password"
                                            style={{
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: darkMode ? '#D1D5DB' : '#374151',
                                            }}
                                        >
                                            Password
                                        </label>
                                        {mode === 'login' && (
                                            <button
                                                type="button"
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    padding: '0',
                                                    fontSize: '0.75rem',
                                                    color: '#142E54',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Forgot password?
                                            </button>
                                        )}
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                paddingRight: '2.5rem',
                                                borderRadius: '0.375rem',
                                                border: '1px solid',
                                                borderColor: errors.password ? '#EF4444' : (darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB'),
                                                backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'white',
                                                color: darkMode ? '#F9FAFB' : '#111827',
                                                outline: 'none',
                                                fontSize: '0.875rem',
                                                transition: 'border-color 150ms',
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '0.75rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: darkMode ? '#9CA3AF' : '#6B7280',
                                            }}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p
                                            style={{
                                                marginTop: '0.25rem',
                                                fontSize: '0.75rem',
                                                color: '#EF4444',
                                            }}
                                        >
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Submit button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.375rem',
                                        backgroundColor: '#142E54',
                                        color: 'white',
                                        fontWeight: '500',
                                        fontSize: '0.875rem',
                                        border: 'none',
                                        cursor: isSubmitting ? 'default' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1,
                                        position: 'relative',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg
                                                style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem', height: '1rem', width: '1rem' }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    style={{ opacity: 0.25 }}
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    style={{ opacity: 0.75 }}
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    ) : mode === 'login' ? (
                                        'Sign In'
                                    ) : (
                                        'Create Account'
                                    )}
                                </motion.button>

                                {/* Divider */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        margin: '1.5rem 0',
                                    }}
                                >
                                    <div
                                        style={{
                                            flex: 1,
                                            height: '1px',
                                            backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : '#E5E7EB',
                                        }}
                                    ></div>
                                    <span
                                        style={{
                                            padding: '0 0.75rem',
                                            color: darkMode ? '#9CA3AF' : '#6B7280',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        OR
                                    </span>
                                    <div
                                        style={{
                                            flex: 1,
                                            height: '1px',
                                            backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : '#E5E7EB',
                                        }}
                                    ></div>
                                </div>

                                {/* Google button */}
                                <motion.button
                                    type="button"
                                    onClick={handleGoogleAuth}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.375rem',
                                        backgroundColor: 'transparent',
                                        border: '1px solid',
                                        borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB',
                                        color: darkMode ? '#F9FAFB' : '#111827',
                                        fontWeight: '500',
                                        fontSize: '0.875rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" style={{ marginRight: '0.5rem' }}>
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                    Continue with Google
                                </motion.button>
                            </form>

                            {/* Switch auth mode */}
                            <div
                                style={{
                                    marginTop: '1.5rem',
                                    textAlign: 'center',
                                    fontSize: '0.875rem',
                                    color: darkMode ? '#D1D5DB' : '#4B5563',
                                }}
                            >
                                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        padding: '0',
                                        color: '#142E54',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthDialog; 