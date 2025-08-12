//Web Pics
import P1 from '../assets/Pictures/P1.png';
import P2 from '../assets/Pictures/P2.png';
// Deskto App pics
import PD1 from '../assets/Pictures/PD1.png';
//Console App Pics
import PC1 from '../assets/Pictures/PC1.png';

export const Web = [
  {
    id: 1,
    title: 'E-Commerce Website',
    image: P1,
    summary:
      'A professional-level, fully responsive e-commerce website built with React, Redux, Tailwind CSS, and React Router. It integrates DummyJSON API for product data fetching, features multi-page navigation, and allows users to add items to their cart. The design follows modern UI/UX standards for all devices.',
    techStack: [
      'React',
      'Redux',
      'Tailwind CSS',
      'React Router',
      'DummyJSON API',
    ],
    tags: [
      'React',
      'Redux',
      'TailwindCSS',
      'APIIntegration',
      'ECommerce',
      'ResponsiveDesign',
      'PortfolioProject',
    ],
    link: 'https://internship-projects-three.vercel.app/',
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/E-commerce',
  },
  {
    id: 2,
    title: 'Weather Forecast Application',
    image: P2,
    summary:
      'A fully responsive, well-structured weather forecast application with support for both dark and light modes. The app allows users to check real-time weather for their current location and any other city. It features hourly forecasts for the next 24 hours (in 3-hour intervals) and 5-day weather predictions. Integrated with two different free APIs, the application updates weather data every 10 minutes to ensure accuracy.',
    techStack: [
      'React',
      'Tailwind CSS',
      'React Router',
      'Weather API',
      'Forecast API',
    ],
    tags: [
      'React',
      'TailwindCSS',
      'APIIntegration',
      'WeatherApp',
      'ResponsiveDesign',
      'DarkMode',
      'LightMode',
      'PortfolioProject',
    ],
    link: 'https://internship-projects-doem.vercel.app/',
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/Weather-App',
  },
];








export const DESKTOP = [
  {
    id: 1,
    title: 'Day Calories Calculator',
    image: PD1, // imported image
    summary:
      "A fun, interactive desktop application that calculates a user’s Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR). The app begins with a sign-up page where users enter their details, followed by a verification step requiring them to re-enter specific information such as the password. Some details are pre-filled from the initial sign-up, with only a few additional inputs required. Once validated, the app computes and displays the user's daily caloric needs in a simple, user-friendly format. Built as a classroom-recommended project to practice desktop app development and health-related calculations.",
    techStack: ['C#', '.NET Framework', 'Windows Forms'],
    tags: [
      'DesktopApp',
      'CSharp',
      'BMRCalculation',
      'TDEECalculation',
      'FormValidation',
      'FunProject',
    ],
    link: '',
    github: 'https://github.com/AliHaider332/Personal-Health-Desktop-App', 
  },
];






export const Console = [
  {
    id: 1,
    title: 'Operating System Schedulers ',
    image: PC1, 
    summary:
      'A console-based C++ application that implements and visually represents multiple CPU scheduling algorithms, including First Come First Serve (FCFS), Shortest Job First (SJF), Priority Scheduling, and Round Robin. The program uses linked lists, queues, and other data structures to manage processes, track states (New, Ready, Running, Waiting), and handle unique constraints like duplicate process IDs or priorities. It supports special operations like process interrupts and I/O waiting states, providing an educational simulation of how operating system process scheduling works.',
    techStack: ['C++', 'Data Structures', 'Operating System Concepts'],
    tags: [
      'C++',
      'ConsoleApp',
      'OSSchedulers',
      'ProcessManagement',
      'DSA','OOPs',
      'FCFS',
      'SJF',
      'PriorityScheduling',
      'RoundRobin',
    ],
    link: '',
    github:
      'https://github.com/AliHaider332/DSA-Projects/blob/main/OS_Project.cpp',
  },
];
