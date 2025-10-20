import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Star, Zap, Heart, Code, Globe, Rocket, Users, Target, Quote, Calendar, Award } from 'lucide-react';

function About() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  // Animated blob effect
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
      { x: 100, y: 100, size: 120, speedX: 0.5, speedY: 0.7, color: 'rgba(59, 130, 246, 0.15)' },
      { x: 300, y: 400, size: 180, speedX: -0.3, speedY: 0.5, color: 'rgba(139, 92, 246, 0.15)' },
      { x: 700, y: 200, size: 150, speedX: 0.4, speedY: -0.6, color: 'rgba(16, 185, 129, 0.15)' },
      { x: 900, y: 500, size: 200, speedX: -0.7, speedY: 0.3, color: 'rgba(245, 158, 11, 0.15)' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blobs.forEach(blob => {
        // Update position
        blob.x += blob.speedX;
        blob.y += blob.speedY;
        
        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.speedX *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.speedY *= -1;
        
        // Mouse interaction
        const dx = mousePosition.x - blob.x;
        const dy = mousePosition.y - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200 && isHovering) {
          blob.x -= dx * 0.02;
          blob.y -= dy * 0.02;
        }
        
        // Draw blob with gooey effect
        ctx.beginPath();
        ctx.filter = 'blur(40px)';
        ctx.fillStyle = blob.color;
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
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
  }, [mousePosition, isHovering]);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const stats = [
    { number: '50+', label: 'Projects Completed', icon: Rocket },
    { number: '3+', label: 'Years Experience', icon: Star },
    { number: '25+', label: 'Happy Clients', icon: Users },
    { number: '99%', label: 'Success Rate', icon: Target },
  ];

  const skills = [
    { name: 'React & Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js & Express', level: 88, color: 'from-green-500 to-emerald-500' },
    { name: 'Python & AI/ML', level: 85, color: 'from-yellow-500 to-orange-500' },
    { name: 'UI/UX Design', level: 92, color: 'from-purple-500 to-pink-500' },
    { name: 'Cloud & DevOps', level: 80, color: 'from-indigo-500 to-blue-500' },
    { name: 'Mobile Development', level: 78, color: 'from-red-500 to-pink-500' },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      content: 'Ali transformed our web application with his expertise in React and AI integration. The results exceeded our expectations and user engagement increased by 40%.',
      rating: 5,
      project: 'E-commerce Platform',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Startup Founder',
      content: 'Working with Ali was a game-changer for our startup. His AI-powered solutions helped us automate processes and scale efficiently. Highly recommended!',
      rating: 5,
      project: 'AI Automation System',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content: 'The portfolio website Ali built for our agency is stunning. His attention to detail and creative approach made all the difference. Absolutely brilliant work!',
      rating: 5,
      project: 'Agency Portfolio',
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'CTO at FinTech Solutions',
      content: 'Outstanding developer with deep expertise in both frontend and AI technologies. Delivered our complex project ahead of schedule with exceptional quality.',
      rating: 5,
      project: 'Financial Dashboard',
      avatar: '👨‍💼'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 relative overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-blue-200 shadow-lg mb-8"
          >
            <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="text-blue-700 font-semibold">Full Stack Developer & AI Enthusiast</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Ali</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I create <span className="font-semibold text-blue-600">digital experiences</span> that blend cutting-edge technology with 
            beautiful design. Passionate about AI, web development, and pushing the boundaries of what's possible.
          </p>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-3xl border border-gray-200/60 shadow-lg text-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-500 to-purple-500' : 'from-green-500 to-emerald-500'} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Client Reviews</h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200/60 shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="text-4xl sm:text-5xl">{reviews[currentReview].avatar}</div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{reviews[currentReview].name}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{reviews[currentReview].role}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-2 sm:mt-0">
                      {renderStars(reviews[currentReview].rating)}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Quote className="w-8 h-8 text-blue-200 absolute -top-2 -left-2" />
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed pl-6">
                      "{reviews[currentReview].content}"
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Project: {reviews[currentReview].project}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentReview 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16 sm:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Continuously learning and mastering new technologies to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-lg p-4 sm:p-6 rounded-3xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-800 text-base sm:text-lg">{skill.name}</span>
                  <span className="text-blue-600 font-bold text-sm sm:text-base">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 1, type: "spring" }}
                    className={`h-2 sm:h-3 rounded-full bg-gradient-to-r ${skill.color} shadow-lg`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-3xl border border-gray-200/60 shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">My Journey</h2>
            <div className="text-base sm:text-lg text-gray-700 leading-relaxed space-y-3 sm:space-y-4">
              <p>
                Started with a curiosity about how things work, which evolved into a passion for creating 
                digital solutions that make a difference. From my first "Hello World" to building complex 
                AI-powered applications, every step has been a learning adventure.
              </p>
              <p>
                I believe in the power of technology to transform ideas into reality. Whether it's a 
                simple website or a sophisticated machine learning model, I approach each project with 
                the same level of enthusiasm and attention to detail.
              </p>
              <p className="text-blue-600 font-semibold text-lg sm:text-xl">
                Currently exploring the intersection of AI and creative web experiences.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Let's Build Something Amazing</h2>
            <p className="text-blue-100 text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Whether you need a website, web app, or AI solution, 
              I'm here to help you succeed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="mailto:ali@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                Get In Touch
              </motion.a>
              
              <div className="flex gap-3 sm:gap-4">
                <motion.a
                  href="https://github.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-4 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 bg-blue-400/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-4 sm:right-10 w-8 h-8 sm:w-12 sm:h-12 bg-purple-400/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ x: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-green-400/20 rounded-full blur-lg"
      />
    </div>
  );
}

export default About;