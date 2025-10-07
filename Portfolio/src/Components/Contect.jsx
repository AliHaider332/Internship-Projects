import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="flex justify-center items-center min-h-screen w-full px-4">
      <div className="w-full lg:w-[80%]">
        <h1 className="text-4xl font-bold dark:text-white caprasimo mb-6 text-center">
          Contact Me
        </h1>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full flex flex-col gap-2 Roboto"
        >
          <input
            name="user_name"
            type="text"
            placeholder="Enter Name"
            className="dark:bg-[#2f2f2f] bg-gray-200 w-full p-3 rounded-md dark:text-white text-gray-600 placeholder-gray-400 focus:outline-none"
            required
          />
          <input
            name="user_email"
            type="email"
            placeholder="Enter Email"
            className="dark:bg-[#2f2f2f] bg-gray-200 w-full p-3 rounded-md dark:text-white text-gray-600 placeholder-gray-400 focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="dark:bg-[#2f2f2f] bg-gray-200 w-full p-3 rounded-md dark:text-white text-gray-600 placeholder-gray-400 focus:outline-none resize-y"
            rows="4"
            required
          ></textarea>

          <div className="flex flex-row-reverse dark:text-white mt-3">
            <button
              type="submit"
              className="px-5 py-2 dark:bg-orange-600 bg-transparent border shadow-md dark:border-none rounded-[5px] text-[14px] hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
            >
              Submit
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
