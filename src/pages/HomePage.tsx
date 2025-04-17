import React, { useState } from 'react';
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
    description: 'Drag & drop or select your image'
  },
  {
    icon: <Crop size={20} />, 
    title: 'Crop', 
    description: 'Cut out the perfect frame'
  },
  {
    icon: <SlidersHorizontal size={20} />, 
    title: 'Filter', 
    description: 'Tune brightness, contrast, and more'
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartEditing = () => {
    setIsLoading(true);
    setTimeout(() => navigate('/editor'), 600);
  };

  return (
      <div className="relative overflow-hidden bg-gray-900 transition-colors">
        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-300 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
        <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-300 rounded-full blur-3xl opacity-40 z-0 pointer-events-none" />

        <nav className="absolute top-6 left-6 text-sm text-gray-300 font-medium z-10 flex items-center gap-4">
          <a
            href="https://github.com/EliottG/img-editor"
            target="_blank"
            className="hover:text-gray-600 transition"
          >
            GitHub
          </a>
          
        </nav>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative  min-h-screen px-4 py-14 flex flex-col items-center text-white"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              🎨 Welcome to the Image Editor
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto text-base sm:text-lg">
              Upload, crop, and apply filters to your images effortlessly. A simple and powerful tool for your creative needs.
            </p>
            <button
              onClick={handleStartEditing}
              disabled={isLoading}
              className="flex cursor-pointer items-center justify-center mt-6 px-5 py-2.5 gap-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : <><Play size={18} /> Let’s Get Creative</>}
            </button>
          </div>

          {/* Features */}
          <div className="bg-gray-800 rounded-2xl shadow-lg px-6 py-10 max-w-4xl w-full mb-12">
            <div className="grid gap-8 sm:grid-cols-3 text-center">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-xl cursor-default "
                >
                  <div className="flex justify-center gap-2 text-blue-400 items-center text-xl font-semibold mb-1">
                    {feature.icon}
                    {feature.title}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
            {['image1.png', 'image2.png', 'image3.png'].map((src, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={`./img/${src}`}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-60 object-cover rounded-xl shadow-lg transform transition duration-300 group-hover:scale-105"
                />
               
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Image Editor — Eliott GDC
          </footer>
        </motion.div>
      </div>
  );
};

export default HomePage;