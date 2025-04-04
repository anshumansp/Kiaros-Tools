'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import Button from '@/components/ui/Button';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Payment', href: '/payment' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { darkMode, toggleDarkMode } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.header
            style={{
                position: 'fixed',
                top: '1.5rem',
                left: 0,
                right: 0,
                margin: '0 auto',
                width: isMobile ? '90%' : '75%',
                maxWidth: '1200px',
                zIndex: 1000,
                backgroundColor: darkMode ? 'rgba(24, 24, 27, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '3rem',
                transition: 'all 300ms ease',
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div style={{
                display: 'flex',
                height: '4.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: isMobile ? '1.25rem' : '2rem',
                paddingRight: isMobile ? '1.25rem' : '2rem',
            }}>
                {/* Logo */}
                <motion.div
                    style={{ flexShrink: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <span style={{
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: darkMode ? '#FFFFFF' : '#000000',
                            letterSpacing: '-0.05em'
                        }}>
                            Kia<span style={{ color: '#142E54' }}>ros</span>
                        </span>
                    </Link>
                </motion.div>

                {/* Desktop navigation */}
                <nav style={{
                    display: isMobile ? 'none' : 'flex',
                    gap: '2.5rem'
                }}>
                    {navigation.map((item) => (
                        <motion.div
                            key={item.name}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <Link
                                href={item.href}
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    color: darkMode ? '#E5E7EB' : '#4b5563',
                                    textDecoration: 'none',
                                    transition: 'color 150ms',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#142E54'}
                                onMouseOut={(e) => e.currentTarget.style.color = darkMode ? '#E5E7EB' : '#4b5563'}
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                {/* Action buttons */}
                <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Theme toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={toggleDarkMode}
                        style={{
                            borderRadius: '9999px',
                            padding: '0.5rem',
                            color: darkMode ? '#E5E7EB' : '#6B7280',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{
                            position: 'absolute',
                            width: '1px',
                            height: '1px',
                            padding: '0',
                            margin: '-1px',
                            overflow: 'hidden',
                            clip: 'rect(0, 0, 0, 0)',
                            whiteSpace: 'nowrap',
                            borderWidth: '0'
                        }}>Toggle dark mode</span>
                        {darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </motion.button>

                    {/* Try for Free button using our Button component */}
                    <Button href="/tools/" size="sm">
                        Try for Free
                    </Button>
                </div>

                {/* Mobile menu button */}
                <div style={{ display: isMobile ? 'flex' : 'none' }}>
                    <button
                        type="button"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '0.375rem',
                            padding: '0.625rem',
                            color: darkMode ? '#E5E7EB' : '#4b5563',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>Open main menu</span>
                        <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            backgroundColor: darkMode ? '#1F2937' : 'white',
                            padding: '1rem 1.5rem 1.5rem',
                            borderBottomLeftRadius: '4rem',
                            borderBottomRightRadius: '4rem',
                        }}>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    style={{
                                        display: 'block',
                                        borderRadius: '0.375rem',
                                        padding: '0.75rem 0',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        color: darkMode ? '#E5E7EB' : '#4b5563',
                                        textDecoration: 'none',
                                        marginBottom: '0.25rem',
                                    }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Theme toggle for mobile */}
                            <button
                                type="button"
                                onClick={toggleDarkMode}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '0.75rem 0',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    color: darkMode ? '#E5E7EB' : '#4b5563',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                }}
                            >
                                {darkMode ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                        Light Mode
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                        </svg>
                                        Dark Mode
                                    </>
                                )}
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                                {/* Use Button component for mobile menu actions */}
                                <Button href="/tools" fullWidth={true}>
                                    Get Started
                                </Button>
                                <Button href="/tools/explore" variant="outline" fullWidth={true}>
                                    Try for Free
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
} 