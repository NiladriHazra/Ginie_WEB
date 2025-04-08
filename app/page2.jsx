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
  
  {/* Custom CSS for AI chat animations */}
  <style jsx>{`
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
</section>