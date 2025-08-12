import React from 'react';
import uni from '../assets/Pictures/university.webp';
import leet from '../assets/Pictures/leetcode.png';
const About = () => {
  return (
    <div className="flex flex-col w-full px-6 md:px-20 lg:px-40 gap-y-15 md:pt-25 sm:pt-10 pb-10">
      <h1 className="text-4xl font-bold dark:text-white caprasimo text-center mb-5">
        About
      </h1>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold dark:text-white caprasimo">
          Introduction
        </h2>

        <div className=" max-w-3xl">
          <p className="Roboto text-[16px] font-semibold  text-gray-600 dark:text-gray-300 px-6 [word-spacing:3px] leading-8">
            <strong className="text-4xl text-orange-400 dark:text-orange-600 font-serif">
              {'“'}
            </strong>
            I am a Computer Science student crafting the future line by line. I
            turn ideas into digital reality with clean and purposeful code. My
            passion lies in combining creative web development with
            problem-solving to design intuitive and meaningful experiences. Each
            project is a chance to learn, innovate, and push the limits of what
            I can create. My goal is to build solutions that inspire, connect,
            and make a real difference.
            <strong className="text-4xl text-orange-400 dark:text-orange-600 font-serif">
              {'”'}
            </strong>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold dark:text-white caprasimo">
          Education
        </h2>

        <div className="flex flex-wrap-reverse w-full md:flex-nowrap  justify-center items-center gap-5">
          <p className="Roboto text-[16px] font-semibold  text-gray-600 dark:text-gray-300 px-6 [word-spacing:3px] leading-8 lg:leading-6 lg:text-[14px] lg:[word-spacing:1px] xl:leading-8 xl:text-[16px] xl:[word-spacing:3px]">
            I’m pursuing my Bachelor’s in Computer Science at the University of
            Agriculture, Faisalabad. While it’s not a traditional CS hub, its
            supportive environment, affordability, and scholarships make it the
            right place for me. I believe real learning happens beyond the
            classroom, so I actively explore open-source platforms and hands-on
            projects. Starting my 5th semester this September, I’m proud of my
            institute and driven to grow in both knowledge and experience{' '}
          </p>
          <img
            src={uni}
            alt="University Picture"
            className="h-[280px] md:h-[200px] xl:h-[300px] rounded-2xl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold dark:text-white caprasimo">
        DSA Journey
        </h2>

        <div className="flex flex-wrap w-full md:flex-nowrap  justify-center items-center gap-5">
          <img
            src={leet}
            alt="leetcode Dashboard Picture"
            className="h-[280px] md:h-[200px] xl:h-[300px] rounded-2xl"
          />

          <p className="Roboto text-[16px] font-semibold  text-gray-600 dark:text-gray-300 px-6 [word-spacing:3px] leading-8 lg:leading-6 lg:text-[14px] lg:[word-spacing:1px] xl:leading-8 xl:text-[16px] xl:[word-spacing:3px]">
            I’ve spent the past year sharpening my Data Structures and
            Algorithms skills, solving over 190 LeetCode problems with a 46-day
            streak. Each challenge has strengthened my logic, revealed new
            patterns, and fueled my passion for problem-solving. Now, I’m
            pushing into harder problems and contributing to open-source, driven
            by the thrill of growth and turning complexity into clarity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
