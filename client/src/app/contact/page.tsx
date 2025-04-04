'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

type FormErrors = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    general?: string;
};

export default function ContactPage() {
    const { darkMode } = useTheme();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({
                ...errors,
                general: 'There was an error submitting your message. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
        setErrors({});
        setSubmitted(false);
    };

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

    const contactInfo = [
        {
            title: 'Email',
            value: 'support@kiaros.com',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
        },
        {
            title: 'Phone',
            value: '+1 (555) 123-4567',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
            ),
        },
        {
            title: 'Location',
            value: 'San Francisco, CA, USA',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            ),
        },
        {
            title: 'Hours',
            value: 'Mon-Fri: 9AM - 6PM EST',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            ),
        },
    ];

    const supportOptions = [
        'General Inquiry',
        'Technical Support',
        'Billing Question',
        'Partnership Opportunity',
        'Feature Request',
        'Other',
    ];

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
                    Contact Us
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: darkMode ? '#D1D5DB' : '#4B5563',
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    Have questions or feedback? We'd love to hear from you. Our team is always ready to help.
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
            }}>
                {/* Contact info */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div style={{
                        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: darkMode
                            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            marginBottom: '1.5rem',
                            color: darkMode ? 'white' : '#111827'
                        }}>
                            Get in Touch
                        </h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{
                                fontSize: '0.875rem',
                                color: darkMode ? '#D1D5DB' : '#6B7280',
                                marginBottom: '1.5rem',
                                lineHeight: '1.6'
                            }}>
                                Our dedicated support team is here to help you with any questions or issues. We typically respond within 24 hours.
                            </p>

                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {contactInfo.map((info, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '1.25rem',
                                        }}
                                    >
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            backgroundColor: 'rgba(20, 46, 84, 0.1)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '1rem',
                                            color: '#142E54',
                                            flexShrink: 0,
                                        }}>
                                            {info.icon}
                                        </div>
                                        <div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                color: darkMode ? '#9CA3AF' : '#6B7280',
                                                marginBottom: '0.25rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>
                                                {info.title}
                                            </div>
                                            <div style={{
                                                fontSize: '0.875rem',
                                                color: darkMode ? 'white' : '#111827',
                                                fontWeight: '500'
                                            }}>
                                                {info.value}
                                            </div>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '1rem',
                                color: darkMode ? 'white' : '#111827'
                            }}>
                                Follow Us
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
                                    <motion.a
                                        key={social}
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.7)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: darkMode ? '#D1D5DB' : '#4B5563',
                                            transition: 'background-color 0.2s, color 0.2s',
                                        }}
                                    >
                                        {/* Simplified icon representation */}
                                        <span style={{ fontSize: '0.75rem' }}>{social.charAt(0)}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact form */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div style={{
                        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: darkMode
                            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: 'center',
                                    padding: '3rem 1.5rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    color: '#16a34a',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem',
                                    color: darkMode ? 'white' : '#111827'
                                }}>
                                    Message Sent!
                                </h3>
                                <p style={{
                                    fontSize: '0.875rem',
                                    color: darkMode ? '#D1D5DB' : '#6B7280',
                                    marginBottom: '2rem',
                                    maxWidth: '400px',
                                }}>
                                    Thank you for contacting us. We've received your message and will get back to you as soon as possible, typically within 24 hours.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetForm}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.5rem',
                                        backgroundColor: '#142E54',
                                        border: 'none',
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: '0.875rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Send Another Message
                                </motion.button>
                            </motion.div>
                        ) : (
                            <>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    marginBottom: '1.5rem',
                                    color: darkMode ? 'white' : '#111827'
                                }}>
                                    Send a Message
                                </h2>

                                {errors.general && (
                                    <div style={{
                                        marginBottom: '1rem',
                                        padding: '0.75rem',
                                        borderRadius: '0.375rem',
                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                        color: '#EF4444',
                                        fontSize: '0.875rem',
                                    }}>
                                        {errors.general}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <label htmlFor="name" style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: darkMode ? '#D1D5DB' : '#374151',
                                        }}>
                                            Your Name*
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
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
                                            }}
                                        />
                                        {errors.name && (
                                            <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: darkMode ? '#D1D5DB' : '#374151',
                                        }}>
                                            Email Address*
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
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
                                            }}
                                        />
                                        {errors.email && (
                                            <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="subject" style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: darkMode ? '#D1D5DB' : '#374151',
                                        }}>
                                            Subject*
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '0.375rem',
                                                border: '1px solid',
                                                borderColor: errors.subject ? '#EF4444' : (darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB'),
                                                backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'white',
                                                color: darkMode ? '#F9FAFB' : '#111827',
                                                outline: 'none',
                                                fontSize: '0.875rem',
                                                appearance: 'none',
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${darkMode ? '%23D1D5DB' : '%236B7280'}'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 0.75rem center',
                                                backgroundSize: '1rem',
                                            }}
                                        >
                                            <option value="" disabled>Select a subject</option>
                                            {supportOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.subject && (
                                            <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="message" style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: darkMode ? '#D1D5DB' : '#374151',
                                        }}>
                                            Message*
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="How can we help you?"
                                            rows={5}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '0.375rem',
                                                border: '1px solid',
                                                borderColor: errors.message ? '#EF4444' : (darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB'),
                                                backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'white',
                                                color: darkMode ? '#F9FAFB' : '#111827',
                                                outline: 'none',
                                                fontSize: '0.875rem',
                                                resize: 'vertical',
                                            }}
                                        />
                                        {errors.message && (
                                            <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            backgroundColor: '#142E54',
                                            border: 'none',
                                            color: 'white',
                                            fontWeight: '600',
                                            fontSize: '0.875rem',
                                            cursor: isSubmitting ? 'default' : 'pointer',
                                            opacity: isSubmitting ? 0.7 : 1,
                                            position: 'relative',
                                            marginTop: '1rem',
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
                                                Submitting...
                                            </div>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </motion.button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Map and location */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                    marginTop: '3rem',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: darkMode
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                    backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'white',
                    padding: '1.5rem',
                }}
            >
                <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: darkMode ? 'white' : '#111827'
                }}>
                    Our Location
                </h2>

                <div style={{
                    height: '300px',
                    backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(243, 244, 246, 0.7)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    color: darkMode ? '#D1D5DB' : '#6B7280',
                    border: '1px dashed',
                    borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : '#D1D5DB',
                }}>
                    [Interactive Map Placeholder]
                </div>
            </motion.div>
        </div>
    );
} 