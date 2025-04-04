'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const navigation = {
    main: [
        { name: 'Home', href: '/' },
        { name: 'Tools', href: '/tools' },
        { name: 'Contact', href: '/contact' },
        { name: 'About', href: '/about' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
    ],
    features: [
        { name: 'PDF Tools', href: '/tools/pdf' },
        { name: 'Image Converter', href: '/tools/images' },
        { name: 'Text Tools', href: '/tools/text' },
        { name: 'Calculator', href: '/tools/calculator' },
        { name: 'File Tools', href: '/tools/files' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Support', href: '/support' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
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
        {
            name: 'LinkedIn',
            href: '#',
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            href: '#',
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
        },
    ],
};

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: 'var(--background-secondary)',
            borderTop: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--tertiary-cream) 0%, rgba(255, 255, 255, 0) 70%)',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--primary-color) 0%, rgba(255, 255, 255, 0) 70%)',
                zIndex: 0
            }} />

            <div style={{
                maxWidth: '80rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingTop: '5rem',
                paddingBottom: '2rem',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    marginBottom: '4rem'
                }}>
                    {/* Logo and About */}
                    <div>
                        <Link href="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                            <span style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-color)', letterSpacing: '-0.05em' }}>
                                Kia<span style={{ color: 'var(--primary-color)' }}>ros</span>
                            </span>
                        </Link>
                        <p style={{
                            marginTop: '1.5rem',
                            fontSize: '0.875rem',
                            lineHeight: 1.5, 
                            color: 'var(--text-secondary)',
                            maxWidth: '20rem'
                        }}>
                            Premium tools designed to streamline your workflow and boost productivity.
                            Simple, efficient, and ready when you need them.
                        </p>
                <div style={{
                            marginTop: '1.5rem',
                    display: 'flex',
                            gap: '1rem'
                }}>
                    {navigation.social.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                color: 'var(--text-secondary)',
                                transition: 'color 150ms',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
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
                            <item.icon style={{ height: '1.25rem', width: '1.25rem' }} aria-hidden="true" />
                        </motion.a>
                    ))}
                        </div>
                    </div>

                    {/* Tools Links */}
                    <div>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--text-color)',
                            marginBottom: '1.25rem'
                        }}>
                            Popular Tools
                        </h3>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            {navigation.features.map((item) => (
                                <li key={item.name} style={{ marginBottom: '0.75rem' }}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Link
                                            href={item.href}
                                            style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                transition: 'color 150ms',
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--text-color)',
                            marginBottom: '1.25rem'
                        }}>
                            Company
                        </h3>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            {navigation.company.map((item) => (
                                <li key={item.name} style={{ marginBottom: '0.75rem' }}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Link
                                            href={item.href}
                                            style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                transition: 'color 150ms',
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--text-color)',
                            marginBottom: '1.25rem'
                        }}>
                            Legal
                        </h3>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            {navigation.legal.map((item) => (
                                <li key={item.name} style={{ marginBottom: '0.75rem' }}>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Link
                                            href={item.href}
                                            style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                transition: 'color 150ms',
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--text-color)',
                            marginBottom: '1.25rem'
                        }}>
                            Stay updated
                        </h3>
                        <p style={{
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            color: 'var(--text-secondary)',
                            marginBottom: '1rem'
                        }}>
                            Get notifications about new tools and features
                        </p>
                        <form style={{ display: 'flex', gap: '0.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="email-address" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Your email"
                                    style={{
                                        width: '100%',
                                        borderRadius: '0.375rem',
                                        border: '1px solid var(--border-color)',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: 'var(--background-color)',
                                        color: 'var(--text-color)',
                                        boxShadow: '0 1px 2px 0 var(--shadow-color)',
                                    }}
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                style={{
                                    borderRadius: '0.375rem',
                                    backgroundColor: 'var(--primary-color)',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 150ms',
                        }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                <p style={{
                        fontSize: '0.875rem',
                    lineHeight: 1.25,
                        color: 'var(--text-secondary)'
                }}>
                    &copy; {new Date().getFullYear()} Kiaros. All rights reserved.
                </p>

                    <nav style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                    }} aria-label="Footer">
                        {navigation.main.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                style={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.5,
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 150ms',
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
} 
