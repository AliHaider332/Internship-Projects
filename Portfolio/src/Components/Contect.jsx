import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo_D from '../assets/Pictures/logo_D.png';
import logo_L from '../assets/Pictures/logo_L.png';

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
          toast.success('Message sent successfully!', {
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
          toast.error('Failed to send message. Please try again.', {
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

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full px-4 py-8">
      {/* Background logo that moves with page scroll */}

      {/* Contact form content */}
      <div className="relative z-10 w-full lg:w-[80%] max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold dark:text-white py-6 caprasimo bg-gradient-to-r from-gray-800 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent">
          Contact Me
        </h1>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full flex flex-col gap-4 Roboto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
        >
          <div className="space-y-4">
            <input
              name="user_name"
              type="text"
              placeholder="Enter Name"
              className="dark:bg-[#2f2f2f] bg-gray-100 w-full p-4 rounded-lg dark:text-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 border border-transparent hover:border-orange-300"
              required
            />
            <input
              name="user_email"
              type="email"
              placeholder="Enter Email"
              className="dark:bg-[#2f2f2f] bg-gray-100 w-full p-4 rounded-lg dark:text-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 border border-transparent hover:border-orange-300"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="dark:bg-[#2f2f2f] bg-gray-100 w-full p-4 rounded-lg dark:text-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 border border-transparent hover:border-orange-300 resize-y min-h-[120px]"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="flex flex-row-reverse dark:text-white mt-4">
            <button
              type="submit"
              className="px-8 py-3 dark:bg-orange-600 bg-orange-500 text-white font-medium border shadow-md dark:border-none rounded-lg text-[16px] hover:scale-105 hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-500 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Toast container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
