// 'use client'
// import Link from 'next/link';
// import React, { useState, useEffect, useRef } from 'react';

// const SignUp: React.FC = () => {
//   const slides = [
//     {
//       image: '/Callcenter.png',
//       title: 'Non-English speaking audience? Send voice notes in your local dialect.',
//       description: 'Get your SMS speaking. Send out pre-recorded messages in bulk to your audience using our bulk voice calls!'
//     },
//     {
//       image: '/Email-campaign.png',
//       title: 'Create meaningful engagements',
//       description: 'Send SMS to a large number of people across the local network at unbeatable prices: "SMS fofoofo".'
//     },
//     {
//       image: '/Sent-Message.png',
//       title: 'Stay connected',
//       description: 'Sign in to start sending bulk SMS and voice messages today.'
//     }
//   ];

//   const [currentSlide, setCurrentSlide] = useState(1);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [instantJump, setInstantJump] = useState(false);
//   const slideContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval); // Cleanup the interval on component unmount
//   }, []);

//   const nextSlide = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setTimeout(() => {
//       setCurrentSlide((prevSlide) => {
//         const newSlide = prevSlide + 1;
//         if (newSlide === slides.length + 1) {
//           setInstantJump(true);
//           setTimeout(() => {
//             setCurrentSlide(1);
//             setInstantJump(false);
//           }, 0);
//           return newSlide;
//         }
//         return newSlide;
//       });
//       setIsAnimating(false);
//     }, 500);
//   };

//   const prevSlide = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);
//     setTimeout(() => {
//       setCurrentSlide((prevSlide) => {
//         const newSlide = prevSlide - 1;
//         if (newSlide === 0) {
//           setInstantJump(true);
//           setTimeout(() => {
//             setCurrentSlide(slides.length);
//             setInstantJump(false);
//           }, 0);
//           return newSlide;
//         }
//         return newSlide;
//       });
//       setIsAnimating(false);
//     }, 500);
//   };

//   return (
//     <div className="min-h-screen bg-white flex justify-center items-center">
//       <div className="flex flex-col lg:flex-row lg:space-x-20 w-full max-w-6xl h-full p-6 rounded-lg">
//         <div className="lg:w-1/2 flex flex-col items-center justify-between">
//           <div className="flex items-center justify-center mb-6">
//             <img src="/bms.png" alt="BMS Logo" className="w-48 h-20" />
//           </div>
//           <div className="w-full mt-6 relative">
//             <div className="overflow-hidden relative">
//               <div
//                 ref={slideContainerRef}
//                 className={`transition-transform duration-500 ease-in-out flex ${instantJump ? 'duration-0' : ''}`}
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//               >
//                 <div className="flex-shrink-0 w-full text-center">
//                   <h2 className="text-3xl font-semibold mb-4 text-black">{slides[slides.length - 1].title}</h2>
//                   <p className="text-gray-600 ">{slides[slides.length - 1].description}</p>
//                   <img src={slides[slides.length - 1].image} alt={`Illustration ${slides.length}`} className="w-full h-96 object-contain mb-6" />
//                 </div>
//                 {slides.map((slide, index) => (
//                   <div key={index} className="flex-shrink-0 w-full text-center">
//                     <h2 className="text-3xl font-semibold mb-4 text-black">{slide.title}</h2>
//                     <p className="text-gray-600 ">{slide.description}</p>
//                     <img src={slide.image} alt={`Illustration ${index + 1}`} className="w-full h-96 object-contain mb-6" />
//                   </div>
//                 ))}
//                 <div className="flex-shrink-0 w-full text-center">
//                   <h2 className="text-3xl font-semibold mb-4 text-black">{slides[0].title}</h2>
//                   <p className="text-gray-600 ">{slides[0].description}</p>
//                   <img src={slides[0].image} alt={`Illustration 1`} className="w-full h-96 object-contain mb-6" />
//                 </div>
//               </div>
//             </div>
//             <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md hover:bg-gray-700">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-7 w-7">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md hover:bg-gray-700">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="h-7 w-7">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//         <div className="lg:w-1/2 p-10 flex flex-col justify-start">
//           <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create your mNotify account</h2>
//           <div className="flex justify-center mb-6">
//             <div className="bg-gray-300 w-2/4" style={{ height: "1px" }}></div>
//           </div>
          
//           <form className="flex flex-col items-center w-full">
//             <div className="w-full mb-8">
//               <label htmlFor="number" className="mb-4 text-gray-600 text-sm flex items-center">
//                 <span className="text-red-500 ml-1">*</span>Phone Number
//               </label>
//               <input type="text" id="number" name="number" placeholder="Enter phone number" className="w-full h-12 p-4 text-lg border border-gray-300 rounded-lg focus:border-orange-600 focus:border-2 focus:outline-none text-black" />
//             </div>
//             <div className="w-full mb-8">
//               <label htmlFor="email" className="mb-4 text-gray-600 text-sm flex items-center">
//                 <span className="text-red-500 ml-1">*</span>Email
//               </label>
//               <input type="email" id="email" name="email" placeholder="Enter email" className="w-full h-12 p-4 text-lg border border-gray-300 rounded-lg focus:border-orange-600 focus:border-2 focus:outline-none text-black" />
//             </div>
//             <div className="w-full mb-8 flex space-x-4">
//               <div className="w-1/2">
//                 <label htmlFor="password" className="mb-4 text-gray-600 text-sm flex items-center">
//                   <span className="text-red-500 ml-1">*</span>Password
//                 </label>
//                 <input type="password" id="password" name="password" placeholder="Enter password" className="w-full h-12 p-4 text-lg border border-gray-300 rounded-lg focus:border-orange-600 focus:border-2 focus:outline-none text-black" />
//               </div>
//               <div className="w-1/2">
//                 <label htmlFor="confirmPassword" className="mb-4 text-gray-600 text-sm flex items-center">
//                   <span className="text-red-500 ml-1">*</span>Confirm Password
//                 </label>
//                 <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" className="w-full h-12 p-4 text-lg border border-gray-300 rounded-lg focus:border-orange-600 focus:border-2 focus:outline-none text-black" />
//               </div>
//             </div>
//             <a href="#" className="text-orange-600 text-sm mb-4 self-end">Forgot Your Password?</a>
//             <button type="submit" className="bg-orange-600 text-white py-3 font-semibold w-full rounded-md hover:bg-orange-500 transition duration-200">Sign Up</button>
//           </form>
//           <div className="mt-6 text-center">
//             <p className="text-gray-800">Already have an account? <Link href="/auth/login" passHref><button className="text-orange-600">Sign In</button></Link></p>
//           </div>
         
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="lg:w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-500 mb-8 text-center">Create your KAlert account</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
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

export default SignUp;
