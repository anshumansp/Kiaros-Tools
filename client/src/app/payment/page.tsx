'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

// Pricing plan types
type PricingPlan = {
    id: string;
    name: string;
    description: string;
    price: string;
    priceDetail: string;
    features: string[];
    buttonText: string;
    isPopular?: boolean;
    isEnterprise?: boolean;
};

export default function PaymentPage() {
    const { darkMode } = useTheme();
    const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('annual');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

    // Pricing plans data
    const pricingPlans: PricingPlan[] = [
        {
            id: 'pay-per-task',
            name: 'Pay Per Task',
            description: 'Perfect for occasional users who need specific tools only sometimes.',
            price: 'From $2',
            priceDetail: 'per task',
            features: [
                'Pay only for what you use',
                'Access to all tools',
                'No subscription required',
                'Download results instantly',
                'Basic customer support',
            ],
            buttonText: 'Try Now',
        },
        {
            id: 'premium',
            name: 'Premium',
            description: 'Ideal for professionals who need constant access to our suite of tools.',
            price: billingInterval === 'annual' ? '$60' : '$5.99',
            priceDetail: billingInterval === 'annual' ? 'per year' : 'per month',
            features: [
                'Unlimited access to all tools',
                'Priority customer support',
                'Advanced features unlocked',
                'No watermarks on exports',
                'Cloud storage integration',
                'Custom export options',
            ],
            buttonText: 'Get Premium',
            isPopular: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'Tailored solutions for teams and businesses with custom requirements.',
            price: 'Custom',
            priceDetail: 'contact for pricing',
            features: [
                'Everything in Premium',
                'Team collaboration features',
                'API access',
                'Dedicated account manager',
                'Custom integration options',
                'Onboarding and training',
                'SLA guarantee',
            ],
            buttonText: 'Contact Sales',
            isEnterprise: true,
        },
    ];

    // Animation variants
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

    const handlePlanSelect = (plan: PricingPlan) => {
        setSelectedPlan(plan);
        if (plan.id !== 'enterprise') {
            setShowPaymentOptions(true);
        }
    };

    return (
        <div style={{
            padding: '9rem 2rem 4rem',
            maxWidth: '1400px',
            margin: '0 auto',
            backgroundColor: darkMode ? '#111827' : '#FFFFFF',
            minHeight: '100vh',
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
                    Pricing Plans
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: darkMode ? '#D1D5DB' : '#4B5563',
                    maxWidth: '700px',
                    margin: '0 auto 2rem'
                }}>
                    Choose the perfect plan for your needs. From pay-per-task options to unlimited premium access.
                </p>

                {/* Billing interval toggle */}
                <div style={{
                    display: 'inline-flex',
                    backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.7)',
                    padding: '0.25rem',
                    borderRadius: '9999px',
                    marginBottom: '3rem'
                }}>
                    {['monthly', 'annual'].map((interval) => (
                        <button
                            key={interval}
                            onClick={() => setBillingInterval(interval as 'monthly' | 'annual')}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '9999px',
                                border: 'none',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                backgroundColor: billingInterval === interval
                                    ? '#142E54'
                                    : 'transparent',
                                color: billingInterval === interval
                                    ? 'white'
                                    : darkMode ? '#D1D5DB' : '#4B5563',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'background-color 0.2s, color 0.2s'
                            }}
                        >
                            {interval.charAt(0).toUpperCase() + interval.slice(1)}
                            {interval === 'annual' && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-10px',
                                    backgroundColor: '#16a34a',
                                    color: 'white',
                                    fontSize: '0.625rem',
                                    fontWeight: '600',
                                    padding: '0.125rem 0.375rem',
                                    borderRadius: '9999px',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                                }}>
                                    Save 15%
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Pricing cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {pricingPlans.map((plan) => (
                    <motion.div
                        key={plan.id}
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
                            border: plan.isPopular
                                ? '2px solid #142E54'
                                : '1px solid',
                            borderColor: plan.isPopular
                                ? '#142E54'
                                : darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                            position: 'relative',
                            padding: '2rem'
                        }}
                    >
                        {plan.isPopular && (
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
                                letterSpacing: '0.05em'
                            }}>
                                Most Popular
                            </div>
                        )}

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                marginBottom: '0.5rem',
                                color: darkMode ? 'white' : '#111827',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {plan.name}
                            </h3>

                            <p style={{
                                fontSize: '0.875rem',
                                color: darkMode ? '#D1D5DB' : '#6B7280',
                                marginBottom: '1.5rem',
                                lineHeight: '1.5'
                            }}>
                                {plan.description}
                            </p>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '0.25rem',
                                margin: '1rem 0'
                            }}>
                                <span style={{
                                    fontSize: '2.25rem',
                                    fontWeight: '800',
                                    color: darkMode ? 'white' : '#111827'
                                }}>
                                    {plan.price}
                                </span>
                                <span style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: darkMode ? '#9CA3AF' : '#6B7280'
                                }}>
                                    {plan.priceDetail}
                                </span>
                            </div>
                        </div>

                        <div style={{ flex: 1 }}>
                            <h4 style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: darkMode ? '#D1D5DB' : '#4B5563',
                                marginBottom: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                What's included
                            </h4>

                            <ul style={{
                                textAlign: 'left',
                                marginBottom: '2rem'
                            }}>
                                {plan.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            fontSize: '0.875rem',
                                            color: darkMode ? '#D1D5DB' : '#6B7280',
                                            marginBottom: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                                            marginRight: '0.75rem',
                                            color: '#142E54',
                                            marginTop: '0.25rem',
                                            minWidth: '16px'
                                        }}>
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePlanSelect(plan)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                backgroundColor: plan.isPopular ? '#142E54' : 'transparent',
                                border: plan.isPopular ? 'none' : '1px solid #142E54',
                                color: plan.isPopular ? 'white' : (darkMode ? 'white' : '#142E54'),
                                fontWeight: '600',
                                fontSize: '0.875rem',
                                cursor: 'pointer',
                                width: '100%',
                                transition: 'background-color 0.2s, transform 0.2s',
                            }}
                        >
                            {plan.buttonText}
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Unique Payment Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{
                    marginTop: '5rem',
                    maxWidth: '1000px',
                    margin: '5rem auto 0',
                    padding: '5rem 3rem'
                }}
            >
                <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    color: darkMode ? 'white' : '#111827'
                }}>
                    Our Unique Payment Philosophy
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'white',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        boxShadow: darkMode
                            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'rgba(20, 46, 84, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            color: '#142E54'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 1v22"></path>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            marginBottom: '0.75rem',
                            color: darkMode ? 'white' : '#111827'
                        }}>
                            Pay Only For What You Use
                        </h3>
                        <p style={{
                            fontSize: '0.875rem',
                            color: darkMode ? '#D1D5DB' : '#6B7280',
                            lineHeight: '1.5'
                        }}>
                            We believe in fair pricing. With our pay-per-task model, you only pay for the tools you actually use, when you use them. No hidden fees, no surprises.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'white',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        boxShadow: darkMode
                            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'rgba(20, 46, 84, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            color: '#142E54'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                        </div>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            marginBottom: '0.75rem',
                            color: darkMode ? 'white' : '#111827'
                        }}>
                            Try Before You Buy
                        </h3>
                        <p style={{
                            fontSize: '0.875rem',
                            color: darkMode ? '#D1D5DB' : '#6B7280',
                            lineHeight: '1.5'
                        }}>
                            Most of our tools offer a free preview or trial function. Test the results before finalizing your purchase to ensure it meets your exact needs.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'white',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        boxShadow: darkMode
                            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        border: '1px solid',
                        borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.5)',
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'rgba(20, 46, 84, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            color: '#142E54'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                            </svg>
                        </div>
                        <h3 style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            marginBottom: '0.75rem',
                            color: darkMode ? 'white' : '#111827'
                        }}>
                            Flexible Subscription Options
                        </h3>
                        <p style={{
                            fontSize: '0.875rem',
                            color: darkMode ? '#D1D5DB' : '#6B7280',
                            lineHeight: '1.5'
                        }}>
                            Switch between pay-per-task and subscription models anytime. We'll even credit your subscription with any purchases made in the last 30 days.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* FAQ Section will be added in the homepage */}

            {/* Payment guarantee */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    marginTop: '4rem',
                    marginBottom: '2rem',
                    padding: '3rem',
                    backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.7)' : 'rgba(249, 250, 251, 0.7)',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '4rem auto 2rem',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(55, 65, 81, 0.2)' : 'rgba(229, 231, 235, 0.5)',
                    boxShadow: darkMode
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }}
            >
                <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 1.5rem',
                    backgroundColor: 'rgba(20, 46, 84, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#142E54'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 15l8-8"></path>
                        <path d="M16 15v-7h-7"></path>
                    </svg>
                </div>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: darkMode ? 'white' : '#111827'
                }}>
                    100% Satisfaction Guarantee
                </h2>
                <p style={{
                    fontSize: '1rem',
                    color: darkMode ? '#D1D5DB' : '#6B7280',
                    maxWidth: '600px',
                    margin: '0 auto 1.5rem',
                    lineHeight: '1.6'
                }}>
                    If you're not completely satisfied with our tools or service, we offer a no-questions-asked refund policy. Your success and satisfaction are our top priorities.
                </p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    {['Phonepe', 'Paytm', 'Gpay', 'Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map(method => (
                        <div key={method} style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0.5rem',
                            backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.7)',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: darkMode ? '#D1D5DB' : '#4B5563',
                        }}>
                            {method}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
} 