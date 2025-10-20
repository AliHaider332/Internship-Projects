import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Home, ArrowLeft, Search, Ghost, Satellite, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Floating particles effect
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.3 + 0.2})`
    }));
    setParticles(newParticles);
  }, []);

  // Animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();

    const blobs = [
      { x: 100, y: 100, size: 80, speedX: 0.3, speedY: 0.4, color: 'rgba(59, 130, 246, 0.08)' },
      { x: 300, y: 400, size: 120, speedX: -0.2, speedY: 0.3, color: 'rgba(139, 92, 246, 0.08)' },
      { x: 700, y: 200, size: 100, speedX: 0.4, speedY: -0.5, color: 'rgba(16, 185, 129, 0.08)' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blobs.forEach(blob => {
        blob.x += blob.speedX;
        blob.y += blob.speedY;
        
        if (blob.x < -100 || blob.x > canvas.width + 100) blob.speedX *= -1;
        if (blob.y < -100 || blob.y > canvas.height + 100) blob.speedY *= -1;
        
        ctx.beginPath();
        ctx.filter = 'blur(60px)';
        ctx.fillStyle = blob.color;
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.filter = 'none';
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles]);

  // Update particles position
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
        y: (p.y + p.speedY + window.innerHeight) % window.innerHeight
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const floatingAnimation = {
    y: [0, -20, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden font-sans text-white">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content - Centered properly */}
      <div className="relative z-10 flex items-center justify-center min-h-[100vh] px-4 sm:px-6">
        <div className="text-center w-full max-w-4xl mx-auto py-8">
          {/* Animated Number */}
          <div className="relative mb-8 sm:mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 10,
                duration: 1 
              }}
              className="text-7xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-none"
            >
              404
            </motion.div>
            
            {/* Floating Ghost */}
            <motion.div
              animate={floatingAnimation}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6"
            >
              <Ghost className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-purple-300 opacity-60" />
            </motion.div>

            {/* Floating Satellite */}
            <motion.div
              animate={{
                ...floatingAnimation,
                rotate: [0, 360],
                transition: { ...floatingAnimation.transition, duration: 8 }
              }}
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6"
            >
              <Satellite className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 text-cyan-300 opacity-40" />
            </motion.div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <motion.div
              animate={pulseAnimation}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-2xl border border-white/20 mb-4 sm:mb-6"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              <span className="text-sm sm:text-lg font-semibold text-cyan-100">Oops! Page Lost in Space</span>
            </motion.div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Lost in the Digital Cosmos
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for has drifted into the unknown. 
              Don't worry, even the best explorers get lost sometimes!
            </p>
          </motion.div>

          {/* Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-2xl mx-auto"
          >
            {/* Signal Lost */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              </div>
              <h3 className="font-semibold text-cyan-200 mb-1 text-xs sm:text-sm md:text-base">Signal Lost</h3>
              <p className="text-gray-400 text-xs">URL not found in our galaxy</p>
            </motion.div>

            {/* Navigation Error */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Satellite className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
              </div>
              <h3 className="font-semibold text-purple-200 mb-1 text-xs sm:text-sm md:text-base">Navigation Error</h3>
              <p className="text-gray-400 text-xs">Destination not found</p>
            </motion.div>

            {/* Return Possible */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-lg p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
              </div>
              <h3 className="font-semibold text-green-200 mb-1 text-xs sm:text-sm md:text-base">Return Possible</h3>
              <p className="text-gray-400 text-xs">Safe journey home available</p>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 sm:mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Beam Me Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.history.back()}
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
            </motion.div>
          </motion.div>

          {/* Fun Message - Better positioned */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="px-4"
          >
            <p className="text-gray-400 text-xs sm:text-sm">
              While you're here, enjoy the view of our digital cosmos 🌌
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating Astronaut */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-8 left-4 sm:bottom-12 sm:left-8 opacity-40 text-3xl sm:text-4xl md:text-5xl"
      >
        👨‍🚀
      </motion.div>

      {/* Floating UFO */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-8 right-4 sm:top-12 sm:right-8 opacity-30 text-2xl sm:text-3xl md:text-4xl"
      >
        🛸
      </motion.div>

      {/* Animated Border Glow - Fixed positioning */}
      <motion.div
        animate={{
          boxShadow: [
            'inset 0 0 50px rgba(59, 130, 246, 0.1)',
            'inset 0 0 80px rgba(139, 92, 246, 0.2)',
            'inset 0 0 50px rgba(59, 130, 246, 0.1)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}

export default NotFound;