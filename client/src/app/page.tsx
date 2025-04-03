'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
// import Image from 'next/image';

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

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Expert Website Design & Development
            <br />
            for High-Performance, modern
            <br />
            and minimalistic websites ⚡
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We design and build websites that drive results and help your business grow.
            <br />
            No Calls. No BS. Just Results.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/book-call"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Book a call →
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center">
            <p className="text-sm text-gray-500">Trusted by Founders and Entrepreneurs from all over the world</p>
            {/* Comment out testimonials for now
            <div className="mt-4 flex justify-center -space-x-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="relative">
                  <Image
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    src={testimonial.image}
                    alt=""
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </div>
            */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
