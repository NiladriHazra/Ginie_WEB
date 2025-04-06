"use client";

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { FaTwitter, FaDownload, FaGithub, FaStar, FaPlay, FaChevronRight } from 'react-icons/fa';
import { BsStarFill, BsLightningChargeFill, BsShieldCheck, BsPhone } from 'react-icons/bs';
import { PiFilmReelFill } from 'react-icons/pi';
import { AiFillFire } from 'react-icons/ai';
import { MdOutlineDevices, MdOutlineHighQuality, MdDownload, MdSpeed } from 'react-icons/md';
import { IoMdGlobe } from 'react-icons/io';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { RiUserSettingsLine } from 'react-icons/ri';

const Page = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const screenshotsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const downloadRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.1 });
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // App categories for filtering
  const categories = ['all', 'movies', 'tv shows', 'kids'];

  // Enhanced features list with more details
  const features = [
    { 
      icon: <PiFilmReelFill className="text-purple-500 text-4xl" />, 
      title: "Extensive Library", 
      description: "Access thousands of movies and TV shows. New titles added everyday.",
      category: 'content'
    },
    { 
      icon: <AiFillFire className="text-amber-500 text-4xl" />, 
      title: "Personalized Recommendations", 
      description: "AI-powered suggestions that learn from your viewing habits to recommend perfect content.",
      category: 'ai'
    },
    { 
      icon: <BsShieldCheck className="text-emerald-500 text-4xl" />, 
      title: "Secure Viewing", 
      description: "End-to-end encryption and private viewing mode to protect your data and preferences.",
      category: 'security'
    },
    { 
      icon: <MdSpeed className="text-blue-500 text-4xl" />, 
      title: "Advanced Streaming Tech", 
      description: "Adaptive bitrate streaming ensures smooth playback even on slower connections.",
      category: 'tech'
    },
    { 
      icon: <MdOutlineDevices className="text-indigo-500 text-4xl" />, 
      title: "Multi-device Sync", 
      description: "Start watching on one device and seamlessly continue on another with perfect synchronization.",
      category: 'tech'
    },
    { 
      icon: <MdDownload className="text-pink-500 text-4xl" />, 
      title: "Offline Viewing", 
      description: "Download your favorite content to watch later without an internet connection.",
      category: 'content'
    },
    { 
      icon: <IoMdGlobe className="text-cyan-500 text-4xl" />, 
      title: "Global Content", 
      description: "Explore international movies and shows with subtitles in multiple languages.",
      category: 'content'
    },
    { 
      icon: <RiUserSettingsLine className="text-violet-500 text-4xl" />, 
      title: "Customizable Profiles", 
      description: "Create profiles for family members with personalized recommendations and parental controls.",
      category: 'personalization'
    }
  ];

  // Expanded screenshots with more details
  const screenshots = [
    {
      image: "/assets/three.jpg",
      title: "Home Dashboard",
      description: "Personalized content recommendations based on your viewing history and preferences."
    },
    {
      image: "/assets/four.jpg",
      title: "Search Experience",
      description: "Advanced search with voice recognition and smart filters to find exactly what you want."
    },
    {
      image: "/assets/one.jpg",
      title: "Trending Content",
      description: "Stay updated with what's popular worldwide in real-time updated charts."
    },
    {
      image: "/assets/back3.jpg",
      title: "Movie Details",
      description: "Rich information including cast, reviews, similar titles and behind-the-scenes content."
    },
    {
      image: "/assets/back2.jpg",
      title: "Video Player",
      description: "Advanced player with gesture controls, subtitle customization, and quality settings."
    },
    {
      image: "/assets/back1.jpg",
      title: "Cast & Crew",
      description: "Explore filmographies and follow your favorite actors, directors, and creators."
    }
  ];

  // Expanded testimonials with more details
  const testimonials = [
    {
      content: "GinieAI has completely transformed my entertainment experience. The interface is stunning, and the AI recommendations are surprisingly accurate. It's like having a personal movie curator!",
      author: "Sarah K.",
      role: "Film Enthusiast",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg"
    },
    {
      content: "As someone who travels frequently, the offline viewing feature is a game-changer. The download speeds are incredible, and the picture quality remains exceptional even on my tablet.",
      author: "Michael T.",
      role: "Business Traveler",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      content: "I've tried many streaming apps, but GinieAI is in a league of its own. The user interface is intuitive, and the content library is vast. My entire family loves it for different reasons!",
      author: "Raj M.",
      role: "Tech Blogger",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg"
    },
    {
      content: "The parental controls are thoughtfully designed, giving me peace of mind when my kids use the app. The children's section is colorful, engaging, and full of quality content.",
      author: "Elena D.",
      role: "Parent & Educator",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];

  // FAQs with more relevant questions
  const faqs = [
    {
      question: "What makes GinieAI different from other streaming apps?",
      answer: "GinieAI combines AI-powered personalization, an extensive content library, and premium viewing features like 4K streaming and Dolby Atmos sound. Our unique recommendation engine learns your preferences to suggest content you'll love."
    },
    {
      question: "How do I install GinieAI on my device?",
      answer: "After downloading the APK file, open it on your Android device. You may need to allow installation from unknown sources in your settings. Follow the on-screen instructions to complete the installation."
    },
    {
      question: "Is GinieAI available on multiple platforms?",
      answer: "Yes! GinieAI is available on Android, iOS, smart TVs (including Samsung, LG, and Android TV), Amazon Fire devices, and web browsers. Your account syncs seamlessly across all platforms."
    },
    // {
    //   question: "How much content can I download for offline viewing?",
    //   answer: "Standard accounts can download up to 25 titles at once across all devices. Premium subscribers enjoy unlimited downloads, higher quality options, and longer storage periods before needing to reconnect to verify your subscription."
    // },
    // {
    //   question: "Does GinieAI support multiple user profiles?",
    //   answer: "Absolutely! You can create up to 5 unique profiles per account, each with personalized recommendations, watchlists, and viewing history. Parental controls allow you to set content restrictions for specific profiles."
    // },
    {
      question: "How often is new content added to GinieAI?",
      answer: "We add new movies and shows every Day. Premium releases typically arrive on the platform within weeks of their theatrical or broadcast premiere. We also regularly add exclusive content produced specifically for GinieAI."
    }
  ];

  useEffect(() => {
    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    // Auto-slide functionality for screenshots
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideInterval);
    };
  }, []);

  // Handle download click with Google Drive link
  const handleDownload = () => {
    // Show thank you message
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    
    // Open Google Drive link in a new tab
    window.open('https://drive.google.com/file/d/1Sj2wkoRtmJajaYT_fekKH3TDkR5Df2p7/view', '_blank');
  };

  // Enhanced loading screen with more animations
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-purple-950">
        <motion.div
          className="relative flex items-center justify-center w-36 h-36 mb-10"
        >
          {/* App logo with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute z-20 w-28 h-28 rounded-full overflow-hidden"
          >
            <Image 
  src="/assets/ginie2.png" 
  alt="GinieAI Logo" 
  fill
  loading="lazy"
  unoptimized={true}  // Add this to stop Next.js optimizations
  sizes="96px"
  style={{ objectFit: 'cover' }}
/>
          </motion.div>
          
          {/* Multiple animated rings around the logo */}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.6 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
            className="absolute w-full h-full rounded-full border-4 border-indigo-500"
          ></motion.div>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Loading GinieAI...
        </motion.h2>
        
        {/* Loading progress bar */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80%", opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 max-w-xs w-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>GinieAI - Premium Entertainment Experience</title>
        <meta name="description" content="Experience entertainment reimagined with GinieAI - the ultimate information platform with AI-powered recommendations, huge library, and thousands of titles." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="relative overflow-x-hidden bg-black text-white">
        {/* Sticky navbar with glass effect */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mr-3 w-10 h-10 relative"
              >
                <Image 
  src="/assets/ginie2.png" 
  alt="GinieAI Logo" 
  fill
  loading="lazy"
  unoptimized={true}  // Add this to stop Next.js optimizations
  sizes="96px"
  style={{ objectFit: 'cover' }}
/>
              </motion.div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                GinieAI
              </h1>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="nav-link relative transition-colors duration-300">Features</a>
              <a href="#screenshots" className="nav-link relative transition-colors duration-300">Screenshots</a>
              <a href="#testimonials" className="nav-link relative transition-colors duration-300">Testimonials</a>
              <a href="#faq" className="nav-link relative transition-colors duration-300">FAQ</a>
              <a 
                href="https://x.com/PixelNiladri" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                <FaTwitter className="mr-2" />
                <span>@PixelNiladri</span>
              </a>
              <a 
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-6 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 cursor-pointer"
              >
                <FaDownload className="mr-2" />
                Download
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <a 
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaDownload className="mr-2" size={14} />
                <span className="text-sm">Download</span>
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-black/80 backdrop-blur-xl border-t border-white/5"
              >
                <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
                  <a 
                    href="#features" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-purple-400 transition-colors"
                  >
                    Features
                  </a>
                  <a 
                    href="#screenshots" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-purple-400 transition-colors"
                  >
                    Screenshots
                  </a>
                  <a 
                    href="#testimonials" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-purple-400 transition-colors"
                  >
                    Testimonials
                  </a>
                  <a 
                    href="#faq" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-purple-400 transition-colors"
                  >
                    FAQ
                  </a>
                  <a 
                    href="https://x.com/PixelNiladri" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400"
                  >
                    <FaTwitter className="mr-2" />
                    <span>@PixelNiladri</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section with enhanced 3D parallax effects */}
        <section 
          ref={heroRef} 
          className="relative min-h-[100vh] bg-black flex items-center pt-16 overflow-hidden"
        >
          {/* Ambient background with animated gradients and particles */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"></div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-purple-500/20 blur-3xl"
                  initial={{
                    x: Math.random() * 100 - 50 + '%',
                    y: Math.random() * 100 - 50 + '%',
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: Math.random() * 0.3 + 0.1
                  }}
                  animate={{
                    x: [
                      Math.random() * 100 - 50 + '%',
                      Math.random() * 100 - 50 + '%'
                    ],
                    y: [
                      Math.random() * 100 - 50 + '%',
                      Math.random() * 100 - 50 + '%'
                    ],
                    opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.2 + 0.05]
                  }}
                  transition={{
                    duration: Math.random() * 20 + 20,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    width: Math.random() * 400 + 200 + 'px',
                    height: Math.random() * 400 + 200 + 'px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content container with enhanced layout */}
          <div className="container mx-auto px-4 z-10 py-20">
            <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
  initial={{ opacity: 1, x: 0 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.8 }}
  className="lg:w-1/2 mb-12 lg:mb-0"
>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-6"
                >
                  <span className="text-purple-300 font-medium text-sm">✨ The Ultimate Entertainment Experience</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  Entertainment <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">
                    Reimagined
                  </span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-gray-300 text-xl mb-8 max-w-lg"
                >
                  Experience the future of entertainment with GinieAI's revolutionary platform. Immersive content, AI-powered recommendations, and stunning 4K quality at your fingertips.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex flex-wrap gap-4 items-center"
                >
                  <button 
                    onClick={handleDownload} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25"
                  >
                    <FaDownload className="mr-2" />
                    Download Now
                  </button>
                  
                  <a 
                    href="#screenshots" 
                    className="group flex items-center text-lg font-medium text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <div className="mr-3 bg-white/10 rounded-full p-3 group-hover:bg-white/20 transition-colors duration-300">
                      <FaPlay className="text-sm" />
                    </div>
                    See it in action
                  </a>
                </motion.div>
                
                {/* App recognition badges */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-12 flex items-center space-x-6"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                    <div className="mr-3">
                      <BsStarFill className="text-yellow-500 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Rated</div>
                      <div className="font-medium">5.0/5.0</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                    <div className="mr-3 text-purple-500">
                      <AiFillFire className="text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Featured in</div>
                      <div className="font-medium">Play Store</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* 3D Device mockups with advanced animations */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ y: heroY }}
                className="lg:w-1/2 flex justify-center relative"
              >
                {/* Main phone mockup */}
                <motion.div 
                  className="relative w-72 h-[36rem] md:w-80 md:h-[40rem]"
                  whileHover={{ rotateY: 5, rotateX: -5 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {/* Phone frame with screen */}
                  <div className="absolute w-full h-full rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-2xl shadow-purple-500/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <Image 
  src="/assets/three.jpg" 
  alt="GinieAI App Screenshot" 
  fill
  sizes="(max-width: 768px) 288px, 320px"
  priority
  style={{ objectFit: 'cover' }}
/>
                    
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-xl z-20"></div>
                    
                    {/* Screen reflection overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.1, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"
                    ></motion.div>
                  </div>
                  
                  {/* Decorative elements floating around the phone */}
                  <motion.div 
                    initial={{ x: -30, y: -20 }}
                    animate={{ x: [-30, -45, -30], y: [-20, -35, -20], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-16 top-20 bg-gradient-to-br from-purple-500/90 to-pink-500/90 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-purple-500/20"
                  >
                    <PiFilmReelFill className="text-white text-2xl" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ x: 20, y: 20 }}
                    animate={{ x: [20, 40, 20], y: [20, 0, 20], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -right-12 top-1/3 bg-gradient-to-br from-blue-500/90 to-cyan-500/90 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-blue-500/20"
                  >
                    <BsLightningChargeFill className="text-white text-2xl" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ x: -20, y: 20 }}
                    animate={{ x: [-20, -35, -20], y: [20, 35, 20], rotate: [0, -3, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-12 bottom-1/3 bg-gradient-to-br from-amber-500/90 to-yellow-500/90 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-amber-500/20"
                  >
                    <BsStarFill className="text-white text-2xl" />
                  </motion.div>
                  
                  {/* Pill-shaped feature highlight */}
                  <motion.div
                    initial={{ x: 40, y: -20, opacity: 0 }}
                    animate={{ x: [40, 60, 40], y: [-20, -35, -20], opacity: 1 }}
                    transition={{ delay: 1.2, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-24 top-24 bg-white/10 backdrop-blur-md rounded-full py-2 px-4 shadow-lg border border-white/20"
                  >
                    <div className="flex items-center">
                      <MdOutlineHighQuality className="text-purple-400 mr-2" />
                      <span className="text-sm font-medium">4K HDR</span>
                    </div>
                  </motion.div>
                  
                  {/* Another pill-shaped feature highlight */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{ delay: 1.5, duration: 4, repeat: Infinity }}
                    className="absolute -right-32 bottom-64 bg-white/10 backdrop-blur-md rounded-full py-2 px-4 shadow-lg border border-white/20"
                  >
                    <div className="flex items-center">
                      <MdDownload className="text-green-400 mr-2" />
                      <span className="text-sm font-medium">Offline Viewing</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Secondary smaller device (tablet) positioned in the background */}
                <motion.div 
                  initial={{ opacity: 0, x: 80, y: 60 }}
                  animate={{ opacity: 0.9, x: [80, 90, 80], y: [60, 50, 60] }}
                  transition={{ delay: 0.7, duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-10 bottom-20 w-56 h-72 rounded-2xl overflow-hidden border-8 border-gray-900 shadow-xl transform rotate-6 hidden md:block"
                >
                  <Image 
                    src="/assets/four.jpg" 
                    alt="GinieAI on tablet" 
                    fill
                    sizes="224px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Curved divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-gray-950">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,94.17,208.18,82.17Z" className="fill-current"></path>
            </svg>
          </div>
        </section>

        {/* Trusted By Section - New premium addition */}
        <section className="py-16 bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <p className="text-gray-400 text-sm uppercase tracking-wider">TRUSTED BY ENTERTAINMENT ENTHUSIASTS</p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {/* Logos of trusted platforms or partners - styled as grayscale for elegance */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-500">IMDB</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-500">Filmfare</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex justify-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-500">TechRadar</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-500">Streaming+</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section with improved cards and tab filters */}
        <section id="features" ref={featuresRef} className="py-24 bg-gradient-to-b from-gray-950 to-black">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ PREMIUM FEATURES</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">GinieAI</span>?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Discover the innovative features that make GinieAI the ultimate entertainment companion, powered by cutting-edge technology.
              </p>
            </motion.div>
            
            {/* Feature category filter tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              {['all', 'content', 'tech', 'ai', 'personalization', 'security'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
            
            {/* Enhanced feature cards with animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features
                .filter(feature => activeCategory === 'all' || feature.category === activeCategory)
                .map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 border border-gray-800 hover:border-purple-500/30 group relative overflow-hidden"
                >
                  {/* Animated gradient background on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 z-0"
                  ></motion.div>
                  
                  {/* Decorative corner element */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                  
                  {/* Feature icon with improved styling */}
                  <div className="mb-6 p-4 bg-black/50 rounded-2xl inline-block group-hover:bg-gradient-to-br from-purple-600 to-pink-600 transition-all duration-300 relative z-10 border border-gray-800 group-hover:border-transparent shadow-lg">
                    {feature.icon}
                  </div>
                  
                  {/* Feature title with animated gradient text on hover */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300 relative z-10">
                    {feature.title}
                  </h3>
                  
                  {/* Feature description */}
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Key metrics section - Showcase impressive numbers */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
            >
              {[
                { value: "5M+", label: "Movies & Shows", color: "from-purple-400 to-purple-600" },
                { value: "4K", label: "Ultra HD", color: "from-pink-400 to-pink-600" },
                { value: "10K+", label: "New Titles Monthly", color: "from-blue-400 to-blue-600" },
                { value: "100+", label: "Countries Available", color: "from-amber-400 to-amber-600" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl py-6 px-4 text-center border border-white/5"
                >
                  <motion.h4
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
                  >
                    {stat.value}
                  </motion.h4>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Screenshots Section with 3D carousel */}
        <section id="screenshots" ref={screenshotsRef} className="py-24 bg-black relative">
          {/* Abstract background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-900/10 to-pink-900/10 rounded-full blur-3xl"
            ></motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-900/10 to-blue-900/10 rounded-full blur-3xl"
            ></motion.div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ VISUAL EXPERIENCE</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Stunning <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">Interface</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Experience our thoughtfully designed UI that combines aesthetics with functionality for an immersive entertainment journey.
              </p>
            </motion.div>

            {/* 3D Screenshot Showcase */}
            <div className="relative mt-20 mb-10 overflow-hidden">
              <div className="flex items-center justify-center pb-20">
                <div className="relative w-full max-w-5xl">
                  {/* Device frame with current screenshot */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative mx-auto w-72 h-[36rem] md:w-80 md:h-[40rem] rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-2xl shadow-purple-500/20 z-30"
                  >
                    {/* Animated screen transition */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image 
                          src={screenshots[currentSlide].image} 
                          alt={screenshots[currentSlide].title}
                          fill
                          sizes="(max-width: 768px) 288px, 320px"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pb-8">
                          <h4 className="text-xl font-semibold mb-2">{screenshots[currentSlide].title}</h4>
                          <p className="text-gray-400 text-sm">{screenshots[currentSlide].description}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-xl z-20"></div>
                    
                    {/* Screen reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
                  </motion.div>
                  
                  {/* Background phones showing previous and next screenshots */}
                  <motion.div
                    initial={{ opacity: 0, x: -180, y: 40, scale: 0.8, rotateY: 30 }}
                    animate={{ opacity: 0.7, x: -180, y: 40, scale: 0.8, rotateY: 30 }}
                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-72 h-[36rem] rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-xl hidden lg:block z-10"
                  >
                    <Image 
                      src={screenshots[(currentSlide - 1 + screenshots.length) % screenshots.length].image}
                      alt="Previous screenshot"
                      fill
                      sizes="288px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 180, y: 40, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 0.7, x: 180, y: 40, scale: 0.8, rotateY: -30 }}
                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-72 h-[36rem] rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-xl hidden lg:block z-10"
                  >
                    <Image 
                      src={screenshots[(currentSlide + 1) % screenshots.length].image}
                      alt="Next screenshot"
                      fill
                      sizes="288px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </motion.div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-3 mt-6">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6' 
                      : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Feature highlights with icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              {[
                {
                  icon: <MdOutlineHighQuality className="text-purple-500 text-2xl" />,
                  title: "Premium Visual Design",
                  description: "Elegant and intuitive interface with smooth animations and thoughtful visual hierarchy."
                },
                {
                  icon: <HiOutlineCursorClick className="text-pink-500 text-2xl" />,
                  title: "Intuitive Navigation",
                  description: "Effortlessly browse through content with gesture-based controls and smart organization."
                },
                {
                  icon: <BsPhone className="text-blue-500 text-2xl" />,
                  title: "Responsive Experience",
                  description: "Perfectly optimized viewing experience across all device sizes and orientations."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/5"
                >
                  <div className="mr-4 p-3 rounded-full bg-white/10">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section with improved cards and slider */}
        <section id="testimonials" ref={testimonialsRef} className="py-24 bg-gradient-to-b from-black to-gray-950">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ USER TESTIMONIALS</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Users <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">Love</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Join thousands of satisfied users who have made GinieAI their go-to entertainment platform.
              </p>
            </motion.div>

            {/* Premium testimonial cards with user avatars and ratings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-purple-900/20 relative overflow-hidden group"
                >
                  {/* Animated background gradient */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 z-0"
                  ></motion.div>
                  
                  {/* Decorative quote mark */}
                  <div className="absolute right-8 top-8 text-purple-500/10 text-9xl font-serif leading-none">
                    "
                  </div>
                  
                  <div className="relative z-10">
                    {/* Star rating */}
                    <div className="flex items-center mb-6">
                      <div className="text-yellow-500 flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="mr-1" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Testimonial content */}
                    <p className="text-gray-300 text-lg mb-8 italic">"{testimonial.content}"</p>
                    
                    {/* User info with avatar */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-purple-500">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                          {testimonial.author}
                        </h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle border glow effect on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 border border-purple-500/30 rounded-2xl"
                  ></motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section with advanced design elements */}
        <section id="download" ref={downloadRef} className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 30,
                ease: "linear" 
              }}
              className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-purple-700/10 rounded-full blur-3xl"
            ></motion.div>
            <motion.div 
              animate={{ 
                rotate: [0, -360],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 40,
                ease: "linear"
              }}
              className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-pink-700/10 rounded-full blur-3xl"
            ></motion.div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ GET STARTED</span>
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">GinieAI</span> Now
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                Join the entertainment revolution. Get access to thousands of movies and TV shows instantly on your device.
              </p>
            </motion.div>
            
            {/* Enhanced download card with 3D elements and device mockups */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black p-12 rounded-3xl max-w-5xl mx-auto border border-purple-800/30 shadow-2xl shadow-purple-500/10 relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Experience the magic of premium entertainment
                  </h3>
                  <ul className="space-y-4 mb-8">
                  {[
                      { icon: <PiFilmReelFill className="text-purple-500" />, text: "Unlimited access to thousands of movies and TV shows" },
                      { icon: <MdOutlineHighQuality className="text-pink-500" />, text: "Premium 4K HDR quality with Dolby audio" },
                      { icon: <MdDownload className="text-blue-500" />, text: "Download content for offline viewing" },
                      { icon: <BsShieldCheck className="text-green-500" />, text: "Secure, private, and ad-free experience" },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-3 p-2 bg-white/10 rounded-full">
                          {item.icon}
                        </span>
                        <span className="text-gray-300">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button 
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-pink-500/25"
                  >
                    <FaDownload className="mr-2" />
                    Download Now
                  </motion.button>
                  
                  <p className="mt-6 text-gray-500 text-sm">
                    Available for Android, iOS, Smart TVs, and Web Browsers
                  </p>
                </div>
                
                <div className="lg:w-1/2 flex justify-center">
                  {/* 3D mockup of multiple devices */}
                  <div className="relative perspective-1000">
                    <motion.div
                      initial={{ rotateY: -10 }}
                      whileHover={{ rotateY: 10 }}
                      transition={{ type: "spring", stiffness: 50 }}
                      className="relative w-64 h-80 md:w-80 md:h-96"
                    >
                      {/* Main phone with app icon */}
                      <div className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-gray-900 shadow-2xl transform rotate-3">
                        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
                          <div className="relative w-32 h-32">
                          <Image 
  src="/assets/ginie2.png" 
  alt="GinieAI Logo" 
  fill
  loading="lazy"
  unoptimized={true}  // Add this to stop Next.js optimizations
  sizes="96px"
  style={{ objectFit: 'cover' }}
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
                        </div>
                      </div>
                      
                      {/* Shadow */}
                      <div className="absolute -bottom-8 inset-x-0 h-2 bg-black/50 blur-md rounded-full transform scale-x-90"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Thank you message with animation */}
              <AnimatePresence>
                {showThankYou && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 inset-x-0 p-6 rounded-b-3xl bg-gradient-to-r from-green-900/70 to-emerald-900/70 backdrop-blur-md border-t border-green-500/20"
                  >
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Thank you for downloading GinieAI! Redirecting to Google Drive...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Device compatibility icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 mt-16"
            >
              {[
                { name: "Android", icon: "M12 5.69l5 2.88v8.43H7V8.57l5-2.88m0-2.69l-6 3.5V18h12V6.5l-6-3.5z" },
                { name: "iOS", icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" },
                { name: "Smart TV", icon: "M21 17H3V5h18m0-2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" },
                { name: "Web", icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.36 6.58A8.82 8.82 0 0 1 20 12c0 1.3-.28 2.54-.79 3.66a5 5 0 0 0-3.85-2.07v-.02A2.75 2.75 0 0 1 12.6 11a2.75 2.75 0 0 1 2.75-2.75c1.53 0 3.53.96 4.01 2.33zm-13.26 7a9.85 9.85 0 0 1-.6-7.36A5.05 5.05 0 0 0 8.57 12v.02a2.75 2.75 0 0 1 2.77 2.73c0 1.64-1.4 2.95-3.13 2.79-1.2-.11-1.83-.8-2.11-1.96zM12 20a9.8 9.8 0 0 1-4.33-.99c.37-.83 1.3-1.61 2.4-1.62a3.96 3.96 0 0 1 3.88 3.32c-.65.19-1.28.29-1.95.29zm4.54-1.31a3.96 3.96 0 0 0-3.87-2.68 5.82 5.82 0 0 0-2.99.9 9.85 9.85 0 0 1-3.47-2.53A4.74 4.74 0 0 0 11.99 9a4.73 4.73 0 0 0-3.82 2.16A9.83 9.83 0 0 1 9.79 4.1 9.96 9.96 0 0 1 20.55 12a9.96 9.96 0 0 1-4.01 6.69z" }
              ].map((device, index) => (
                <div key={index} className="flex flex-col items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="w-8 h-8 text-gray-400"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={device.icon} />
                  </svg>
                  <span className="text-sm text-gray-400 mt-2">{device.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section with premium accordions */}
        <section id="faq" className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-4">
                <span className="text-purple-300 font-medium text-sm">✨ QUESTIONS ANSWERED</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">Questions</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Everything you need to know about GinieAI and its features.
              </p>
            </motion.div>
            
            {/* Enhanced FAQ accordions */}
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6"
                >
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer bg-gray-900 hover:bg-gray-800 p-6 rounded-xl border border-purple-900/20 transition-colors duration-300">
                      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
                        {faq.question}
                      </h3>
                      <div className="ml-4 flex-shrink-0 bg-white/10 p-2 rounded-full group-open:bg-purple-600 transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transform group-open:rotate-180 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </summary>
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-6 pt-0 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-b-xl border-x border-b border-purple-900/20"
                    >
                      <p className="py-6 text-gray-300">{faq.answer}</p>
                    </motion.div>
                  </details>
                </motion.div>
              ))}
            </div>
            
            {/* Still have questions section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center"
            >
              <p className="text-gray-400">Still have questions?</p>
              <a 
                href="https://x.com/PixelNiladri" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Contact our support team
                <FaChevronRight className="ml-2 text-xs" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Footer with improved styling */}
        <footer className="bg-gray-950 border-t border-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Logo and description */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6">
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className="w-10 h-10 relative mr-3"
                  >
                    <Image 
  src="/assets/ginie2.png" 
  alt="GinieAI Logo" 
  fill
  loading="lazy"
  unoptimized={true}  // Add this to stop Next.js optimizations
  sizes="96px"
  style={{ objectFit: 'cover' }}
/>               </motion.div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    GinieAI
                  </h2>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Your ultimate entertainment companion bringing you thousands of movies and TV shows in stunning quality. Experience entertainment like never before.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://x.com/PixelNiladri" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-blue-600/30 transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-blue-600"
                  >
                    <FaTwitter className="text-blue-400" />
                  </a>
                  <a 
                    href="https://github.com/pixelniladri" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-gray-700/30 transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-gray-600"
                  >
                    <FaGithub className="text-white" />
                  </a>
                </div>
              </div>
              
              {/* Quick links */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Features</a>
                  </li>
                  <li>
                    <a href="#screenshots" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Screenshots</a>
                  </li>
                  <li>
                    <a href="#testimonials" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Testimonials</a>
                  </li>
                  <li>
                    <a href="#faq" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">FAQ</a>
                  </li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Contact</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <a 
                      href="https://x.com/PixelNiladri" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
                    >
                      <FaTwitter className="mr-2" />
                      @PixelNiladri
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/pixelniladri" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300 transition-colors duration-300 flex items-center"
                    >
                      <FaGithub className="mr-2" />
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} GinieAI. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-4 md:mt-0">
                Designed with ❤️ by Niladri Hazra
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom CSS for navigation links with underline effect */}
      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #a78bfa, #ec4899);
          transition: width 0.3s ease;
        }
        .nav-link:hover {
          color: white;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Page;