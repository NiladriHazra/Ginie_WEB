"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  FaDownload,
  FaPlay,
  FaChevronRight,
  FaGithub,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import {
  BsFilm,
  BsStarFill,
  BsLightningChargeFill,
  BsShieldCheck,
} from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import {
  MdOutlineDevices,
  MdOutlineHighQuality,
  MdDownload,
  MdSpeed,
} from "react-icons/md";
import { IoMdGlobe } from "react-icons/io";
import { HiOutlineCursorClick } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import { PiFilmReelFill } from "react-icons/pi";
import { MdOutlineMoodBad, MdOutlineMood } from "react-icons/md";
import { BiSearchAlt, BiMoviePlay, BiCameraMovie } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { RiNetflixFill, RiMovieLine } from "react-icons/ri";

const Page = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const screenshotsRef = useRef(null);
  const aiRef = useRef(null);
  const testimonialsRef = useRef(null);
  const downloadRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.1 });

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // App categories for filtering
  const categories = ["all", "movies", "tv shows", "my list"];

  // Moods for mood-based recommendation
  const moods = [
    { id: 1, name: "Happy", color: "#FFD700", icon: "emoticon-happy-outline" },
    { id: 2, name: "Sad", color: "#4169E1", icon: "emoticon-sad-outline" },
    {
      id: 3,
      name: "Excited",
      color: "#FF4500",
      icon: "emoticon-excited-outline",
    },
    { id: 4, name: "Relaxed", color: "#20B2AA", icon: "emoticon-outline" },
    {
      id: 5,
      name: "Scared",
      color: "#9932CC",
      icon: "emoticon-scared-outline",
    },
    { id: 6, name: "Romantic", color: "#FF69B4", icon: "heart-outline" },
  ];

  // Enhanced features list with more details
  const features = [
    {
      icon: <RiMovieLine className="text-purple-500 text-4xl" />,
      title: "AI-Powered Discovery",
      description:
        "Personalized movie and TV show recommendations based on your preferences and viewing history.",
      category: "ai",
    },
    {
      icon: <MdOutlineMood className="text-amber-500 text-4xl" />,
      title: "Mood-Based Suggestions",
      description:
        "Get content recommendations based on how you're feeling right now - happy, sad, excited, or relaxed.",
      category: "ai",
    },
    {
      icon: <PiFilmReelFill className="text-emerald-500 text-4xl" />,
      title: "Extensive Library",
      description:
        "Access thousands of movies and TV shows from various genres, updated daily with new content.",
      category: "content",
    },
    {
      icon: <BiSearchAlt className="text-blue-500 text-4xl" />,
      title: "Smart Search",
      description:
        "Find exactly what you want with our advanced search feature including voice recognition.",
      category: "tech",
    },
    {
      icon: <BsShieldCheck className="text-indigo-500 text-4xl" />,
      title: "Ask Ginie AI",
      description:
        "Chat with our AI assistant for personalized recommendations and answers about any movie or show.",
      category: "ai",
    },
    {
      icon: <AiFillFire className="text-pink-500 text-4xl" />,
      title: "Trending Content",
      description:
        "Discover what's popular in the community with real-time trending movies and shows.",
      category: "content",
    },
    {
      icon: <MdOutlineDevices className="text-cyan-500 text-4xl" />,
      title: "Multi-device Sync",
      description:
        "Seamlessly access your watchlist and recommendations across all your devices.",
      category: "tech",
    },
    {
      icon: <RiUserSettingsLine className="text-violet-500 text-4xl" />,
      title: "Personalized Profiles",
      description:
        "Create multiple profiles for different family members with individual recommendations.",
      category: "personalization",
    },
  ];

  // Screenshots with more details
  const screenshots = [
    {
      image: "/assets/images/home.jpg",
      title: "Home Dashboard",
      description:
        "Personalized content recommendations based on your viewing history and preferences.",
    },
    {
      image: "/assets/images/ai.jpg",
      title: "AI Assistant",
      description:
        "Chat with Ginie AI to get personalized movie and TV show recommendations.",
    },
    {
      image: "/assets/images/genieai.jpg",
      title: "Mood-Based Recommendations",
      description:
        "Get content suggestions based on your current emotional state.",
    },
    {
      image: "/assets/images/movie.jpg",
      title: "Detailed Content View",
      description:
        "Access comprehensive information about movies and shows including cast, ratings, and similar titles.",
    },
    
    {
      image: "/assets/images/search.jpg",
      title: "Advanced Search",
      description:
        "Find exactly what you want with filters for genre, rating, release year, and more.",
    },
    {
      image: "/assets/images/similar.jpg",
      title: "Similar Movies",
      description:
        "Discover movies and shows similar to what you love, based on genre, cast, and themes.",
    },
    
  ];

  // Sample AI conversations to showcase the AI assistant
  const aiConversations = [
    {
      question: "Find me some sci-fi movies with time travel",
      answer:
        "Based on your request, here are some top sci-fi movies featuring time travel concepts:\n\n1. Interstellar (2014)\n2. Edge of Tomorrow (2014)\n3. Looper (2012)\n4. Source Code (2011)\n5. Tenet (2020)\n\nWould you like more recommendations or specific details about any of these movies?",
    },
    {
      question: "Recommend movies similar to Interstellar",
      answer:
        "If you enjoyed Interstellar, you might like these similar movies:\n\n1. Arrival (2016) - Another cerebral sci-fi with themes of time\n2. The Martian (2015) - Space survival with scientific accuracy\n3. Gravity (2013) - Tense space thriller with stunning visuals\n4. Ad Astra (2019) - Space exploration with emotional depth\n5. Contact (1997) - First contact story with philosophical themes\n\nWould you like to know more about any of these?",
    },
    {
      question: "I'm feeling sad, what should I watch?",
      answer:
        "When you're feeling down, these movies might help lift your spirits:\n\n1. The Secret Life of Walter Mitty - An uplifting adventure\n2. Soul - Pixar's heartwarming exploration of purpose\n3. Good Will Hunting - Emotional but ultimately hopeful\n4. The Pursuit of Happyness - Inspiring true story\n5. Little Miss Sunshine - Quirky comedy with heart\n\nSometimes watching a touching film can be cathartic and help process emotions.",
    },
  ];

  // Testimonials with more details
  const testimonials = [
    {
      content:
        "Ginie AI has completely transformed how I discover movies. The mood-based recommendations are spot-on and the AI assistant feels like having a film expert in my pocket. I've discovered so many hidden gems I would have never found otherwise.",
      author: "Sarah K.",
      role: "Film Enthusiast",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    },
    {
      content:
        "As someone who travels frequently, finding good content quickly is essential. Ginie's AI understands my taste perfectly and the clean interface makes browsing effortless. The personalized recommendations have been incredibly accurate.",
      author: "Michael T.",
      role: "Business Traveler",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      content:
        "I've tried many movie apps, but Ginie AI is in a league of its own. The AI chat feature is brilliant - I can describe vague movie plots and it figures out exactly what I'm looking for. My entire family uses it and we each get our own tailored recommendations.",
      author: "Raj M.",
      role: "Tech Blogger",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
      content:
        "The mood-based recommendation system is genius! On days when I'm feeling down, Ginie suggests uplifting movies that genuinely help improve my mood. It's like the app understands not just what I want to watch but what I need to watch.",
      author: "Elena D.",
      role: "Psychologist & Film Lover",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  ];

  // FAQs with more relevant questions
  const faqs = [
    {
      question: "What makes Ginie AI different from other movie apps?",
      answer:
        "Ginie AI combines advanced AI recommendations with emotional intelligence. Unlike other apps that just suggest content based on genre, Ginie offers mood-based recommendations, has a conversational AI assistant you can chat with, and learns your preferences over time to deliver increasingly personalized suggestions. Our app also analyzes your watchlist to offer insights about your viewing patterns.",
    },
    {
      question: "How does the mood-based recommendation work?",
      answer:
        "Our mood-based recommendation system uses a combination of content analysis and emotional psychology. When you select a mood (like happy, sad, excited, or relaxed), our AI analyzes thousands of films for emotional tone, pacing, narrative arcs, and other factors to suggest content that will either complement or help shift your current emotional state, depending on what would benefit you most.",
    },
    {
      question: "Can I use Ginie AI on multiple devices?",
      answer:
        "Yes! Ginie AI is available on Android, iOS, and web browsers. Your account syncs seamlessly across all platforms, so your watchlist, preferences, and recommendations are always up to date no matter which device you're using.",
    },
    {
      question: "How often is the content library updated?",
      answer:
        "We add new movies and shows every day. Our system automatically incorporates new releases as they become available on major platforms, and our content team curates special collections regularly. Premium releases typically arrive within weeks of their theatrical or streaming premiere.",
    },
    {
      question: "Is my viewing data secure with Ginie AI?",
      answer:
        "Absolutely! We take data privacy very seriously. All user data is encrypted and stored securely. Your viewing habits and preferences are only used to improve your personal recommendations and are never sold to third parties. You can review and manage your data in the privacy settings of the app at any time.",
    },
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
    window.open(
      "https://drive.google.com/file/d/1Sj2wkoRtmJajaYT_fekKH3TDkR5Df2p7/view",
      "_blank"
    );
  };

  // Handle mood selection
  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId === selectedMood ? null : moodId);
  };

  // Enhanced loading screen
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-purple-950">
        <motion.div className="relative flex items-center justify-center w-36 h-36 mb-10">
          {/* App logo with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute z-20 w-28 h-28 rounded-full overflow-hidden"
          >
            <Image
              src="/assets/logo3.png"
              alt="Ginie AI Logo"
              fill
              loading="lazy"
              unoptimized={true}
              sizes="96px"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          {/* Animated rings around the logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1.2 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-full h-full rounded-full border-4 border-purple-500"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.4 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.2,
            }}
            className="absolute w-full h-full rounded-full border-4 border-pink-500"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.6 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.4,
            }}
            className="absolute w-full h-full rounded-full border-4 border-indigo-500"
          ></motion.div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Loading Ginie AI...
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
        <title>Ginie AI - AI-Powered Movie Discovery App</title>
        <meta
          name="description"
          content="Discover your next favorite movie with Ginie AI - the ultimate movie discovery app with AI-powered recommendations, mood-based suggestions, and personalized content."
        />
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
                  src="/assets/logo3.png"
                  alt="Ginie AI Logo"
                  fill
                  loading="lazy"
                  unoptimized={true}
                  sizes="40px"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Ginie AI
              </h1>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="#features"
                className="nav-link relative transition-colors duration-300"
              >
                Features
              </a>
              <a
                href="#ai"
                className="nav-link relative transition-colors duration-300"
              >
                AI Assistant
              </a>
              <a
                href="#screenshots"
                className="nav-link relative transition-colors duration-300"
              >
                Screenshots
              </a>
              <a
                href="#testimonials"
                className="nav-link relative transition-colors duration-300"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="nav-link relative transition-colors duration-300"
              >
                FAQ
              </a>
              <a
                href="https://x.com/PixelNiladri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                <FaTwitter className="mr-2" />
                <span>@PixelNiladri</span>
              </a>
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-6 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                <FaDownload className="mr-2" />
                Download
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                <FaDownload className="mr-2" size={14} />
                <span className="text-sm">Download</span>
              </button>
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
                animate={{ height: "auto", opacity: 1 }}
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
                    href="#ai"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-purple-400 transition-colors"
                  >
                    AI Assistant
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
                    x: Math.random() * 100 - 50 + "%",
                    y: Math.random() * 100 - 50 + "%",
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: Math.random() * 0.3 + 0.1,
                  }}
                  animate={{
                    x: [
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                    ],
                    y: [
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                    ],
                    opacity: [
                      Math.random() * 0.3 + 0.1,
                      Math.random() * 0.2 + 0.05,
                    ],
                  }}
                  transition={{
                    duration: Math.random() * 20 + 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    width: Math.random() * 400 + 200 + "px",
                    height: Math.random() * 400 + 200 + "px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content container with enhanced layout */}
          <div className="container mx-auto px-4 z-10 py-20">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
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
                  <span className="text-purple-300 font-medium text-sm">
                    ✨ AI-Powered Movie Discovery
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  Your Movie <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">
                    Ginie
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-gray-300 text-xl mb-8 max-w-lg"
                >
                  Discover your next favorite movie with our AI-powered
                  recommendations, mood-based suggestions, and personalized
                  watchlist.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex flex-wrap gap-4 items-center"
                >
                  <button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
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
                      <div className="font-medium">4.9/5.0</div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
                    <div className="mr-3 text-purple-500">
                      <GiBrain className="text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Powered by</div>
                      <div className="font-medium">AI Technology</div>
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
                      src="/assets/images/genieai.jpg"
                      alt="Ginie AI App Screenshot"
                      fill
                      sizes="(max-width: 768px) 288px, 320px"
                      priority
                      style={{ objectFit: "cover" }}
                    />

                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-xl z-20"></div>

                    {/* Screen reflection overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.1, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"
                    ></motion.div>
                  </div>

                  {/* Decorative elements floating around the phone */}
                  <motion.div
                    initial={{ x: -30, y: -20 }}
                    animate={{
                      x: [-30, -45, -30],
                      y: [-20, -35, -20],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -left-16 top-20 bg-gradient-to-br from-purple-500/90 to-pink-500/90 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-purple-500/20"
                  >
                    <BiMoviePlay className="text-white text-2xl" />
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, y: 20 }}
                    animate={{
                      x: [20, 40, 20],
                      y: [20, 0, 20],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute -right-12 top-1/3 bg-gradient-to-br from-blue-500/90 to-cyan-500/90 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-blue-500/20"
                  >
                    <GiBrain className="text-white text-2xl" />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, y: 20 }}
                    animate={{
                      x: [-20, -35, -20],
                      y: [20, 35, 20],
                      rotate: [0, -3, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute -left-12 bottom-1/3 bg-gradient-to-br from-amber-500/90 to-yellow-500/90 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-amber-500/20"
                  >
                    <MdOutlineMood className="text-white text-2xl" />
                  </motion.div>

                  {/* Pill-shaped feature highlight */}
                  <motion.div
                    initial={{ x: 40, y: -20, opacity: 0 }}
                    animate={{
                      x: [40, 60, 40],
                      y: [-20, -35, -20],
                      opacity: 1,
                    }}
                    transition={{
                      delay: 1.2,
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-24 top-24 bg-white/10 backdrop-blur-md rounded-full py-2 px-4 shadow-lg border border-white/20"
                  >
                    <div className="flex items-center">
                      <BsStarFill className="text-yellow-400 mr-2" />
                      <span className="text-sm font-medium">Top Rated</span>
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
                      <AiFillFire className="text-orange-400 mr-2" />
                      <span className="text-sm font-medium">Trending Now</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Secondary smaller device (tablet) positioned in the background */}
                <motion.div
                  initial={{ opacity: 0, x: 80, y: 60 }}
                  animate={{ opacity: 0.9, x: [80, 90, 80], y: [60, 50, 60] }}
                  transition={{
                    delay: 0.7,
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-10 bottom-20 w-56 h-72 rounded-2xl overflow-hidden border-8 border-gray-900 shadow-xl transform rotate-6 hidden md:block"
                >
                  <Image
                    src="/assets/images/search.jpg"
                    alt="Ginie AI on tablet"
                    fill
                    sizes="224px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Curved divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16 text-gray-950"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,120.83,113.73,181.94,88.24,232.62,68.24,323.73,32.45,321.39,56.44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </section>

        {/* Features Section with improved cards and tab filters */}
        <section
          id="features"
          ref={featuresRef}
          className="py-24 bg-gradient-to-b from-gray-950 to-black"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-4">
                <span className="text-purple-300 font-medium text-sm">
                  ✨ APP FEATURES
                </span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Discover the Magic of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">
                  Ginie AI
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Our AI-powered movie discovery app combines cutting-edge
                technology with your personal preferences to create the ultimate
                entertainment experience.
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
              {["all", "ai", "content", "tech", "personalization"].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
              )}
            </motion.div>

            {/* Enhanced feature cards with animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features
                .filter(
                  (feature) =>
                    activeCategory === "all" ||
                    feature.category === activeCategory
                )
                .map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 border border-gray-800 hover:border-purple-500/30 relative overflow-hidden"
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
                    <div className="mb-6 p-4 bg-black/50 rounded-2xl inline-block group-hover:bg-gradient-to-br from-purple-600 to-pink-600 transition-all duration-300 relative z-10 border border-gray-800 group-hover:border-white/20">
                      {feature.icon}
                    </div>

                    {/* Feature title with animated gradient text on hover */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-colors duration-300 relative z-10">
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
                {
                  value: "10K+",
                  label: "Movies & Shows",
                  color: "from-purple-400 to-purple-600",
                },
                {
                  value: "AI",
                  label: "Powered",
                  color: "from-pink-400 to-pink-600",
                },
                {
                  value: "6",
                  label: "Mood Categories",
                  color: "from-blue-400 to-blue-600",
                },
                {
                  value: "24/7",
                  label: "AI Assistant",
                  color: "from-amber-400 to-amber-600",
                },
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

        {/* AI Assistant Section - New */}
        {/* AI Assistant Section - Enhanced with stunning visuals */}
<section id="ai" ref={aiRef} className="py-24 bg-black relative overflow-hidden">
  {/* Enhanced animated background */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-full h-full bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
    
    {/* Animated floating particles */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        initial={{
          x: Math.random() * 100 - 50 + '%',
          y: Math.random() * 100 + '%',
          scale: Math.random() * 0.2 + 0.1,
          opacity: Math.random() * 0.3 + 0.1
        }}
        animate={{
          y: ['-20%', '120%'],
        }}
        transition={{
          duration: Math.random() * 20 + 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          left: Math.random() * 100 + '%',
          filter: 'blur(1px)',
        }}
      />
    ))}
    
    {/* Large gradient orbs */}
    <motion.div 
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{ 
        repeat: Infinity,
        duration: 25,
        ease: "linear" 
      }}
      className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-full blur-3xl"
    ></motion.div>
    <motion.div 
      animate={{ 
        rotate: -360,
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{ 
        repeat: Infinity,
        duration: 30,
        ease: "linear"
      }}
      className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-full blur-3xl"
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
        <span className="text-purple-300 font-medium text-sm flex items-center justify-center">
          <GiBrain className="mr-2" />
          AI ASSISTANT
        </span>
      </span>
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Chat with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">Ginie AI</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        Our conversational AI assistant helps you discover movies and shows through natural conversation. Just ask what you're in the mood for!
      </p>
    </motion.div>

    {/* AI Chat Showcase - Enhanced visual design */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: Enhanced Chat Interface Mockup */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {/* 3D-style chat interface with glass effect */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10 transform perspective-1000">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl border border-purple-500/30 opacity-60 z-0 animate-pulse"></div>
          
          {/* Chat header with premium styling */}
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 shadow-lg shadow-purple-500/30">
                <GiBrain className="text-white text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Ginie AI</h3>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                  <p className="text-xs text-gray-300">Online now</p>
                </div>
              </div>
            </div>
            
            {/* Premium indicator */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="text-xs font-medium text-white">Premium AI</span>
            </div>
          </div>
          
          {/* Enhanced chat messages with better styling */}
          <div className="p-6 max-h-[500px] overflow-y-auto" style={{background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.4))'}}>
            {/* Welcome message with animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 flex"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 flex-shrink-0 mt-1 shadow-lg shadow-purple-500/20 border border-white/20">
                <GiBrain className="text-white text-xs" />
              </div>
              <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-md px-5 py-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm border border-white/10 shadow-lg">
                <p className="text-gray-100">
                  Hello! I'm Ginie, your AI movie expert. What kind of movies or shows are you looking for today? You can ask me anything about films, directors, or tell me your mood for personalized recommendations.
                </p>
              </div>
            </motion.div>
            
            {/* User question with enhanced styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 px-5 py-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-lg shadow-purple-600/10 border border-purple-500/30 max-w-[85%]">
                  <p className="text-white">{aiConversations[0].question}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center ml-3 flex-shrink-0 mt-1 border border-white/10 shadow-md">
                  <span className="text-xs font-medium text-gray-300">You</span>
                </div>
              </div>
            </motion.div>
            
            {/* AI response with typing animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8 flex"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 flex-shrink-0 mt-1 shadow-lg shadow-purple-500/20 border border-white/20">
                <GiBrain className="text-white text-xs" />
              </div>
              <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-md px-5 py-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm border border-white/10 shadow-lg">
                <div className="typewriter">
                  <p className="text-gray-100 whitespace-pre-line">
                    Based on your request, here are some top sci-fi movies featuring time travel concepts:
                  </p>
                  
                  {/* Movie recommendations with rich formatting */}
                  <div className="mt-4 space-y-3">
                    {[
                      {name: "Interstellar", year: "2014", rating: "8.7/10"},
                      {name: "Edge of Tomorrow", year: "2014", rating: "7.9/10"},
                      {name: "Looper", year: "2012", rating: "7.4/10"},
                      {name: "Source Code", year: "2011", rating: "7.5/10"},
                      {name: "Tenet", year: "2020", rating: "7.3/10"}
                    ].map((movie, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex items-center"
                      >
                        <span className="text-purple-400 mr-2">•</span>
                        <span className="text-white font-medium">{movie.name}</span>
                        <span className="text-gray-400 text-sm ml-2">({movie.year})</span>
                        <div className="ml-auto flex items-center">
                          <BsStarFill className="text-yellow-500 text-xs mr-1" />
                          <span className="text-gray-300 text-sm">{movie.rating}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-gray-200 mt-4">Would you like more recommendations or specific details about any of these movies?</p>
                </div>
              </div>
            </motion.div>
            
            {/* User follow-up question */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mb-6"
            >
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 px-5 py-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-lg shadow-purple-600/10 border border-purple-500/30 max-w-[85%]">
                  <p className="text-white">Tell me more about Interstellar</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center ml-3 flex-shrink-0 mt-1 border border-white/10 shadow-md">
                  <span className="text-xs font-medium text-gray-300">You</span>
                </div>
              </div>
            </motion.div>
            
            {/* AI detailed response */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mb-6 flex"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 flex-shrink-0 mt-1 shadow-lg shadow-purple-500/20 border border-white/20">
                <GiBrain className="text-white text-xs" />
              </div>
              
              {/* Rich movie card response */}
              <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-lg overflow-hidden max-w-[85%]">
                <div className="p-4">
                  <p className="text-gray-100 mb-3">Here's information about Interstellar:</p>
                </div>
                
                {/* Movie card with rich details */}
                <div className="bg-gradient-to-b from-gray-900 to-black/80 rounded-xl overflow-hidden border border-white/5">
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                    <div className="absolute bottom-0 left-0 p-4 z-20">
                      <h4 className="text-xl font-bold text-white">Interstellar</h4>
                      <div className="flex items-center">
                        <span className="text-gray-300 text-sm">2014</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-300 text-sm">PG-13</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-300 text-sm">169 min</span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center z-20">
                      <BsStarFill className="text-yellow-500 mr-1 text-xs" />
                      <span className="text-white text-sm font-medium">8.7/10</span>
                    </div>
                    <div className="w-full h-full bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="inline-block bg-purple-600/20 border border-purple-600/30 text-purple-300 text-xs font-medium px-2 py-1 rounded mr-2 mb-2">Sci-Fi</span>
                      <span className="inline-block bg-blue-600/20 border border-blue-600/30 text-blue-300 text-xs font-medium px-2 py-1 rounded mr-2 mb-2">Adventure</span>
                      <span className="inline-block bg-pink-600/20 border border-pink-600/30 text-pink-300 text-xs font-medium px-2 py-1 rounded mb-2">Drama</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">
                      A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Directed by Christopher Nolan and starring Matthew McConaughey, Anne Hathaway, and Jessica Chastain.
                    </p>
                    
                    <div className="border-t border-gray-800 pt-3 mt-3">
                      <p className="text-gray-400 text-xs mb-2">Would you like to:</p>
                      <div className="flex flex-wrap gap-2">
                        <button className="bg-purple-600/20 hover:bg-purple-600/30 transition-colors border border-purple-600/30 text-purple-300 text-xs px-3 py-1.5 rounded-full">
                          Watch Trailer
                        </button>
                        <button className="bg-blue-600/20 hover:bg-blue-600/30 transition-colors border border-blue-600/30 text-blue-300 text-xs px-3 py-1.5 rounded-full">
                          See Cast
                        </button>
                        <button className="bg-pink-600/20 hover:bg-pink-600/30 transition-colors border border-pink-600/30 text-pink-300 text-xs px-3 py-1.5 rounded-full">
                          Similar Movies
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Enhanced chat input with animations */}
          <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 px-4 py-4 border-t border-white/10 flex items-center">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 flex items-center group focus-within:border-purple-500/50 focus-within:bg-white/10 transition-all duration-300">
              <input 
                type="text" 
                placeholder="Ask Ginie about movies and shows..."
                className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-gray-500"
              />
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-white transition-colors p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-purple-600/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Decorative elements with enhanced effects */}
        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -right-6 -top-6 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl -z-10"></div>
        
        {/* Floating tech particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/80 z-10"
            initial={{
              x: Math.random() * 300 - 150,
              y: Math.random() * 300 - 150,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              ],
              opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.5 + 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              filter: 'blur(1px)',
            }}
          />
        ))}
      </motion.div>
      
      {/* Right: AI Features & Mood-based Selection with enhanced visuals */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="relative">
          {/* Header with animated highlight */}
          <h3 className="text-2xl font-bold mb-8 inline-block relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Discover the Magic of AI-Powered Recommendations
            </span>
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.div>
          </h3>
          
          {/* Enhanced AI Features with hover effects */}
          <div className="space-y-6 mb-12">
            {[
              {
                icon: <BiSearchAlt className="text-purple-500 text-xl" />,
                title: "Natural Language Search",
                description: "Ask for movies in natural language like 'find me sci-fi movies with time travel' or 'show me comedies with Ryan Reynolds'"
              },
              {
                icon: <MdOutlineMood className="text-cyan-500 text-xl" />,
                title: "Mood-Based Recommendations",
                description: "Tell Ginie how you're feeling and get personalized content that matches your emotional state"
              },
              {
                icon: <BiCameraMovie className="text-pink-500 text-xl" />,
                title: "Movie Expert Knowledge",
                description: "Ask specific questions about actors, directors, plots, or get recommendations similar to your favorite films"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.15 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="flex p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-black/60 backdrop-blur-md border border-white/10 shadow-xl group transition-all duration-300 hover:shadow-purple-500/10 hover:border-purple-500/30"
              >
                <div className="mr-5 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner group-hover:from-purple-900/30 group-hover:to-pink-900/30 transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-all duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Mood-based Selection Preview with glass morphism design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-purple-500/20 transition-all duration-500"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-pink-900/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Decorative corner highlights */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <h4 className="font-bold text-xl mb-6 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                <MdOutlineMood className="text-purple-400 mr-3 text-2xl" />
                How are you feeling today?
              </h4>
              
              {/* Enhanced mood selection UI */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
                {moods.map((mood, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleMoodSelect(mood.id)}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                      selectedMood === mood.id 
                        ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/40 shadow-lg shadow-purple-600/20 border border-purple-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                        selectedMood === mood.id 
                          ? 'bg-gradient-to-br from-purple-500/80 to-pink-500/80 shadow-lg shadow-purple-600/30'
                          : `bg-${mood.color}20`
                      }`}
                      style={{ color: selectedMood === mood.id ? 'white' : mood.color }}
                    >
                      <MdOutlineMood className="text-2xl" />
                    </div>
                    <span className={`text-sm transition-all duration-300 ${
                      selectedMood === mood.id ? 'text-white' : 'text-gray-400'
                    }`}>
                      {mood.name}
                    </span>
                  </motion.button>
                ))}
              </div>
              
              {/* Enhanced mood recommendation preview */}
              <AnimatePresence>
                {selectedMood && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-xl border border-purple-500/30 overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 shadow-lg shadow-purple-500/20">
                            <GiBrain className="text-white text-xs" />
                          </div>
                          <h5 className="font-semibold text-white">Ginie's Mood Recommendations</h5>
                        </div>
                        
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {selectedMood === 1 && "Based on your happy mood, I recommend these uplifting choices to amplify your positive feelings:"}
                          {selectedMood === 2 && "When you're feeling sad, these thoughtfully selected titles can help process emotions:"}
                          {selectedMood === 3 && "For your excited energy, these action-packed adventures would be perfect matches:"}
                          {selectedMood === 4 && "To complement your relaxed state, consider these calming selections:"}
                          {selectedMood === 5 && "When you're feeling scared, these comforting films can help ease anxiety:"}
                          {selectedMood === 6 && "For romantic feelings, these heartwarming stories will resonate with your mood:"}
                        </p>
                        
                        {/* Movie recommendations based on mood */}
                        <div className="mt-4 space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="flex items-center bg-white/5 rounded-lg p-2 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center mr-3">
                                <RiMovieLine className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                              </div>
                              <div className="flex-1">
                                <h6 className="text-sm font-medium text-white">
                                  {selectedMood === 1 && ["The Secret Life of Walter Mitty", "Soul", "Little Miss Sunshine"][i]}
                                  {selectedMood === 2 && ["Good Will Hunting", "The Pursuit of Happyness", "Life is Beautiful"][i]}
                                  {selectedMood === 3 && ["Mad Max: Fury Road", "Mission: Impossible", "John Wick"][i]}
                                  {selectedMood === 4 && ["Lost in Translation", "The Secret Garden", "Her"][i]}
                                  {selectedMood === 5 && ["Coraline", "Spirited Away", "The Nightmare Before Christmas"][i]}
                                  {selectedMood === 6 && ["Before Sunrise", "The Notebook", "La La Land"][i]}
                                </h6>
                              </div>
                              <div className="flex items-center">
                                <BsStarFill className="text-yellow-500 text-xs mr-1" />
                                <span className="text-gray-400 text-xs">
                                  {(Math.random() * 2 + 7).toFixed(1)}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* See more button */}
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300"
                        >
                          <span>See All Recommendations</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Try it now button with animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-center"
          >
            <motion.button 
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full shadow-lg flex items-center justify-center mx-auto transition-all duration-300"
            >
              <FaDownload className="mr-2" />
              Get Ginie AI Now
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
  
  
</section>

        {/* Screenshots Section with 3D carousel */}
        <section
          id="screenshots"
          ref={screenshotsRef}
          className="py-24 bg-gradient-to-b from-black to-gray-950 relative"
        >
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
                <span className="text-purple-300 font-medium text-sm">
                  ✨ APP SHOWCASE
                </span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Beautiful{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">
                  Interface
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Experience our thoughtfully designed UI that combines aesthetics
                with functionality for an immersive movie discovery journey.
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
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pb-8">
                          <h4 className="text-xl font-semibold mb-2">
                            {screenshots[currentSlide].title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {screenshots[currentSlide].description}
                          </p>
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
                    initial={{
                      opacity: 0,
                      x: -180,
                      y: 40,
                      scale: 0.8,
                      rotateY: 30,
                    }}
                    animate={{
                      opacity: 0.7,
                      x: -180,
                      y: 40,
                      scale: 0.8,
                      rotateY: 30,
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-72 h-[36rem] rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-xl hidden lg:block z-10"
                  >
                    <Image
                      src={
                        screenshots[
                          (currentSlide - 1 + screenshots.length) %
                            screenshots.length
                        ].image
                      }
                      alt="Previous screenshot"
                      fill
                      sizes="288px"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 180,
                      y: 40,
                      scale: 0.8,
                      rotateY: -30,
                    }}
                    animate={{
                      opacity: 0.7,
                      x: 180,
                      y: 40,
                      scale: 0.8,
                      rotateY: -30,
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-72 h-[36rem] rounded-[2.5rem] overflow-hidden border-8 border-gray-900 shadow-xl hidden lg:block z-10"
                  >
                    <Image
                      src={
                        screenshots[(currentSlide + 1) % screenshots.length]
                          .image
                      }
                      alt="Next screenshot"
                      fill
                      sizes="288px"
                      style={{ objectFit: "cover" }}
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
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 w-6"
                        : "bg-gray-600 hover:bg-gray-500"
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
                  icon: (
                    <MdOutlineHighQuality className="text-purple-500 text-2xl" />
                  ),
                  title: "Elegant Design",
                  description:
                    "Clean, intuitive interface with smooth animations and thoughtful visual hierarchy for effortless navigation.",
                },
                {
                  icon: (
                    <HiOutlineCursorClick className="text-pink-500 text-2xl" />
                  ),
                  title: "Gesture Controls",
                  description:
                    "Swipe, tap, and scroll your way through content with natural, fluid gesture-based interactions.",
                },
                {
                  icon: <MdOutlineDevices className="text-blue-500 text-2xl" />,
                  title: "Cross-platform",
                  description:
                    "Seamless experience across all your devices with perfect synchronization of your preferences.",
                },
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

        {/* Testimonials Section with improved cards */}
        <section
          id="testimonials"
          ref={testimonialsRef}
          className="py-24 bg-gray-950"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-700/50 mb-4">
                <span className="text-purple-300 font-medium text-sm">
                  ✨ USER STORIES
                </span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Users{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">
                  Love
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Join thousands of satisfied users who've transformed how they
                discover movies and TV shows with Ginie AI.
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
                    <p className="text-gray-300 text-lg mb-8 italic">
                      "{testimonial.content}"
                    </p>

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
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
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
                <span className="text-purple-300 font-medium text-sm">
                  ✨ QUESTIONS ANSWERED
                </span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">
                  Questions
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Everything you need to know about Ginie AI and its features.
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

        {/* Download Section with advanced design elements */}
        <section
          id="download"
          ref={downloadRef}
          className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-950 to-black"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-purple-700/10 rounded-full blur-3xl"
            ></motion.div>
            <motion.div
              animate={{
                rotate: [0, -360],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
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
                <span className="text-purple-300 font-medium text-sm">
                  ✨ GET STARTED
                </span>
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Download{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300">
                  Ginie AI
                </span>{" "}
                Now
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                Join the movie discovery revolution. Experience the power of
                AI-driven recommendations and mood-based content suggestions.
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
                    Discover your next favorite movie with AI
                  </h3>
                  <ul className="space-y-4 mb-8">
                    {[
                      {
                        icon: <GiBrain className="text-purple-500" />,
                        text: "AI-powered personalized movie recommendations",
                      },
                      {
                        icon: <MdOutlineMood className="text-pink-500" />,
                        text: "Mood-based content suggestions",
                      },
                      {
                        icon: <BiSearchAlt className="text-blue-500" />,
                        text: "Advanced natural language search",
                      },
                      {
                        icon: <BsShieldCheck className="text-green-500" />,
                        text: "Secure and private experience",
                      },
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    <FaDownload className="mr-2" />
                    Download Now
                  </motion.button>

                  <p className="mt-6 text-gray-500 text-sm">
                    Available for Android, iOS, and Web Browsers
                  </p>
                </div>

                <div className="lg:w-1/2 flex justify-center">
                  {/* 3D mockup of device with app logo */}
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
                              src="/assets/logo3.png"
                              alt="Ginie AI Logo"
                              fill
                              loading="lazy"
                              unoptimized={true}
                              sizes="128px"
                              style={{ objectFit: "cover" }}
                            />
                            <motion.div
                              animate={{
                                opacity: [0.5, 0.8, 0.5],
                                scale: [0.98, 1, 0.98],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut",
                              }}
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Thank you for downloading Ginie AI! Redirecting to Google
                      Drive...
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
                {
                  name: "Android",
                  icon: "M12 5.69l5 2.88v8.43H7V8.57l5-2.88m0-2.69l-6 3.5V18h12V6.5l-6-3.5z",
                },
                {
                  name: "iOS",
                  icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z",
                },
                {
                  name: "Web",
                  icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.36 6.58A8.82 8.82 0 0 1 20 12c0 1.3-.28 2.54-.79 3.66a5 5 0 0 0-3.85-2.07v-.02A2.75 2.75 0 0 1 12.6 11a2.75 2.75 0 0 1-2.75 2.75v.02a5 5 0 0 0-3.85 2.07A8.77 8.77 0 0 1 5.21 12c0-1.19.24-2.32.65-3.37A5 5 0 0 0 12 13a5 5 0 0 0 6.12-4.41c.43 0 .85.04 1.24.11z",
                },
              ].map((device, index) => (
                <div key={index} className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={device.icon}
                    />
                  </svg>
                  <span className="text-sm text-gray-400 mt-2">
                    {device.name}
                  </span>
                </div>
              ))}
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
                      src="/assets/logo3.png"
                      alt="Ginie AI Logo"
                      fill
                      loading="lazy"
                      unoptimized={true}
                      sizes="40px"
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Ginie AI
                  </h2>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Your AI-powered movie discovery companion. Find your next
                  favorite movie through personalized recommendations,
                  mood-based suggestions, and advanced search.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/PixelNiladri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-blue-600/30 transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-blue-600/50"
                  >
                    <FaTwitter className="text-blue-400" />
                  </a>
                  <a
                    href="https://github.com/NiladriHazra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-gray-700/30 transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-gray-600/50"
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
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#ai"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      AI Assistant
                    </a>
                  </li>
                  <li>
                    <a
                      href="#screenshots"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      Screenshots
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      FAQ
                    </a>
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
                      href="https://github.com/NiladriHazra"
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
                &copy; {new Date().getFullYear()} Ginie AI. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-4 md:mt-0">
                Designed with ❤️ by Niladri Hazra
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom CSS for navigation links with underline effect */}
      {/* At the bottom of your component */}
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
  
  /* Add the AI typing animation styles here */
  .typewriter p {
    overflow: hidden;
    border-right: 3px solid transparent;
    white-space: normal;
    margin: 0;
    letter-spacing: 0.15em;
    animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  }
  
  @keyframes typing {
    from { max-width: 0 }
    to { max-width: 100% }
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: transparent }
  }
`}</style>
    </>
  );
};

export default Page;
