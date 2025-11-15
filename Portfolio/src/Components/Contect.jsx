import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_stabc58', 'template_h6al518', form.current, {
        publicKey: '5jaXfAf8J7T5AYwhh',
      })
      .then(
        () => {
          toast.success('🎉 Message sent successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
          });
          form.current.reset();
        },
        (error) => {
          toast.error('❌ Failed to send message. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
          });
          console.log('FAILED...', error.text);
        }
      );
  };

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex justify-center items-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 overflow-hidden"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-orange-300/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-40 right-20 w-8 h-8 border-2 border-orange-400/30 rotate-45"
          animate={{
            rotate: [45, 90, 135, 180, 225, 270, 315, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <motion.div
          className="absolute bottom-40 left-20 w-6 h-6 border border-purple-400/40 rounded-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Floating triangles */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-orange-300/30"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Wave-like elements */}
        <motion.div
          className="absolute bottom-20 left-1/3 w-24 h-2 bg-gradient-to-r from-orange-400/20 to-purple-400/20 rounded-full blur-sm"
          animate={{
            scaleX: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Particle dots */}
        <motion.div
          className="absolute top-1/4 right-40 w-2 h-2 bg-orange-400/40 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-40 w-2 h-2 bg-purple-400/40 rounded-full"
          animate={{
            y: [0, 8, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.7,
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-10 right-1/3 w-10 h-10 bg-yellow-300/20 rounded-full blur-lg"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-1/4 w-14 h-14 bg-pink-300/20 rounded-full blur-lg"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.2,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold dark:text-white py-4 sm:py-6 caprasimo bg-gradient-to-r from-gray-800 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-300 Roboto text-lg sm:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Send me a message and I'll get back to you soon
          </motion.p>
        </motion.div>

        {/* Contact Form Only */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl dark:shadow-orange-600/10 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold dark:text-white mb-6 caprasimo text-center">
            Send Message
          </h3>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                name="user_name"
                type="text"
                placeholder="Enter your full name"
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                name="user_email"
                type="email"
                placeholder="Enter your email address"
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                placeholder="Please explain your thoughts..."
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-vertical min-h-[150px]"
                rows="5"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPaperPlane className="text-lg group-hover:rotate-45 transition-transform duration-300" />
                </motion.div>
                <span>Send Message</span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </motion.div>
  );
};

export default Contact;