'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import Link from 'next/link';

// Tool cards data
const tools = [
    {
        id: 'pdf-merger',
        name: 'PDF Merger',
        description: 'Combine multiple PDF files into a single document with our simple drag-and-drop tool.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
        ),
        features: ['Drag & drop interface', 'Reorder and organize pages', 'Adjust page orientation', 'Cloud storage integration', 'Secure file handling'],
        comingSoon: false,
    },
    {
        id: 'resume-maker',
        name: 'Resume Maker',
        description: 'Create professional, eye-catching resumes with our AI-powered templates and expert recommendations.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <path d="M9 12h6"></path>
                <path d="M9 16h6"></path>
            </svg>
        ),
        features: ['Professional templates', 'AI writing suggestions', 'Industry-specific keywords', 'Custom styling options', 'Export to PDF, DOCX, or TXT'],
        comingSoon: false,
    },
    {
        id: 'image-editor',
        name: 'Image Editor',
        description: 'Advanced image editing with filters, adjustments, and professional enhancements for your photos.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
        ),
        features: ['Professional filters', 'Background removal', 'Smart adjustments', 'Format conversion', 'Batch processing'],
        comingSoon: true,
    },
    {
        id: 'code-formatter',
        name: 'Code Formatter',
        description: 'Clean and format your code with support for multiple programming languages and style guides.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
        ),
        features: ['Multiple language support', 'Custom style configurations', 'Syntax error detection', 'Line numbering', 'Shareable snippets'],
        comingSoon: true,
    }
];

export default function ToolsPage() {
    const { darkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('all');

    // Filter tools based on the active tab
    const filteredTools = activeTab === 'all'
        ? tools
        : activeTab === 'available'
            ? tools.filter(tool => !tool.comingSoon)
            : tools.filter(tool => tool.comingSoon);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div style={{
            padding: '9rem 2rem 4rem',
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: darkMode ? '#111827' : '#FFFFFF',
            minHeight: '100vh'
        }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '0.75rem',
                    background: 'linear-gradient(to right, #142E54, #4F6F9B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}>
                    Professional Tools
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: darkMode ? '#D1D5DB' : '#4B5563',
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    Powerful, intuitive tools designed to enhance your productivity and streamline your workflow.
                </p>
            </motion.div>

            {/* Filter tabs */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2.5rem'
            }}>
                {['all', 'available', 'coming soon'].map((tab) => (
                    <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            border: 'none',
                            backgroundColor: activeTab === tab
                                ? '#142E54'
                                : darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.7)',
                            color: activeTab === tab
                                ? 'white'
                                : darkMode ? '#D1D5DB' : '#4B5563',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            boxShadow: activeTab === tab
                                ? '0 4px 6px -1px rgba(20, 46, 84, 0.1), 0 2px 4px -1px rgba(20, 46, 84, 0.06)'
                                : 'none',
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                ))}
            </div>

            {/* Tools grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                }}
            >
                {filteredTools.map((tool) => (
                    <motion.div
                        key={tool.id}
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        style={{
                            backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'white',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            boxShadow: darkMode
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            border: '1px solid',
                            borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                            position: 'relative'
                        }}
                    >
                        {tool.comingSoon && (
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                backgroundColor: '#142E54',
                                color: 'white',
                                fontSize: '0.625rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '9999px',
                                letterSpacing: '0.05em',
                                zIndex: 10
                            }}>
                                Coming Soon
                            </div>
                        )}

                        <div style={{
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            flex: 1
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: darkMode ? 'rgba(20, 46, 84, 0.1)' : 'rgba(229, 231, 235, 0.5)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: '#142E54'
                            }}>
                                <div style={{ width: '32px', height: '32px' }}>
                                    {tool.icon}
                                </div>
                            </div>

                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '0.75rem',
                                color: darkMode ? 'white' : '#111827'
                            }}>
                                {tool.name}
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: darkMode ? '#D1D5DB' : '#6B7280',
                                marginBottom: '1.5rem',
                                lineHeight: '1.5',
                                flex: 1
                            }}>
                                {tool.description}
                            </p>

                            <ul style={{
                                textAlign: 'left',
                                width: '100%',
                                marginBottom: '1.5rem'
                            }}>
                                {tool.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            fontSize: '0.8125rem',
                                            color: darkMode ? '#D1D5DB' : '#6B7280',
                                            marginBottom: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem', color: '#142E54', minWidth: '16px' }}>
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{
                            padding: '1.5rem 2rem',
                            borderTop: '1px solid',
                            borderColor: darkMode ? 'rgba(55, 65, 81, 0.2)' : 'rgba(229, 231, 235, 0.5)',
                            backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.3)' : 'rgba(249, 250, 251, 0.5)'
                        }}>
                            {tool.comingSoon ? (
                                <button
                                    disabled
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.7)',
                                        border: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: darkMode ? '#9CA3AF' : '#6B7280',
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    Coming Soon
                                </button>
                            ) : (
                                <Link href={`/tools/${tool.id}`} style={{ textDecoration: 'none' }}>
                                    <motion.button
                                        whileHover={{
                                            scale: 1.02,
                                            backgroundColor: '#0e2240'
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            backgroundColor: '#142E54',
                                            border: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: 'white',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 6px -1px rgba(20, 46, 84, 0.1), 0 2px 4px -1px rgba(20, 46, 84, 0.06)'
                                        }}
                                    >
                                        Use Tool
                                    </motion.button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Newsletter subscription */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    marginTop: '5rem',
                    padding: '3rem',
                    backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.7)' : 'rgba(249, 250, 251, 0.7)',
                    borderRadius: '1rem',
                    boxShadow: darkMode
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(55, 65, 81, 0.2)' : 'rgba(229, 231, 235, 0.5)'
                }}
            >
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: darkMode ? 'white' : '#111827'
                }}>
                    Get notified about new tools
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: darkMode ? '#D1D5DB' : '#6B7280',
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto 2rem'
                }}>
                    Subscribe to our newsletter to stay updated with the latest tools and features. Be the first to know when we launch new productivity solutions.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    maxWidth: '500px',
                    margin: '0 auto'
                }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB',
                            backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'white',
                            color: darkMode ? '#F9FAFB' : '#111827',
                            fontSize: '0.875rem'
                        }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#0e2240' }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#142E54',
                            border: 'none',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Subscribe
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
} 