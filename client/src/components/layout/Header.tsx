'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                transition: 'all 300ms',
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(8px)' : 'none',
                boxShadow: scrolled ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div style={{
                maxWidth: '80rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: '1rem',
                paddingRight: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    height: '4rem',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* Logo */}
                    <div style={{ flexShrink: 0 }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000000' }}>
                                Kia<span style={{ color: '#142E54' }}>ros</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav style={{
                        display: isMobile ? 'none' : 'flex',
                        gap: '2rem'
                    }}>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#4b5563',
                                    textDecoration: 'none',
                                    transition: 'color 150ms',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = '#142E54'}
                                onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Try Tools button */}
                    <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center' }}>
                        <Link
                            href="/tools"
                            style={{
                                marginLeft: '2rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0.375rem',
                                backgroundColor: '#142E54',
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                                paddingTop: '0.5rem',
                                paddingBottom: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: 'white',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                transition: 'background-color 150ms',
                                textDecoration: 'none',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0e2240'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#142E54'}
                        >
                            Try Tools
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div style={{ display: isMobile ? 'flex' : 'none' }}>
                        <button
                            type="button"
                            style={{
                                margin: '-0.625rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0.375rem',
                                padding: '0.625rem',
                                color: '#4b5563',
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
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div style={{ display: isMobile ? 'block' : 'none' }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '0.5rem 1rem 0.75rem',
                    }}>
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                style={{
                                    display: 'block',
                                    borderRadius: '0.375rem',
                                    padding: '0.5rem 0',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    color: '#4b5563',
                                    textDecoration: 'none',
                                    marginBottom: '0.25rem',
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/tools"
                            style={{
                                display: 'block',
                                width: '100%',
                                borderRadius: '0.375rem',
                                backgroundColor: '#142E54',
                                padding: '0.5rem 1rem',
                                textAlign: 'center',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: 'white',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                marginTop: '1rem',
                                textDecoration: 'none',
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Try Tools
                        </Link>
                    </div>
                </div>
            )}
        </motion.header>
    );
} 