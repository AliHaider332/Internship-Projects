import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import uni from '../assets/Pictures/university.webp';
import leet from '../assets/Pictures/leetcode.png';
import notes from '../assets/Pictures/notes.png';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const quoteVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold dark:text-white py-4 sm:py-6 caprasimo bg-gradient-to-r from-gray-800 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Introduction Section */}
        <motion.section 
          variants={itemVariants}
          className="flex flex-col items-center gap-8 mb-16 sm:mb-20"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold dark:text-white caprasimo text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Introduction
          </motion.h2>

          <div className="max-w-4xl w-full">
            <motion.div 
              className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-orange-600/10 border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className="Roboto text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 leading-7 sm:leading-8 text-center italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.span 
                  variants={quoteVariants}
                  className="text-4xl sm:text-5xl text-orange-400 dark:text-orange-600 font-serif absolute -left-2 sm:-left-4 -top-2"
                >
                  {'"'}
                </motion.span>
                I am a Computer Science student crafting the future line by line. I
                turn ideas into digital reality with clean and purposeful code. My
                passion lies in combining creative web development with
                problem-solving to design intuitive and meaningful experiences. Each
                project is a chance to learn, innovate, and push the limits of what
                I can create. My goal is to build solutions that inspire, connect,
                and make a real difference.
                <motion.span 
                  variants={quoteVariants}
                  className="text-4xl sm:text-5xl text-orange-400 dark:text-orange-600 font-serif absolute -right-2 sm:-right-4 -bottom-2"
                >
                  {'"'}
                </motion.span>
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section 
          variants={itemVariants}
          className="flex flex-col items-center gap-8 mb-16 sm:mb-20"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold dark:text-white caprasimo text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Education
          </motion.h2>

          <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
            <motion.div
              variants={itemVariants}
              className="flex-1 max-w-2xl"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-orange-600/10 border border-gray-200 dark:border-gray-700">
                <p className="Roboto text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 leading-7 sm:leading-8">
                  I'm pursuing my Bachelor's in Computer Science at the University of
                  Agriculture, Faisalabad. While it's not a traditional CS hub, its
                  supportive environment, affordability, and scholarships make it the
                  right place for me. I believe real learning happens beyond the
                  classroom, so I actively explore open-source platforms and hands-on
                  projects. Starting my 5th, I'm proud of my institute and driven to
                  grow in both knowledge and experience.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={imageVariants}
              className="flex-1 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative"
              >
                <img
                  src={uni}
                  alt="University Picture"
                  className="h-64 sm:h-80 lg:h-96 rounded-2xl shadow-2xl object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* DSA Journey Section */}
        <motion.section 
          variants={itemVariants}
          className="flex flex-col items-center gap-8 mb-16 sm:mb-20"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold dark:text-white caprasimo text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            DSA Journey
          </motion.h2>

          <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-8 w-full max-w-6xl">
            <motion.div
              variants={itemVariants}
              className="flex-1 max-w-2xl"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-orange-600/10 border border-gray-200 dark:border-gray-700">
                <p className="Roboto text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 leading-7 sm:leading-8">
                  I've spent the past year sharpening my Data Structures and
                  Algorithms skills, solving over 230+ LeetCode problems with a 46-day
                  streak. Each challenge has strengthened my logic, revealed new
                  patterns, and fueled my passion for problem-solving. Now, I'm
                  pushing into harder problems and contributing to open-source, driven
                  by the thrill of growth and turning complexity into clarity.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={imageVariants}
              className="flex-1 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: -5 }}
                className="relative"
              >
                <img
                  src={leet}
                  alt="LeetCode Dashboard Picture"
                  className="h-64 sm:h-80 lg:h-96 rounded-2xl shadow-2xl object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-green-500/10 rounded-2xl opacity-0 hover:opacity-100"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* JavaScript Learning Platform Section */}
        <motion.section 
          variants={itemVariants}
          className="flex flex-col items-center gap-8"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold dark:text-white caprasimo text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            JavaScript Learning Platform
          </motion.h2>

          <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 w-full max-w-6xl">
            <motion.div
              variants={itemVariants}
              className="flex-1 max-w-2xl"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-orange-600/10 border border-gray-200 dark:border-gray-700">
                <p className="Roboto text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 leading-7 sm:leading-8 mb-6">
                  I've created a comprehensive JavaScript learning platform that covers 
                  everything from basic concepts to advanced topics. The platform includes 
                  interactive examples, AI-powered chatbot assistance for doubt resolution, 
                  and important interview questions. Designed to solve my own revision 
                  challenges, it's now deployed on Vercel and serves as a complete 
                  JavaScript mastery resource.
                </p>
                
                <motion.div 
                  className="flex justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a 
                    href="https://development-journey-iomo.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl text-base sm:text-lg"
                  >
                    <span>Visit Platform</span>
                    <motion.svg 
                      className="w-5 h-5"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </motion.svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={imageVariants}
              className="flex-1 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                className="relative"
              >
                <img
                  src={notes}
                  alt="JavaScript Learning Platform"
                  className="h-64 sm:h-80 lg:h-96 rounded-2xl shadow-2xl object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 hover:opacity-100 flex items-end justify-center pb-6 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                >
                  <span className="text-white font-semibold text-lg text-center px-4">
                    Explore Interactive Features
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;