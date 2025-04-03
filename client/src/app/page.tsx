'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
// import Image from 'next/image';
import { useEffect, useState } from 'react';

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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    )
  },
  {
    name: 'Resume Builder',
    description: 'Create professional resumes with our intuitive builder.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )
  },
  {
    name: 'Image Converter',
    description: 'Convert images between different formats with one click.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    )
  }
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
    <div style={{ position: 'relative', isolation: 'isolate', backgroundColor: '#FFFFFF' }}>
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
            background: 'linear-gradient(to top right, #EAE6DF, #C2CCC5)',
            opacity: 0.3,
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Hero Section */}
      <div style={{
        paddingTop: isMobile ? '8rem' : (isTablet ? '10rem' : '12rem'),
        paddingBottom: isMobile ? '4rem' : (isTablet ? '6rem' : '8rem'),
        paddingLeft: isMobile || isTablet ? '1.5rem' : '2rem',
        paddingRight: isMobile || isTablet ? '1.5rem' : '2rem'
      }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '42rem', textAlign: 'center' }}>
          <motion.h1
            style={{
              fontSize: isMobile || isTablet ? '2.25rem' : '3.75rem',
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: '#1F2937'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Premium Tools <span style={{ color: '#142E54' }}>for Modern</span> Professionals
          </motion.h1>
          <motion.p
            style={{ marginTop: '1.5rem', fontSize: '1.125rem', lineHeight: 1.8, color: '#4B5563' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Boost your productivity with our suite of professional tools.
            Simple, efficient, and designed for you.
          </motion.p>
          <motion.div
            style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/tools"
              style={{
                borderRadius: '0.375rem',
                backgroundColor: '#142E54',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'white',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                transition: 'background-color 300ms'
              }}
            >
              Explore Tools
            </Link>
            <Link
              href="/contact"
              style={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5, color: '#1F2937', transition: 'color 300ms' }}
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
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
        background: 'linear-gradient(to bottom, #ffffff, rgba(234, 230, 223, 0.3))',
        borderRadius: '1.5rem'
      }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '42rem', textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: isMobile || isTablet ? '1.875rem' : '2.25rem',
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: '#1F2937'
          }}>
            Powerful Tools for <span style={{ color: '#142E54' }}>Every Task</span>
          </h2>
          <p style={{ marginTop: '1.5rem', fontSize: '1.125rem', lineHeight: 1.8, color: '#4B5563' }}>
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
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                border: '1px solid #F3F4F6',
                transition: 'all 300ms'
              }}
            >
              <div style={{
                display: 'flex',
                height: '3rem',
                width: '3rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.5rem',
                backgroundColor: '#EAE6DF',
                marginBottom: '1.5rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.75, color: '#1F2937' }}>{feature.name}</h3>
              <p style={{ marginTop: '0.5rem', flex: 1, fontSize: '1rem', lineHeight: 1.75, color: '#4B5563' }}>{feature.description}</p>
              <Link
                href={`/tools#${feature.name.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#142E54',
                  transition: 'color 300ms'
                }}
              >
                Try Now <span style={{ display: 'inline-block', transition: 'transform 300ms' }}>→</span>
              </Link>
            </motion.div>
          ))}
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
            backgroundColor: '#142E54',
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
          <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '42rem', textAlign: 'center' }}>
            <h2 style={{
              fontSize: isMobile || isTablet ? '1.875rem' : '2.25rem',
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
            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
              <Link
                href="/payment"
                style={{
                  borderRadius: '0.375rem',
                  backgroundColor: 'white',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#142E54',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  transition: 'background-color 300ms'
                }}
              >
                Get Premium Access
              </Link>
              <Link
                href="/tools"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: 'white',
                  transition: 'color 300ms'
                }}
              >
                Explore Free Tools <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
