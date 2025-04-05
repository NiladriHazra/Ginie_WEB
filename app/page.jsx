"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTwitter, FaDownload, FaGithub, FaStar, FaPlay } from 'react-icons/fa';
import { BsStarFill, BsLightningChargeFill } from 'react-icons/bs';
import { PiFilmReelFill } from 'react-icons/pi';
import { AiFillFire } from 'react-icons/ai';
import { MdOutlineDevices, MdOutlineHighQuality } from 'react-icons/md';

const Page = () => {
  const [downloadCount, setDownloadCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  // App features to display with improved icons
  const features = [
    { icon: <PiFilmReelFill className="text-purple-500 text-3xl" />, title: "Movie & TV Shows", description: "Access thousands of movies and TV shows in HD quality." },
    { icon: <AiFillFire className="text-red-500 text-3xl" />, title: "Trending Content", description: "Stay updated with what's trending globally in real-time." },
    { icon: <BsStarFill className="text-yellow-500 text-3xl" />, title: "Rating System", description: "Choose content based on user ratings and reviews." },
    { icon: <BsLightningChargeFill className="text-amber-500 text-3xl" />, title: "Fast Streaming", description: "Advanced buffering technology for smooth playback." },
  ];

  // Images for the slider - Focused selection of high-quality images
  const sliderImages = [
    "/assets/three.jpg",
    "/assets/four.jpg",
    "/assets/one.jpg",
  ];

  // Load download count from localStorage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem('appDownloadCount');
    if (savedCount) {
      setDownloadCount(parseInt(savedCount, 10));
    }
    
    // Reduced loading time to 800ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Auto-slide functionality
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideInterval);
    };
  }, []);

  // Handle download click - Updated to use Google Drive link
  const handleDownload = () => {
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem('appDownloadCount', newCount.toString());
    
    // Show thank you message
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    
    // Open Google Drive link in a new tab
    window.open('https://drive.google.com/file/d/1Sj2wkoRtmJajaYT_fekKH3TDkR5Df2p7/view', '_blank');
  };

  // Improved loading screen
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
        <motion.div
          className="relative flex items-center justify-center w-32 h-32 mb-8"
        >
          {/* App logo in the center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute z-10 w-24 h-24 rounded-full overflow-hidden"
          >
            <Image 
              src="/assets/ginie2.png" 
              alt="GinieAI Logo" 
              fill
              sizes="96px"
              priority
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          
          {/* Animated rings around the logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1.2 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-full h-full rounded-full border-4 border-purple-500"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.4 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
            className="absolute w-full h-full rounded-full border-4 border-pink-500"
          ></motion.div>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Loading GinieAI...
        </motion.h2>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>GinieAI - Your Ultimate Entertainment Companion</title>
        <meta name="description" content="Access thousands of movies, TV shows, and more with GinieAI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section with improved background */}
        <header className="relative">
          {/* New improved background with gradient overlay instead of image slider */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-purple-900/70 via-gray-900 to-gray-900">
              {/* Abstract animated shapes */}
              <motion.div 
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.2, 0.1], x: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-purple-600/20 blur-3xl"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.3, 0.1], x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                className="absolute top-40 right-[15%] w-80 h-80 rounded-full bg-pink-600/20 blur-3xl"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0.05 }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-20 left-[20%] w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
              ></motion.div>
            </div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
            <nav className="flex justify-between items-center mb-12">
              <div className="flex items-center">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="mr-3 w-12 h-12 relative"
                >
                  <Image 
                    src="/assets/ginie2.png" 
                    alt="GinieAI Logo" 
                    fill
                    sizes="48px"
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  GinieAI
                </h1>
              </div>
              
              <div className="hidden md:flex space-x-6 items-center">
                <a href="#features" className="hover:text-purple-400 transition-colors duration-300">Features</a>
                <a href="#screenshots" className="hover:text-purple-400 transition-colors duration-300">Screenshots</a>
                <a href="#download" className="hover:text-purple-400 transition-colors duration-300">Download</a>
                <a 
                  href="https://x.com/PixelNiladri" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400 transition-colors duration-300"
                >
                  <FaTwitter className="mr-2" />
                  <span>@PixelNiladri</span>
                </a>
              </div>
              
              <div className="md:hidden">
                <a 
                  href="https://x.com/PixelNiladri" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <FaTwitter className="text-blue-400" />
                </a>
              </div>
            </nav>

            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block px-4 py-1 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-800 mb-6"
                >
                  <span className="text-purple-300 font-medium text-sm">✨ The #1 Entertainment App</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                >
                  Your Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Entertainment</span> Companion
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-300 text-lg mb-8"
                >
                  Access thousands of movies, TV shows, and more in stunning quality. Download content for offline viewing on any device, anytime, anywhere.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                  <button 
                    onClick={handleDownload} 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25"
                  >
                    <FaDownload className="mr-2" />
                    Download Now
                  </button>
                  
                  <div className="flex items-center">
                    <div className="text-yellow-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-300">{downloadCount.toLocaleString()}+ downloads</span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="md:w-1/2 flex justify-center"
              >
                <div className="relative w-64 h-[32rem] md:w-80 md:h-[40rem]">
                  {/* Main phone mockup with improved shadow and glow effect */}
                  <div className="absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/30 border border-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <Image 
                      src="/assets/three.jpg" 
                      alt="GinieAI App Screenshot" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      style={{ objectFit: 'cover' }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-pink-500/10"
                    ></motion.div>
                  </div>
                  
                  {/* Floating elements with improved animation and style */}
                  <motion.div 
                    initial={{ x: -30, y: -20 }}
                    animate={{ x: [-30, -50, -30], y: [-20, -40, -20], rotate: [0, 5, 0] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut"
                    }}
                    className="absolute -left-16 -top-8 bg-gradient-to-br from-purple-500/90 to-pink-500/90 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-purple-500/20"
                  >
                    <PiFilmReelFill className="text-white text-xl" />
                  </motion.div>
                  <motion.div 
                    initial={{ x: 20, y: 20 }}
                    animate={{ x: [20, 40, 20], y: [20, 40, 20], rotate: [0, -5, 0] }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute -right-12 top-1/4 bg-gradient-to-br from-blue-500/90 to-cyan-500/90 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-blue-500/20"
                  >
                    <AiFillFire className="text-white text-xl" />
                  </motion.div>
                  <motion.div 
                    initial={{ x: -20, y: 20 }}
                    animate={{ x: [-20, -40, -20], y: [20, 40, 20], rotate: [0, -3, 0] }}
                    transition={{ 
                      duration: 4.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -left-12 bottom-1/4 bg-gradient-to-br from-amber-500/90 to-yellow-500/90 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-amber-500/20"
                  >
                    <BsStarFill className="text-white text-xl" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>
        
        {/* App Screenshots Section with improved scrolling and hints */}
        <section id="screenshots" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-800 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ Visual Experience</span>
              </span>
              <h2 className="text-4xl font-bold">
                App <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Screenshots</span>
              </h2>
            </motion.div>
            
            <div className="relative">
              {/* Improved gradient overlay on sides for scrolling indication */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex overflow-x-auto py-8 space-x-8 scrollbar-hide px-6 snap-x">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="flex-shrink-0 w-64 h-[32rem] md:w-72 md:h-[36rem] relative rounded-3xl overflow-hidden shadow-xl shadow-purple-500/30 border border-gray-700 snap-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent/10 z-10"></div>
                  <Image 
                    src="/assets/back3.jpg" 
                    alt="GinieAI App Screenshot" 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-lg font-semibold">Genie AI</h4>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="flex-shrink-0 w-64 h-[32rem] md:w-72 md:h-[36rem] relative rounded-3xl overflow-hidden shadow-xl shadow-purple-500/30 border border-gray-700 snap-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent/10 z-10"></div>
                  <Image 
                    src="/assets/back2.jpg" 
                    alt="GinieAI App Screenshot" 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-lg font-semibold">Movie Page</h4>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="flex-shrink-0 w-64 h-[32rem] md:w-72 md:h-[36rem] relative rounded-3xl overflow-hidden shadow-xl shadow-purple-500/30 border border-gray-700 snap-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent/10 z-10"></div>
                  <Image 
                    src="/assets/four.jpg" 
                    alt="GinieAI App Screenshot" 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-lg font-semibold">Search Results</h4>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="flex-shrink-0 w-64 h-[32rem] md:w-72 md:h-[36rem] relative rounded-3xl overflow-hidden shadow-xl shadow-purple-500/30 border border-gray-700 snap-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent/10 z-10"></div>
                  <Image 
                    src="/assets/back1.jpg" 
                    alt="GinieAI App Screenshot" 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-lg font-semibold">Cast Details</h4>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="flex-shrink-0 w-64 h-[32rem] md:w-72 md:h-[36rem] relative rounded-3xl overflow-hidden shadow-xl shadow-purple-500/30 border border-gray-700 snap-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent/10 z-10"></div>
                  <Image 
                    src="/assets/one.jpg" 
                    alt="GinieAI App Screenshot" 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-lg font-semibold">Trending Section</h4>
                  </div>
                </motion.div>
              </div>

              {/* Added scroll indicator arrows */}
              <div className="hidden md:flex justify-center items-center mt-6 space-x-4">
                <motion.div 
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5], x: [-5, 0, -5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-purple-400 text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Scroll</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5], x: [5, 0, 5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-purple-400 text-sm flex items-center"
                >
                  <span>Scroll</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with improved cards and hover effects */}
        <section id="features" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-800 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ Powerful Features</span>
              </span>
              <h2 className="text-4xl font-bold">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">GinieAI</span>?
              </h2>
            </motion.div>
            
            {/* Improved feature cards with enhanced hover effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-gray-700 hover:border-purple-500/50 group relative overflow-hidden"
                >
                  {/* Background glow effect on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 z-0"
                  ></motion.div>
                  
                  {/* Feature icon with improved styling */}
                  <div className="mb-6 p-3 bg-gray-900 rounded-xl inline-block group-hover:bg-gradient-to-br from-purple-600 to-pink-600 transition-all duration-300 relative z-10">
                    {feature.icon}
                  </div>
                  
                  {/* Feature title with animated gradient text on hover */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300 relative z-10">
                    {feature.title}
                  </h3>
                  
                  {/* Feature description */}
                  <p className="text-gray-400 relative z-10">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section with improved styling */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/50 to-purple-800/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-800/30 text-center relative overflow-hidden group"
              >
                {/* Animated background effect */}
                <motion.div 
                  initial={{ y: '100%', opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent z-0"
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 relative z-10">
                  5M+
                </h3>
                <p className="text-gray-300 relative z-10">Movies & Shows</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-pink-900/50 to-pink-800/10 backdrop-blur-sm p-6 rounded-2xl border border-pink-800/30 text-center relative overflow-hidden group"
              >
                {/* Animated background effect */}
                <motion.div 
                  initial={{ y: '100%', opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent z-0"
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-600 relative z-10">
                  4K
                </h3>
                <p className="text-gray-300 relative z-10">Resolution</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/50 to-blue-800/10 backdrop-blur-sm p-6 rounded-2xl border border-blue-800/30 text-center relative overflow-hidden group"
              >
                {/* Animated background effect */}
                <motion.div 
                  initial={{ y: '100%', opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent z-0"
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 relative z-10">
                  10K+
                </h3>
                <p className="text-gray-300 relative z-10">New Titles Monthly</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-amber-900/50 to-amber-800/10 backdrop-blur-sm p-6 rounded-2xl border border-amber-800/30 text-center relative overflow-hidden group"
              >
                {/* Animated background effect */}
                <motion.div 
                  initial={{ y: '100%', opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent z-0"
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 relative z-10">
                  {downloadCount.toLocaleString()}+
                </h3>
                <p className="text-gray-300 relative z-10">Happy Users</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with improved cards */}
        <section className="py-16 bg-gradient-to-b from-gray-800 to-purple-900/60">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-800 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ User Love</span>
              </span>
              <h2 className="text-4xl font-bold">
                What Users <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Say</span>
              </h2>
            </motion.div>
            
            {/* Improved testimonial cards with animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  content: "GinieAI has completely transformed how I watch movies. The interface is intuitive and the streaming quality is exceptional!",
                  author: "Sarah K."
                },
                {
                  content: "The offline download feature is a game-changer. I can watch my favorite shows during flights or when I'm away from WiFi.",
                  author: "Raj M."
                },
                {
                  content: "GinieAI has the most extensive library I've seen. The recommendation engine is spot on and I always find something new to watch.",
                  author: "Michael T."
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800/70 to-purple-900/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-800/20 relative overflow-hidden group"
                >
                  {/* Decorative quote mark */}
                  <div className="absolute -right-4 -top-4 text-purple-500/10 text-8xl font-serif">
                    "
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="text-yellow-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="mr-1" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial content */}
                  <p className="text-gray-300 mb-4 relative z-10">"{testimonial.content}"</p>
                  <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 relative z-10">- {testimonial.author}</p>
                  
                  {/* Subtle glow effect on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent"
                  ></motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section with improved UI and Google Drive link */}
        <section id="download" className="py-24 bg-gradient-to-b from-purple-900/60 to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-800 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ Get Started</span>
              </span>
              <h2 className="text-4xl font-bold">
                Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">GinieAI</span> Now
              </h2>
              <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
                Join thousands of users enjoying unlimited entertainment. Get access to thousands of movies and TV shows instantly.
              </p>
            </motion.div>
            
            {/* Improved download card with animated background */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-purple-900/80 backdrop-blur-sm p-8 rounded-3xl max-w-4xl mx-auto border border-purple-800/30 shadow-xl shadow-purple-500/20 relative overflow-hidden"
            >
              {/* Animated background elements */}
              <motion.div 
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5] 
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear" 
                }}
                className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              ></motion.div>
              <motion.div 
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3] 
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear"
                }}
                className="absolute -left-20 -bottom-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
              ></motion.div>
              
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Experience the magic of entertainment
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Access thousands of movies, TV shows, and exclusive content on any device. Download for offline viewing and enjoy high-quality streaming.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                      onClick={handleDownload} 
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25"
                    >
                      <FaDownload className="mr-2" />
                      Download APK
                    </button>
                    <a 
                      href="https://github.com/NiladriHazra" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                    >
                      <FaGithub className="mr-2" />
                      GitHub
                    </a>
                  </div>
                </div>
                
                <div className="md:w-1/2 flex justify-center">
                  <motion.div 
                    whileHover={{ rotateY: 10, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-64 h-64 md:w-80 md:h-80 relative"
                  >
                    {/* App icon with animated glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-75"></div>
                    <div className="relative w-full h-full">
                      <Image 
                        src="/assets/ginie2.png" 
                        alt="GinieAI App Icon" 
                        fill
                        sizes="(max-width: 768px) 256px, 320px"
                        style={{ objectFit: 'contain' }}
                      />
                      <motion.div 
                        animate={{ 
                          opacity: [0.5, 0.8, 0.5],
                          scale: [0.98, 1, 0.98],
                        }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Download counter and thank you message with improved styling */}
              <div className="mt-8 text-center relative z-10">
                <p className="text-gray-400">Join {downloadCount.toLocaleString()}+ users who've already downloaded GinieAI</p>
                
                <AnimatePresence>
                  {showThankYou && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 inline-block border border-green-500/20"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Thank you for downloading GinieAI! Redirecting to Google Drive...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section with improved styling and animations */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-800 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ FAQ</span>
              </span>
              <h2 className="text-4xl font-bold">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Questions</span>
              </h2>
            </motion.div>
            
            {/* Improved FAQ cards with hover effects */}
            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "How do I install GinieAI?",
                  answer: "After downloading the APK file from Google Drive, open it on your Android device. You may need to allow installation from unknown sources in your settings. Follow the on-screen instructions to complete the installation."
                },
                {
                  question: "Is GinieAI available for iOS?",
                  answer: "Currently, GinieAI is only available for Android devices. We're working on an iOS version which will be released soon."
                },
                {
                  question: "Can I download content for offline viewing?",
                  answer: "Yes! GinieAI allows you to download movies and TV shows for offline viewing. Simply tap the download icon on any content page."
                },
                {
                  question: "How often is new content added?",
                  answer: "We add new movies and TV shows every week, with major content updates happening monthly."
                },
                {
                  question: "Is GinieAI free to use?",
                  answer: "GinieAI offers both free and premium tiers. The free tier gives you access to thousands of titles with ads, while the premium subscription removes ads and unlocks exclusive content."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="mb-6 bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 flex items-center">
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 15, 0, -15, 0] }}
                      transition={{ duration: 1, delay: 1 + index * 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer with improved styling */}
        <footer className="bg-gradient-to-t from-gray-900 to-gray-900/90 border-t border-gray-800/50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="w-10 h-10 relative mr-3"
                >
                  <Image 
                    src="/assets/ginie2.png" 
                    alt="GinieAI Logo" 
                    fill
                    sizes="40px"
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  GinieAI
                </h2>
              </div>
              
              <div className="flex space-x-6 mb-6 md:mb-0">
                <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Features</a>
                <a href="#screenshots" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Screenshots</a>
                <a href="#download" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Download</a>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="https://x.com/PixelNiladri" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-600 transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="https://github.com/pixelniladri" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
            
            <div className="text-center mt-8 text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} GinieAI. All rights reserved.</p>
              <p className="mt-2">Designed with ❤️ by PixelNiladri</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Page;