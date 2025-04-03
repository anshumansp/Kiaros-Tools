'use client';

import { useState } from 'react';
import Link from 'next/link';

const navigation = {
    main: [
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
    ],
    social: [
        {
            name: 'Twitter',
            href: '#',
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: '#',
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        },
    ],
};

export default function Footer() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        // In a real implementation, you'd update the theme in a context or store
        document.documentElement.classList.toggle('dark');
    };

    return (
        <footer style={{
            backgroundColor: 'white',
            borderTop: '1px solid #f3f4f6'
        }}>
            <div style={{
                maxWidth: '80rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                overflow: 'hidden',
                padding: '4rem 1.5rem',
            }}>
                <nav style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }} aria-label="Footer">
                    {navigation.main.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            style={{
                                fontSize: '0.875rem',
                                lineHeight: 1.5,
                                color: '#4B5563',
                                marginLeft: '1rem',
                                marginRight: '1rem',
                                marginBottom: '1rem',
                                textDecoration: 'none',
                                transition: 'color 150ms',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#142E54'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#4B5563'}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2.5rem'
                }}>
                    {navigation.social.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            style={{
                                color: '#9CA3AF',
                                transition: 'color 150ms',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#6B7280'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#9CA3AF'}
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
                            }}>
                                {item.name}
                            </span>
                            <item.icon style={{ height: '1.5rem', width: '1.5rem' }} aria-hidden="true" />
                        </Link>
                    ))}
                </div>

                <div style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        style={{
                            borderRadius: '9999px',
                            padding: '0.375rem',
                            color: '#6B7280',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 150ms',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                    </button>
                </div>

                <p style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    lineHeight: 1.25,
                    color: '#6B7280'
                }}>
                    &copy; {new Date().getFullYear()} Kiaros. All rights reserved.
                </p>
            </div>
        </footer>
    );
} 