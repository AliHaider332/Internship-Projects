//Web Pics

import P11 from '../assets/Pictures/P11.png';
import P12 from '../assets/Pictures/P12.png';
import P13 from '../assets/Pictures/P13.png';
import P14 from '../assets/Pictures/P14.png';
import P15 from '../assets/Pictures/P15.png';
import P16 from '../assets/Pictures/P16.png';
import P17 from '../assets/Pictures/P17.png';
import P18 from '../assets/Pictures/P18.png';
import P19 from '../assets/Pictures/P19.png';
import P20 from '../assets/Pictures/P20.png';

import P31 from '../assets/Pictures/P31.png';
import P32 from '../assets/Pictures/P32.png';
import P33 from '../assets/Pictures/P33.png';
import P34 from '../assets/Pictures/P34.png';
import P35 from '../assets/Pictures/P35.png';
import P36 from '../assets/Pictures/P36.png';
import P37 from '../assets/Pictures/P37.png';
import P38 from '../assets/Pictures/P38.png';

import PS1 from '../assets/Pictures/PS1.png';
import PS2 from '../assets/Pictures/PS2.png';
import PS3 from '../assets/Pictures/PS3.png';
import PS4 from '../assets/Pictures/PS4.png';
import PS5 from '../assets/Pictures/PS5.png';

import PB1 from '../assets/Pictures/PB1.png';
import PB2 from '../assets/Pictures/PB2.png';
import PB3 from '../assets/Pictures/PB3.png';
import PB4 from '../assets/Pictures/PB4.png';
import PB5 from '../assets/Pictures/PB5.png';
import PB6 from '../assets/Pictures/PB6.png';

import P22 from '../assets/Pictures/P22.png';

import P23 from '../assets/Pictures/P23.png';
// Deskto App pics
import PD1 from '../assets/Pictures/PD1.png';
//Console App Pics
import PC1 from '../assets/Pictures/PC1.png';

export const Web = [
  {
    id: 6,
    title: 'PDF to Chat Converter',
    image: [PS1, PS2, PS3, PS4, PS5],
    summary:
      'A full-stack MERN application that allows users to upload PDF files and interact with their content using an AI-powered chat interface. The system integrates Google Generative AI (LLM) and Pinecone vector database to implement Retrieval-Augmented Generation (RAG). When users ask questions, the app retrieves relevant context from the uploaded PDF using vector similarity search and provides accurate, contextual answers through the AI model.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Google Generative AI',
      'Pinecone',
      'Tailwind CSS',
    ],
    tags: [
      'FullStack',
      'AIIntegration',
      'RAG',
      'React',
      'NodeJS',
      'Express',
      'MongoDB',
      'TailwindCSS',
      'GoogleAI',
      'Pinecone',
      'PDFChat',
    ],
    link: 'https://internship-projects-b72u-2jphum29l.vercel.app/', // you can add your live project link here
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/PDF-Summerizer', // you can add your GitHub repo link here
  },
  ,
  {
    id: 5,
    title: 'AI-Powered Portfolio Builder',
    image: [PB1, PB2, PB3, PB4, PB5, PB6],
    summary:
      'A full-stack AI-driven web application that allows users to generate personalized portfolio websites using Google Generative AI. Users input their personal information, professional details, and preferred design choices such as colors, layout, and style. The system automatically generates complete HTML, CSS, and JavaScript files, provides a live preview, and allows customization of the UI/UX before download.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Google Generative AI',
      'Tailwind CSS',
    ],
    tags: [
      'FullStack',
      'AIIntegration',
      'React',
      'NodeJS',
      'Express',
      'MongoDB',
      'TailwindCSS',
      'PortfolioGenerator',
      'GoogleAI',
      'Automation',
    ],
    link: 'https://internship-projects-portfolio-build.vercel.app/', // you can add your live project link here
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/Portfolio-Creator', // you can add your GitHub repo link here
  },

  {
    id: 4,
    title: 'MERN Social Media Application',
    image: [P31, P32, P33, P34, P35, P36, P37, P38],
    summary:
      'A full-stack social media web application built using the MERN stack, featuring complete user authentication and authorization. Users can create an account, log in, and manage posts with full CRUD operations — including create, update, delete, and comment functionalities. The platform allows liking, disliking, editing comments, and managing user profiles. Backend authentication is powered by JWT, while the frontend provides a smooth and responsive user interface with React and Tailwind CSS.',
    techStack: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'JWT Authentication',
      'Tailwind CSS',
      'Mongoose',
      'RESTful API',
    ],
    tags: [
      'MERNStack',
      'FullStackDevelopment',
      'Authentication',
      'Authorization',
      'CRUDOperations',
      'JWT',
      'MongoDB',
      'ReactApp',
    ],

    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/Mini-linkdin',
  },
  {
    id: 3,
    title: 'AI Girlfriend Chatbot',
    image: [P23],
    summary:
      'An interactive AI-powered chatbot designed to simulate romantic and emotional conversations. Built using Node.js, Express, and the Gemini LLM (via Google GenAI API), the chatbot role-plays as a virtual girlfriend, responding affectionately and naturally in Urdu-English (Roman Urdu). The backend handles real-time communication and maintains chat history to create a continuous, personalized experience. The app is fully deployed on Vercel with a secure serverless architecture.',
    techStack: [
      'Node.js',
      'Express.js',
      'Google Gemini API',
      'CORS',
      'dotenv',
      'Vercel (Serverless Deployment)',
    ],
    tags: [
      'AIChatbot',
      'GeminiLLM',
      'ExpressBackend',
      'GoogleGenAI',
      'APIDevelopment',
      'Serverless',
      'VercelDeployment',
    ],
    link: 'https://internship-projects-moc3.vercel.app/',
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/GinAi',
  },
  {
    id: 2,
    title: 'Weather Forecast Application',
    image: [P22],
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
  {
    id: 1,
    title: 'E-Commerce Website',
    image: [P11, P12, P13, P14, P15, P16, P17, P18, P19, P20],
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
];

export const DESKTOP = [
  {
    id: 1,
    title: 'Day Calories Calculator',
    image: [PD1], // imported image
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
    image: [PC1],
    summary:
      'A console-based C++ application that implements and visually represents multiple CPU scheduling algorithms, including First Come First Serve (FCFS), Shortest Job First (SJF), Priority Scheduling, and Round Robin. The program uses linked lists, queues, and other data structures to manage processes, track states (New, Ready, Running, Waiting), and handle unique constraints like duplicate process IDs or priorities. It supports special operations like process interrupts and I/O waiting states, providing an educational simulation of how operating system process scheduling works.',
    techStack: ['C++', 'Data Structures', 'Operating System Concepts'],
    tags: [
      'C++',
      'ConsoleApp',
      'OSSchedulers',
      'ProcessManagement',
      'DSA',
      'OOPs',
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
