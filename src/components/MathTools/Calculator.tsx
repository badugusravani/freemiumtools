import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MathToolProps } from '../../types';

const Calculator: React.FC<MathToolProps> = ({ onBack }) => {
  const [showKeywords, setShowKeywords] = useState(false);
  const [display, setDisplay] = useState('0');
  
  const keywords = [
    'calculator',
    'basic calculator',
    'online calculator',
    'math tool',
    'arithmetic calculator',
    'simple calculator',
    'web calculator',
    'free calculator'
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Basic Calculator Online</h1>
          <Link to="/category/mathematics" className="text-[#E55B4D] hover:text-[#c54d41]">In Mathematics</Link>
        </div>

        {/* Keywords Section */}
        <div className="mb-4">
          <button
            onClick={() => setShowKeywords(!showKeywords)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#E55B4D] flex items-center"
          >
            Keywords {showKeywords ? '▼' : '▶'}
          </button>
          {showKeywords && (
            <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {keywords.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Social Share Buttons */}
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 bg-[#3b5998] text-white rounded-md text-sm">Share</button>
          <button className="px-4 py-2 bg-[#1da1f2] text-white rounded-md text-sm">Tweet</button>
          <button className="px-4 py-2 bg-[#25D366] text-white rounded-md text-sm">WhatsApp</button>
        </div>

        {/* Tool Description */}
        <p className="text-gray-600 dark:text-gray-400">
          Perform basic arithmetic calculations with our simple and easy-to-use online calculator.
        </p>
      </div>

      {/* Ad Space */}
      <div className="w-full h-[100px] bg-gray-100 dark:bg-gray-800 mb-8 flex items-center justify-center">
        <span className="text-gray-400">Advertisement Space</span>
      </div>

      {/* Tool Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">Our Tool</h2>
        
        {/* Calculator Interface */}
        <div className="max-w-md mx-auto">
          {/* Display */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-t-lg mb-2">
            <input
              type="text"
              value={display}
              readOnly
              className="w-full text-right text-2xl font-mono bg-transparent outline-none dark:text-white"
            />
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-2">
            {/* First Row */}
            <button className="p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-lg">C</button>
            <button className="p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-lg">(</button>
            <button className="p-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 text-lg">)</button>
            <button className="p-4 bg-[#E55B4D] text-white rounded hover:bg-[#c54d41] text-lg">÷</button>

            {/* Second Row */}
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">7</button>
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">8</button>
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">9</button>
            <button className="p-4 bg-[#E55B4D] text-white rounded hover:bg-[#c54d41] text-lg">×</button>

            {/* Third Row */}
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">4</button>
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">5</button>
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">6</button>
            <button className="p-4 bg-[#E55B4D] text-white rounded hover:bg-[#c54d41] text-lg">-</button>

            {/* Fourth Row */}
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">1</button>
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">2</button>
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">3</button>
            <button className="p-4 bg-[#E55B4D] text-white rounded hover:bg-[#c54d41] text-lg">+</button>

            {/* Fifth Row */}
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg col-span-2">0</button>
            <button className="p-4 bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg">.</button>
            <button className="p-4 bg-[#E55B4D] text-white rounded hover:bg-[#c54d41] text-lg">=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 