import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import { Category } from './types';
import Calculator from './components/Calculator';
import { ImageResizer, ImageCropper, ImageExposure, ImageBgRemoval } from './components/ImageTools/index';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import ErrorPage from './pages/ErrorPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SuggestPage from './pages/SuggestPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

const categories: Category[] = [
  {
    id: 'mathematics',
    title: 'MATHEMATICS',
    description: 'Comprehensive collection of mathematical tools for calculations, conversions, and problem-solving',
    tools: [
      { id: 'calculator', title: 'Basic Calculator', description: 'Perform basic arithmetic operations' },
      { id: 'scientific-calculator', title: 'Scientific Calculator', description: 'Advanced mathematical and scientific calculations' },
      { id: 'area-calculator', title: 'Area Calculator', description: 'Calculate area of various shapes' },
      { id: 'perimeter-calculator', title: 'Perimeter Calculator', description: 'Calculate perimeter of shapes' },
      { id: 'volume-calculator', title: 'Volume Calculator', description: 'Calculate volume of 3D objects' },
      { id: 'percentage-calculator', title: 'Percentage Calculator', description: 'Calculate percentages and ratios' },
      { id: 'fraction-calculator', title: 'Fraction Calculator', description: 'Perform calculations with fractions' },
      { id: 'ratio-calculator', title: 'Ratio Calculator', description: 'Calculate and simplify ratios' },
      { id: 'single-rule-direct', title: 'Direct Proportion', description: 'Solve direct proportion problems' },
      { id: 'single-rule-inverse', title: 'Inverse Proportion', description: 'Solve inverse proportion problems' },
      { id: 'unit-converter', title: 'Unit Converter', description: 'Convert between different units of measurement' },
      { id: 'equation-solver', title: 'Equation Solver', description: 'Solve mathematical equations' },
      { id: 'quadratic-solver', title: 'Quadratic Equation Solver', description: 'Solve quadratic equations' },
      { id: 'matrix-calculator', title: 'Matrix Calculator', description: 'Perform matrix operations' },
      { id: 'statistics-calculator', title: 'Statistics Calculator', description: 'Calculate mean, median, mode, and more' },
      { id: 'trigonometry-calculator', title: 'Trigonometry Calculator', description: 'Calculate sine, cosine, tangent, and more' },
      { id: 'logarithm-calculator', title: 'Logarithm Calculator', description: 'Calculate logarithms with different bases' },
      { id: 'gcd-lcm-calculator', title: 'GCD & LCM Calculator', description: 'Find Greatest Common Divisor and Least Common Multiple' },
      { id: 'prime-factorization', title: 'Prime Factorization', description: 'Find prime factors of a number' },
      { id: 'number-base-converter', title: 'Number Base Converter', description: 'Convert between different number bases' }
    ]
  },
  {
    id: 'colors',
    title: 'COLORS',
    description: 'Color picker, tools for modifying or generating colors',
    tools: [
      { id: 'lighten-color', title: 'Lighten color', description: 'Make colors lighter' },
      { id: 'darken-color', title: 'Darken color', description: 'Make colors darker' },
      { id: 'saturate-color', title: 'Change color saturation', description: 'Modify color saturation' },
      { id: 'greyscale-color', title: 'Greyscale/desaturate a color', description: 'Convert to greyscale' },
      { id: 'invert-color', title: 'Invert a color', description: 'Invert color values' },
    ]
  },
  {
    id: 'text',
    title: 'TEXT AND LISTS',
    description: 'Work with lists and texts, sort, randomize, reverse',
    tools: [
      { id: 'reverse-list', title: 'Reverse list', description: 'Reverse text content' },
      { id: 'randomize-list', title: 'List randomizer', description: 'Randomize list items' },
      { id: 'sort-list', title: 'Sort list', description: 'Sort list items' },
      { id: 'add-line-text', title: 'Add text to each line', description: 'Modify each line' },
      { id: 'remove-whitespace', title: 'Remove extra whitespaces', description: 'Clean up text' },
    ]
  },
  {
    id: 'numbers',
    title: 'NUMBERS',
    description: 'Work with numbers, generate, filter, sort',
    tools: [
      { id: 'generate-numbers', title: 'Generate list of numbers', description: 'Create number sequences' },
      { id: 'filter-numbers', title: 'Filter numbers', description: 'Filter number lists' },
      { id: 'sort-numbers', title: 'Sort numbers', description: 'Sort number lists' },
      { id: 'min-max', title: 'Minimum and maximum of a list', description: 'Find min/max values' },
      { id: 'average', title: 'Average of a list', description: 'Calculate average' },
    ]
  },
  {
    id: 'date-time',
    title: 'DATE AND TIME',
    description: 'Measure time, calculate distance between dates, chronometers',
    tools: [
      { id: 'date-difference', title: 'Date/time difference', description: 'Calculate time between dates' },
      { id: 'add-date', title: 'Add to a date', description: 'Add time to date' },
      { id: 'subtract-date', title: 'Subtract from a date', description: 'Subtract time from date' },
      { id: 'timer', title: 'Timer', description: 'Countdown timer' },
      { id: 'stopwatch', title: 'Stopwatch', description: 'Time events' },
    ]
  },
  {
    id: 'images',
    title: 'IMAGES',
    description: 'Complete suite of image editing, conversion, and optimization tools',
    tools: [
      { id: 'change-image-exposure', title: 'Image Exposure', description: 'Adjust image exposure and brightness levels' },
      { id: 'image-resizer', title: 'Image Resizer', description: 'Resize images while maintaining aspect ratio' },
      { id: 'image-cropper', title: 'Image Cropper', description: 'Crop images to desired dimensions' },
      { id: 'image-compressor', title: 'Image Compressor', description: 'Compress images without losing quality' },
      { id: 'image-converter', title: 'Image Converter', description: 'Convert between different image formats' },
      { id: 'image-filters', title: 'Image Filters', description: 'Apply various filters to images' },
      { id: 'image-effects', title: 'Image Effects', description: 'Add special effects to images' },
      { id: 'image-watermark', title: 'Watermark Maker', description: 'Add text or image watermarks' },
      { id: 'image-background-remover', title: 'Background Remover', description: 'Remove image backgrounds automatically' },
      { id: 'image-color-picker', title: 'Color Picker', description: 'Extract colors from images' },
      { id: 'image-rotate', title: 'Image Rotator', description: 'Rotate and flip images' },
      { id: 'image-brightness', title: 'Brightness Adjuster', description: 'Adjust image brightness and contrast' },
      { id: 'image-saturation', title: 'Saturation Adjuster', description: 'Modify image color saturation' },
      { id: 'image-blur', title: 'Image Blur', description: 'Apply gaussian blur effect' },
      { id: 'image-sharpen', title: 'Image Sharpener', description: 'Sharpen image details' },
      { id: 'image-text', title: 'Add Text to Image', description: 'Add custom text to images' },
      { id: 'image-collage', title: 'Image Collage Maker', description: 'Create photo collages' },
      { id: 'image-frames', title: 'Image Frames', description: 'Add borders and frames to images' },
      { id: 'image-optimizer', title: 'Image Optimizer', description: 'Optimize images for web use' },
      { id: 'image-metadata', title: 'Metadata Viewer/Editor', description: 'View and edit image metadata' },
      { id: 'image-compare', title: 'Image Comparison', description: 'Compare two images side by side' }
    ]
  },
  {
    id: 'randomness',
    title: 'RANDOMNESS',
    description: 'Generate random numbers, randomize lists, common distributions',
    tools: [
      { id: 'random-number', title: 'Random number generator', description: 'Generate random numbers' },
      { id: 'coin-flipper', title: 'Coin flipper', description: 'Flip a virtual coin' },
      { id: 'dice-roller', title: 'Dice roller', description: 'Roll virtual dice' },
      { id: 'gaussian-random', title: 'Gaussian random number generator', description: 'Normal distribution' },
      { id: 'password-generator', title: 'Password generator', description: 'Generate secure passwords' },
    ]
  },
  {
    id: 'files',
    title: 'FILES',
    description: 'Convert, compress, join or split',
    tools: [
      { id: 'split-files', title: 'Split files', description: 'Split large files' },
      { id: 'join-files', title: 'Join files', description: 'Combine multiple files' },
      { id: 'base64-encode', title: 'Base64 encode', description: 'Encode files to base64' },
      { id: 'base64-decode', title: 'Base64 decode', description: 'Decode base64 files' },
      { id: 'random-file', title: 'Random file generator', description: 'Generate random files' },
    ]
  },
  {
    id: 'programming',
    title: 'PROGRAMMING',
    description: 'Tools for programming and web development',
    tools: [
      { id: 'syntax-highlighter', title: 'Syntax highlighter', description: 'Highlight code syntax' },
      { id: 'css-inliner', title: 'CSS inliner', description: 'Inline CSS styles' },
      { id: 'json-formatter', title: 'JSON formatter', description: 'Format JSON data' },
      { id: 'css-beautifier', title: 'CSS beautifier', description: 'Format CSS code' },
      { id: 'html-beautifier', title: 'HTML beautifier', description: 'Format HTML code' },
    ]
  },
  {
    id: 'videos',
    title: 'VIDEOS',
    description: 'Tools for creating, editing, cropping, trimming and merging videos',
    tools: [
      { id: 'screen-recorder', title: 'Screen recorder', description: 'Record your screen' },
    ]
  }
];

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  console.log('CategoryPage - Received categoryId:', categoryId);
  
  // Remove any leading slashes from categoryId
  const normalizedCategoryId = categoryId?.replace(/^\/+/, '');
  console.log('CategoryPage - Normalized categoryId:', normalizedCategoryId);
  
  const category = categories.find(c => {
    console.log('Checking category:', c.id, 'against:', normalizedCategoryId);
    return c.id === normalizedCategoryId;
  });

  console.log('CategoryPage - Found category:', category);

  if (!category) {
    console.log('CategoryPage - No category found, redirecting to home');
    return <Navigate to="/" />;
  }

  return (
    <div className="px-4 py-4 md:px-6 md:py-8">
      <SEO 
        title={`${category.title} Tools - FreemiumTools.com`}
        description={category.description}
        keywords={`${category.title.toLowerCase()}, ${category.tools.map(t => t.title.toLowerCase()).join(', ')}`}
      />
      
      {/* Mobile search */}
      <div className="mb-4 md:hidden">
        <input
          type="text"
          placeholder="Search for tools..."
          className="w-full px-3 py-2 rounded text-sm border focus:outline-none focus:ring-2 focus:ring-[#c54d41] text-gray-800 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
          aria-label="Search tools"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center text-sm md:text-base"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 dark:text-white">{category.title}</h1>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">{category.description}</p>

      {/* Social Share Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-8" role="group" aria-label="Share buttons">
        <button className="social-share-button bg-[#3b5998] text-white px-3 py-1 rounded text-xs md:text-sm">
          Share
        </button>
        <button className="social-share-button bg-[#1da1f2] text-white px-3 py-1 rounded text-xs md:text-sm">
          Tweet
        </button>
        <button className="social-share-button bg-[#0077b5] text-white px-3 py-1 rounded text-xs md:text-sm">
          Share
        </button>
        <button className="social-share-button bg-[#ff4500] text-white px-3 py-1 rounded text-xs md:text-sm">
          Share
        </button>
        <button className="social-share-button bg-[#25D366] text-white px-3 py-1 rounded text-xs md:text-sm">
          Share
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {category.tools.map(tool => (
          <article 
            key={tool.id}
            className={`category-card category-${category.id} bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
          >
            <h2 className="text-base md:text-lg font-semibold mb-2 dark:text-white">{tool.title}</h2>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{tool.description}</p>
            <Link
              to={`/${tool.id}`}
              className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-[#E55B4D] hover:bg-[#c54d41] text-white rounded-md text-xs md:text-sm transition-colors"
              aria-label={`Use ${tool.title}`}
            >
              Use Tool
              <svg className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

const ToolPage: React.FC = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  console.log('Current toolId:', toolId); // Add debug logging

  // Find which category this tool belongs to
  const category = categories.find(c => 
    c.tools.some(t => t.id === toolId)
  );
  console.log('Found category:', category?.id); // Add debug logging

  const tool = category?.tools.find(t => t.id === toolId);
  console.log('Found tool:', tool?.id); // Add debug logging

  if (!tool || !category) {
    console.log('No tool or category found, redirecting to home'); // Add debug logging
    return <Navigate to="/" />;
  }

  const renderTool = () => {
    console.log('Rendering tool:', toolId); // Add debug logging
    switch (toolId) {
      case 'calculator':
        return <Calculator />;
      case 'image-resizer':
        return <ImageResizer onBack={() => navigate(`/category/${category.id}`)} />;
      case 'image-cropper':
        return <ImageCropper onBack={() => navigate(`/category/${category.id}`)} />;
      case 'change-image-exposure':
        console.log('Rendering ImageExposure component'); // Add debug logging
        return <ImageExposure onBack={() => navigate(`/category/${category.id}`)} />;
      case 'image-background-remover':
        return <ImageBgRemoval onBack={() => navigate(`/category/${category.id}`)} />;
      default:
        console.log('Rendering default "Coming Soon" component'); // Add debug logging
        return (
          <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-4">Tool Coming Soon</h1>
              <p className="text-gray-600 dark:text-gray-400">This tool is under development and will be available soon.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="px-4 py-4 md:px-6 md:py-8">
      <SEO 
        title={`${tool.title} - FreemiumTools.com`}
        description={tool.description}
        keywords={`${tool.title.toLowerCase()}, ${category.title.toLowerCase()}, online tools`}
      />

      <div className="mb-6">
        <Link
          to={`/category/${category.id}`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center text-sm md:text-base mb-4"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {category.title}
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">{tool.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
      </div>

      {/* Tool content */}
      {renderTool()}
    </div>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Show sidebar on desktop by default
      } else {
        setIsSidebarOpen(false); // Hide sidebar on mobile
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      // On desktop, toggle sidebar visibility
      setIsSidebarOpen(prev => !prev);
    } else {
      // On mobile, show/hide sidebar
      setIsSidebarOpen(prev => !prev);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <SEO />
          <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
              <Header
                toggleSidebar={toggleSidebar}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                isSidebarOpen={isSidebarOpen}
              />
              <div className="flex flex-1 pt-[48px]">
                <Sidebar 
                  isOpen={isSidebarOpen} 
                  onClose={() => setIsSidebarOpen(false)} 
                  categories={categories}
                />
                <main 
                  className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}
                  role="main"
                  aria-label="Main content"
                >
                  <Routes>
                    {/* Admin routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ProtectedRoute requireAdmin>
                          <Dashboard categories={categories} />
                        </ProtectedRoute>
                      }
                    />
                    
                    {/* Static routes */}
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/suggest" element={<SuggestPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/404" element={<ErrorPage />} />
                    
                    {/* Category and Tool routes - order is important */}
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/:toolId" element={<ToolPage />} />
                    
                    {/* Home route */}
                    <Route path="/" element={
                      <div className="px-4 py-4 md:px-6 md:py-8">
                        <SEO />
                        {/* Mobile search */}
                        <div className="mb-4 md:hidden">
                          <input
                            type="text"
                            placeholder="Search for tools..."
                            className="w-full px-3 py-2 rounded text-sm border focus:outline-none focus:ring-2 focus:ring-[#c54d41] text-gray-800 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                            aria-label="Search tools"
                          />
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">FREE ONLINE TOOLS</h1>
                        
                        {/* Social Share Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4 md:mb-8" role="group" aria-label="Share buttons">
                          <button className="social-share-button bg-[#3b5998] text-white px-3 py-1 rounded text-xs md:text-sm">
                            Share
                          </button>
                          <button className="social-share-button bg-[#1da1f2] text-white px-3 py-1 rounded text-xs md:text-sm">
                            Tweet
                          </button>
                          <button className="social-share-button bg-[#0077b5] text-white px-3 py-1 rounded text-xs md:text-sm">
                            Share
                          </button>
                          <button className="social-share-button bg-[#ff4500] text-white px-3 py-1 rounded text-xs md:text-sm">
                            Share
                          </button>
                          <button className="social-share-button bg-[#25D366] text-white px-3 py-1 rounded text-xs md:text-sm">
                            Share
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                          {categories.map((category) => (
                            <article 
                              key={category.id} 
                              className={`category-card category-${category.id} bg-white dark:bg-gray-800 p-3 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
                            >
                              <div className="flex justify-between items-center mb-2 md:mb-4">
                                <h2 className="text-base md:text-xl font-bold dark:text-white">{category.title}</h2>
                                <Link
                                  to={`/category/${category.id}`}
                                  className="inline-flex items-center px-3 py-1 md:px-4 md:py-1.5 bg-gradient-to-r from-[#E55B4D] to-[#c54d41] hover:from-[#c54d41] hover:to-[#b44438] text-white rounded-md text-xs md:text-sm transition-all duration-200 shadow-sm hover:shadow-md group"
                                >
                                  <span>More</span>
                                  <svg 
                                    className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                </Link>
                              </div>
                              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4">{category.description}</p>
                              <div className="space-y-2">
                                {category.tools.slice(0, 5).map((tool) => (
                                  <Link
                                    key={tool.id}
                                    to={`/${tool.id}`}
                                    className="block w-full text-left px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-xs md:text-sm text-gray-800 dark:text-gray-200"
                                  >
                                    {tool.title}
                                  </Link>
                                ))}
                                {category.tools.length > 5 && category.id !== 'mathematics' && category.id !== 'images' && (
                                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                                    <Link
                                      to={`/category/${category.id}`}
                                      className="block w-full text-center px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#E55B4D] to-[#c54d41] hover:from-[#c54d41] hover:to-[#b44438] text-white rounded-md text-xs md:text-sm transition-all duration-200 shadow-sm hover:shadow-md group"
                                    >
                                      <span>More</span>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </main>
              </div>
              <Footer />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;