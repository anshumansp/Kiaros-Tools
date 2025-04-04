'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import styles from '@/styles/Page.module.css';
import Button from '@/components/ui/Button';

// Temporarily comment out testimonials to avoid image loading errors
/*
const testimonials = [
  { id: 1, image: '/assets/images/avatar-1.jpg' },
  { id: 2, image: '/assets/images/avatar-2.jpg' },
  { id: 3, image: '/assets/images/avatar-3.jpg' },
  { id: 4, image: '/assets/images/avatar-4.jpg' },
  { id: 5, image: '/assets/images/avatar-5.jpg' },
  { id: 6, image: '/assets/images/avatar-6.jpg' },
  { id: 7, image: '/assets/images/avatar-7.jpg' },
  { id: 8, image: '/assets/images/avatar-8.jpg' },
];
*/

// Staggered animation for the features section
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const features = [
  {
    name: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDF files with ease.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#142E54" style={{ width: '1.5rem', height: '1.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    )
  },
  {
    name: 'Resume Builder',
    description: 'Create professional resumes with our intuitive builder.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#142E54" style={{ width: '1.5rem', height: '1.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )
  },
  {
    name: 'Image Converter',
    description: 'Convert images between different formats with one click.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#142E54" style={{ width: '1.5rem', height: '1.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    )
  }
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      position: 'relative',
      isolation: 'isolate',
      backgroundColor: darkMode ? '#121212' : '#FFFFFF',
      paddingTop: '8rem'
    }}>
      {/* Gradient background */}
      <div style={{
        position: 'absolute',
        insetInlineStart: 0,
        insetInlineEnd: 0,
        top: isMobile ? '-10rem' : '-20rem',
        zIndex: -10,
        transform: 'translateZ(0)',
        overflow: 'hidden',
        filter: 'blur(3rem)'
      }} aria-hidden="true">
        <div
          style={{
            position: 'relative',
            left: isMobile || isTablet ? '50%' : 'calc(50% - 40rem)',
            zIndex: -10,
            aspectRatio: '1155/678',
            width: isMobile || isTablet ? '36.125rem' : '72.1875rem',
            maxWidth: 'none',
            transform: 'translateX(-50%) rotate(30deg)',
            background: darkMode ?
              'linear-gradient(to top right, rgba(20, 46, 84, 0.3), rgba(24, 24, 27, 0.1))' :
              'linear-gradient(to top right, #EAE6DF, #142E54)',
            opacity: darkMode ? 0.6 : 0.3,
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Hero Section */}
      <div style={{
        paddingTop: isMobile ? '10rem' : (isTablet ? '8rem' : '4rem'),
        paddingBottom: isMobile ? '6rem' : (isTablet ? '8rem' : '10rem'),
        paddingLeft: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingRight: isMobile || isTablet ? '1.5rem' : '2rem'
      }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '50rem', textAlign: 'center' }}>
          <motion.h1
            style={{
              fontSize: isMobile ? '2.5rem' : (isTablet ? '3.5rem' : '4.5rem'),
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: darkMode ? '#F9FAFB' : '#1F2937',
              marginBottom: '1.5rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ color: '#142E54' }}>Premium</span> Tools for <br />
            Modern <span style={{ color: '#142E54' }}>Professionals</span>
          </motion.h1>
          <motion.p
            style={{
              marginTop: '1.5rem',
              fontSize: isMobile ? '1.125rem' : '1.25rem',
              lineHeight: 1.8,
              color: darkMode ? '#D1D5DB' : '#4B5563',
              maxWidth: '42rem',
              margin: '0 auto'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Boost your productivity with our suite of professional tools.
            Simple, efficient, and designed for you.
          </motion.p>
          <motion.div
            className={styles.buttonContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button href="/tools">
              Explore Tools
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={styles.buttonIcon} style={{ marginLeft: '0.5rem', width: '1rem', height: '1rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </motion.div>
        </div>

        {/* Trusted by section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: '6rem',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: darkMode ? '#9CA3AF' : '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1.5rem'
          }}>
            Trusted by professionals worldwide
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '1.5rem' : '3rem',
            opacity: 0.7
          }}>
            {/* Company logos would go here - representing with text for now */}
            {['Acme Inc', 'GlobalTech', 'Innovate Co', 'TechForward', 'Future Ltd'].map((company, index) => (
              <div key={index} style={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                fontWeight: '600',
                color: darkMode ? '#D1D5DB' : '#4B5563'
              }}>
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '80rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        paddingLeft: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingRight: isMobile || isTablet ? '1.5rem' : '2rem',
        background: darkMode ?
          'linear-gradient(to bottom, #121212, rgba(31, 41, 55, 0.3))' :
          'linear-gradient(to bottom, #ffffff, rgba(234, 230, 223, 0.3))',
        borderRadius: '1.5rem',
        boxShadow: darkMode ?
          '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' :
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '42rem', textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: isMobile || isTablet ? '1.875rem' : '2.5rem',
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: darkMode ? '#F9FAFB' : '#1F2937'
          }}>
            <span style={{ color: '#142E54' }}>Powerful</span> Tools for <span style={{ color: '#142E54' }}>Every</span> Task
          </h2>
          <p style={{
            marginTop: '1.5rem',
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: darkMode ? '#D1D5DB' : '#4B5563'
          }}>
            Our tools are designed to streamline your workflow and save you time.
          </p>
        </div>
        <motion.div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: isMobile ? '4rem' : '5rem',
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, minmax(0, 1fr))' : (isTablet ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))'),
            gap: '2rem',
            maxWidth: isMobile || isTablet ? '42rem' : 'none'
          }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              whileHover={{
                y: -10,
                boxShadow: darkMode ?
                  '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)' :
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : '#FFFFFF',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: darkMode ?
                  '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' :
                  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#F3F4F6',
                transition: 'all 300ms',
              }}
            >
              <div style={{
                display: 'flex',
                height: '3rem',
                width: '3rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                backgroundColor: darkMode ? 'rgba(20, 46, 84, 0.3)' : '#EAE6DF',
                marginBottom: '1.5rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.75,
                color: darkMode ? '#F9FAFB' : '#142E54'
              }}>
                {feature.name}
              </h3>
              <p style={{
                marginTop: '0.5rem',
                flex: 1,
                fontSize: '1rem',
                lineHeight: 1.75,
                color: darkMode ? '#D1D5DB' : '#4B5563'
              }}>
                {feature.description}
              </p>
              <Button
                href={`/tools#${feature.name.toLowerCase().replace(/\s+/g, '-')}`}
                variant="outline"
                size="sm"
                style={{ marginTop: '1rem' }}
              >
                Try Now
                <span style={{ display: 'inline-block', marginLeft: '0.5rem' }}>→</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* About Us Section */}
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '80rem',
        paddingLeft: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingRight: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingTop: isMobile ? '6rem' : '8rem',
        paddingBottom: isMobile ? '6rem' : '8rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr' : '1fr 1fr'),
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              position: 'relative',
              height: isMobile ? '300px' : '500px',
              borderRadius: '1rem',
              overflow: 'hidden',
              backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : '#F9FAFB',
              boxShadow: darkMode ?
                '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' :
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* For now, adding a placeholder instead of an image */}
              <div style={{
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  color: '#142E54'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" style={{ width: '6rem', height: '6rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <p style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: darkMode ? '#E5E7EB' : '#4B5563'
                }}>
                  Building tools that empower professionals
                </p>
              </div>

              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(20, 46, 84, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
                zIndex: 0
              }} />

              <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(234, 230, 223, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
                zIndex: 0
              }} />
            </div>
          </motion.div>

          {/* Text Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 style={{
              fontSize: isMobile ? '1.875rem' : '2.5rem',
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: darkMode ? '#F9FAFB' : '#1F2937',
              marginBottom: '1.5rem'
            }}>
              About <span style={{ color: '#142E54' }}>Kiaros</span>
            </h2>

            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: darkMode ? '#D1D5DB' : '#4B5563',
              marginBottom: '1.5rem'
            }}>
              Kiaros was founded with a simple mission: to create powerful, user-friendly tools that help professionals work more efficiently.
            </p>

            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: darkMode ? '#D1D5DB' : '#4B5563',
              marginBottom: '2rem'
            }}>
              Our team of dedicated developers and designers work tirelessly to craft intuitive solutions for everyday challenges. We believe that technology should simplify your workflow, not complicate it.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { number: '10+', label: 'Professional Tools' },
                { number: '50K+', label: 'Happy Users' },
                { number: '100+', label: 'Countries Reached' },
                { number: '24/7', label: 'Customer Support' }
              ].map((stat, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.8)',
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  boxShadow: darkMode ?
                    '0 1px 2px 0 rgba(0, 0, 0, 0.05)' :
                    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(55, 65, 81, 0.3)' : '#E5E7EB'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#142E54',
                    marginBottom: '0.5rem'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#9CA3AF' : '#6B7280'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'inline-block' }}
            >
              <Link
                href="/about"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: darkMode ? '#E5E7EB' : '#142E54',
                  transition: 'all 300ms',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderRadius: '2rem',
                  border: '2px solid #142E54',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '0.625rem',
                  paddingBottom: '0.625rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#142E54';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = darkMode ? '#E5E7EB' : '#142E54';
                }}
              >
                Learn more about us
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '80rem',
        paddingLeft: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingRight: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingTop: isMobile ? '6rem' : '8rem',
        paddingBottom: isMobile ? '6rem' : '8rem'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: isMobile || isTablet ? '1.875rem' : '2.5rem',
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: darkMode ? '#F9FAFB' : '#1F2937',
              marginBottom: '1.5rem'
            }}>
              What <span style={{ color: '#142E54' }}>Professionals</span> Say About Us
            </h2>
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: darkMode ? '#D1D5DB' : '#4B5563',
              maxWidth: '42rem',
              margin: '0 auto'
            }}>
              Discover why professionals across various industries trust our tools for their daily workflow.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'),
            gap: '2rem',
          }}>
            {[
              {
                quote: "Manu is the man! He is the best front-end developer I have worked with. He took the requirements and quite literally ran with them.",
                author: "John Shahawy",
                role: "Founder at Moonbeam",
                rating: 5
              },
              {
                quote: "These tools have saved me countless hours of work. The interface is intuitive and the results are always professional.",
                author: "Sarah Johnson",
                role: "Senior Designer, CreativeMinds",
                rating: 5
              },
              {
                quote: "I've tried many productivity suites, but this one stands out. The attention to detail and user experience is unmatched.",
                author: "Michael Chen",
                role: "Project Manager, TechSolutions",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{
                  backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#F3F4F6',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FCD34D" style={{ width: '1.25rem', height: '1.25rem' }}>
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  color: darkMode ? '#E5E7EB' : '#4B5563',
                  flex: 1
                }}>
                  "{testimonial.quote}"
                </p>
                <div style={{ marginTop: '2rem' }}>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: darkMode ? '#F9FAFB' : '#1F2937',
                    marginBottom: '0.25rem'
                  }}>
                    {testimonial.author}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: darkMode ? '#9CA3AF' : '#6B7280'
                  }}>
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{
            marginTop: '4rem',
            textAlign: 'center'
          }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'inline-block' }}
            >
              <Link
                href="/about"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: darkMode ? '#E5E7EB' : '#142E54',
                  transition: 'all 300ms',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = darkMode ? '#FFFFFF' : '#0e2240';
                  const arrow = e.currentTarget.querySelector('span');
                  if (arrow) {
                    arrow.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = darkMode ? '#E5E7EB' : '#142E54';
                  const arrow = e.currentTarget.querySelector('span');
                  if (arrow) {
                    arrow.style.transform = 'translateX(0)';
                  }
                }}
              >
                Read more testimonials
                <span style={{
                  display: 'inline-block',
                  transition: 'transform 300ms'
                }}>→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '80rem',
        paddingLeft: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingRight: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingTop: isMobile ? '6rem' : '8rem',
        paddingBottom: isMobile ? '6rem' : '8rem'
      }}>
        <motion.div
          style={{
            position: 'relative',
            isolation: 'isolate',
            overflow: 'hidden',
            backgroundColor: darkMode ? '#1E3A8A' : '#142E54',
            paddingLeft: isMobile ? '1.5rem' : (isTablet ? '4rem' : '6rem'),
            paddingRight: isMobile ? '1.5rem' : (isTablet ? '4rem' : '6rem'),
            paddingTop: isMobile ? '4rem' : '6rem',
            paddingBottom: isMobile ? '4rem' : '6rem',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-1rem',
            right: '-1rem',
            width: '8rem',
            height: '8rem',
            borderRadius: '9999px',
            background: darkMode ? 'radial-gradient(#4F46E5, transparent)' : 'radial-gradient(#A7967E, transparent)',
            opacity: 0.3,
          }} aria-hidden="true" />

          <div style={{
            position: 'absolute',
            bottom: '-2rem',
            left: '-2rem',
            width: '12rem',
            height: '12rem',
            borderRadius: '9999px',
            background: darkMode ? 'radial-gradient(#6366F1, transparent)' : 'radial-gradient(#C2CCC5, transparent)',
            opacity: 0.2,
          }} aria-hidden="true" />

          <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '42rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: isMobile || isTablet ? '1.875rem' : '2.5rem',
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: 'white'
            }}>
              Ready to boost your productivity?
            </h2>
            <p style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '1.5rem',
              maxWidth: '36rem',
              fontSize: '1.125rem',
              lineHeight: 1.8,
              color: '#D1D5DB'
            }}>
              Get started today with our premium tools designed for professionals like you.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/payment"
                  style={{
                    borderRadius: '3rem',
                    backgroundColor: 'white',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    paddingTop: '0.875rem',
                    paddingBottom: '0.875rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: darkMode ? '#1E3A8A' : '#142E54',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'all 300ms',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = darkMode ? '#F3F4F6' : '#EAE6DF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Get Premium Access
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/tools"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    lineHeight: 1.5,
                    color: 'white',
                    transition: 'all 300ms',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    borderRadius: '3rem',
                    border: '2px solid white',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Free Tools <span aria-hidden="true" style={{ display: 'inline-block', marginLeft: '0.5rem', transition: 'transform 300ms' }}>→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
