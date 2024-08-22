

'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For redirection
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from './lib/authUtils'; // Adjust the import path if necessary
import Loader from './Components/Loader';// Import the Loader component

const slides = [
  {
    image: '/home1.svg',
    title: "Speak Your Audience's Language",
    description: 'Send voice notes in local dialects to connect with non-English speaking audiences.'
  },
  {
    image: '/home2.svg',
    title: 'Engage Meaningfully',
    description: 'Reach a wide audience with bulk SMS at unbeatable rates.'
  },
  {
    image: '/home3.svg',
    title: 'Stay Connected',
    description: 'Start sending bulk SMS and voice messages today.'
  }
];

const SignIn: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // For redirection

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Clear previous errors

    try {
      const data = await signIn({ email, password });

      // Handle successful login
      console.log('Login successful:', data);

      // Redirect to another page (e.g., dashboard)
      router.push('/Sms/Home');

    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Unexpected Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-8 bg-blue-100">
          <img src="/logo1.png" alt="BMS Logo" className="w-48 h-20 object-contain mb-8" />
          <div className="relative h-96 overflow-hidden rounded-xl">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
              >
                <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-64 h-64 object-contain mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{slides[currentSlide].title}</h2>
                <p className="text-gray-600">{slides[currentSlide].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="lg:w-1/2 p-12 flex flex-col justify-center relative">
          <h1 className="text-3xl font-bold text-gray-500 mb-8 text-center">Welcome Back</h1>
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
              <Loader />
            </div>
          )}
          <form onSubmit={handleSubmit} className={`space-y-6 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Dont have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contact Support</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">View Guide</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
