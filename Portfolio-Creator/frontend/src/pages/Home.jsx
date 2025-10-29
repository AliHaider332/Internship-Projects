import { Link } from 'react-router-dom';
import {
  Sparkles,
  Globe,
  Rocket,
  ArrowRight,
  Zap,
  Code2,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import profilePic from '../assets/front.jpg';

function Home() {
  const tools = [
    {
      id: 1,
      name: 'Portfolio Builder',
      description:
        'Craft stunning portfolio websites with AI-powered templates and smart suggestions that showcase your work professionally.',
      link: '/portfolio-builder',
      icon: <Globe className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80',
      stats: '10+ Templates',
      featured: true,
    },
    {
      id: 2,
      name: 'AI Code Assistant',
      description:
        'Intelligent code generation and debugging powered by advanced AI models for developers.',
      link: '#',
      icon: <Code2 className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80',
      stats: 'Coming Soon',
      featured: false,
    },
    {
      id: 3,
      name: 'Design Studio',
      description:
        'Create beautiful designs and prototypes with AI-driven layout suggestions and components.',
      link: '#',
      icon: <Sparkles className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50/80 to-green-50/80',
      stats: 'In Development',
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 shadow-sm mb-8"
              >
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="text-sm font-medium text-blue-700 tracking-wide">
                  AI-POWERED TOOLS COLLECTION
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Build Amazing <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Digital Experiences
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl font-light tracking-wide">
                Hi, I'm <span className="font-semibold text-blue-600">Ali</span>{' '}
                — a passionate developer creating intelligent tools that
                transform your creative workflow. Discover applications designed
                to enhance your productivity and bring your ideas to life.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#tools"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Explore Tools
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300"
                  href="https://github.com/AliHaider332/Internship-Projects/tree/main/Portfolio-Creator"
                >
                  View GitHub
                  <Code2 className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-2xl border border-blue-100/50 backdrop-blur-sm">
                  <img
                    src={profilePic}
                    alt="Ali Haider"
                    className="w-80 h-80 object-cover rounded-2xl shadow-lg"
                  />

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg border border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-semibold text-sm tracking-wide">
                        AI DEVELOPER
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjZThmMmZmIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-sm mb-4"
            >
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700 tracking-wide">
                FEATURED CREATIONS
              </span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Discover My{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              Each tool is meticulously crafted with cutting-edge AI technology
              to deliver exceptional user experiences and streamline your
              workflow.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Featured Badge */}
                {tool.featured && (
                  <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    FEATURED
                  </div>
                )}

                <div
                  className={`relative h-full bg-gradient-to-br ${tool.bgGradient} backdrop-blur-sm border border-white/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Header with Icon */}
                  <div className="p-6 border-b border-white/50">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-r ${tool.gradient} shadow-md`}
                      >
                        {tool.icon}
                      </div>
                      <span className="text-xs font-semibold bg-white/80 text-gray-700 px-3 py-1 rounded-full tracking-wide">
                        {tool.stats}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-gray-800 transition-colors">
                      {tool.name}
                    </h3>

                    <p className="text-gray-600 leading-relaxed font-light tracking-wide text-sm">
                      {tool.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="p-6">
                    <Link
                      to={tool.link}
                      className={`inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r ${
                        tool.gradient
                      } text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 group/btn ${
                        !tool.featured
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:scale-105'
                      }`}
                    >
                      <span>
                        {tool.featured ? 'Launch Tool' : 'Coming Soon'}
                      </span>
                      {tool.featured && (
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-gray-600 mb-6 font-light tracking-wide">
              More innovative tools are in development. Stay tuned for updates!
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300">
              <Sparkles className="w-4 h-4" />
              Add Your Feedback
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
