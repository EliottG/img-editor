import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Crop,
  Play,
  SlidersHorizontal,
  Upload,
} from 'lucide-react';

const features = [
  {
    icon: <Upload size={20} />,
    title: 'Upload',
    description: 'Drag & drop or select your image',
  },
  {
    icon: <Crop size={20} />,
    title: 'Crop',
    description: 'Cut out the perfect frame',
  },
  {
    icon: <SlidersHorizontal size={20} />,
    title: 'Filter',
    description: 'Tune brightness, contrast, and more',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient Blur */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
      <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-100 rounded-full blur-3xl opacity-40 z-0 pointer-events-none" />

      {/* Optional GitHub / Nav */}
      <nav className="absolute top-6 left-6 text-sm text-gray-500 font-medium z-10">
        <a
          href="https://github.com/tonrepo"
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-600 transition"
        >
          GitHub
        </a>
      </nav>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 px-4 py-10 flex flex-col items-center"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800 tracking-tight">
            🎨 Welcome to the Image Editor
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-base sm:text-lg">
            Upload, crop, and apply filters to your images effortlessly. A simple and powerful tool for your creative needs.
          </p>
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center cursor-pointer justify-center mt-6 px-5 py-2.5 gap-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Play size={18} /> Start Editing
          </button>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg px-6 py-10 max-w-4xl w-full mb-12">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center gap-2 text-blue-600 items-center text-xl font-semibold mb-1">
                  {feature.icon}
                  {feature.title}
                </div>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {['/image1.png', '/image2.png', '/image3.png'].map((src, idx) => (
            <img
              key={idx}
              src={'./img/' + src}
              alt={`Preview ${idx + 1}`}
              className="w-full h-60 object-cover rounded-xl overflow-hidden shadow transform hover:scale-105 transition duration-300"
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Image Editor — Eliott GDC
        </footer>
      </motion.div>
    </div>
  );
};

export default HomePage;
