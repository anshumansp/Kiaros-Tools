'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface ButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
    href,
    onClick,
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    type = 'button',
    fullWidth = false,
    style = {},
}) => {
    // Define sizing styles
    const sizeStyles = {
        sm: {
            padding: '0.375rem 0.75rem',
            fontSize: '0.75rem',
        },
        md: {
            padding: '0.5rem 1.25rem',
            fontSize: '0.875rem',
        },
        lg: {
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
        },
    };

    // Common style for both button and link
    const commonStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '2rem',
        fontWeight: '600',
        transition: 'all 300ms',
        textDecoration: 'none',
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        ...sizeStyles[size],
        ...(variant === 'primary'
            ? {
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                boxShadow: '0 2px 5px var(--shadow-color)',
            }
            : {
                backgroundColor: 'transparent',
                color: 'var(--primary-color)',
                border: '2px solid var(--primary-color)',
            }),
        ...style,
    };

    // Hover handlers
    const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
        if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
            e.currentTarget.style.boxShadow = '0 4px 8px var(--shadow-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
        } else {
            e.currentTarget.style.backgroundColor = 'rgba(var(--primary-color-rgb), 0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
        }
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
        if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = 'var(--primary-color)';
            e.currentTarget.style.boxShadow = '0 2px 5px var(--shadow-color)';
            e.currentTarget.style.transform = 'translateY(0)';
        } else {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
        }
    };

    // Motion animation props
    const motionProps = {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
    };

    // If href is provided, render a Link
    if (href) {
        return (
            <motion.div {...motionProps}>
                <Link
                    href={href}
                    style={commonStyle}
                    className={className}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={onClick}
                >
                    {children}
                </Link>
            </motion.div>
        );
    }

    // Otherwise render a button
    return (
        <motion.div {...motionProps}>
            <button
                type={type}
                style={commonStyle}
                className={className}
                onClick={onClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {children}
            </button>
        </motion.div>
    );
};

export default Button; 