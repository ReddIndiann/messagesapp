'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { signUp } from '@/app/lib/authUtils';
import Loader from '@/app/Components/Loader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

const SignUp: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      MySwal.fire({
        title: 'Error',
        text: 'Passwords do not match',
        icon: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp(formData);
      await MySwal.fire({
        title: 'Success',
        text: 'Registration successful!',
        icon: 'success',
      });
      router.push('/Sms/Home'); // Navigate to the home page after showing the success message
    } catch (err: any) {
      MySwal.fire({
        title: 'Sign-Up Failed',
        text: err.message || 'Failed to sign up. Please try again.',
        icon: 'error',
      });
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
          <h1 className="text-3xl font-bold text-gray-500 mb-8 text-center">Create your KAlert account</h1>
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
              <Loader />
            </div>
          )}
          <form onSubmit={handleSubmit} className={`space-y-6 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Stack password fields on top of each other */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                placeholder="Confirm password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
          {/* <div className="mt-6 flex justify-center space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contact Support</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">View Guide</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
