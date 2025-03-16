import React, { useState } from 'react';
import { ImageToolProps } from '../../../types';
import ToolHeader from '../../ToolHeader';

const ImageExposure: React.FC<ImageToolProps> = ({ onBack }) => {
  const [exposure, setExposure] = useState(50);

  const toolInfo = {
    title: 'Image Exposure',
    description: 'Adjust image exposure and brightness levels',
    category: 'Images',
    keywords: [
      'image exposure',
      'photo brightness',
      'adjust image exposure',
      'change image brightness',
      'online exposure tool',
      'photo exposure editor',
      'image brightness adjustment',
      'exposure correction',
      'photo editing tool',
      'free image exposure'
    ]
  };

  return (
    <div className="p-4">
      <ToolHeader {...toolInfo} />

      {/* Advertisement Space */}
      <div className="w-full h-[250px] bg-gray-100 dark:bg-gray-800 mb-8 flex items-center justify-center">
        <span className="text-gray-400">Advertisement Space</span>
      </div>

      {/* Tool Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input Section (2/3 width) */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <input type="file" className="hidden" id="imageInput" accept="image/*" />
              <label htmlFor="imageInput" className="cursor-pointer">
                <div className="text-gray-500 dark:text-gray-400">
                  <p>Drop an image here or click to upload</p>
                  <p className="text-sm">Supports: JPG, PNG, WebP</p>
                </div>
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder="Or enter image URL..."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Options Section (1/3 width) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Exposure Level</label>
              <input
                type="range"
                min="0"
                max="100"
                value={exposure}
                onChange={(e) => setExposure(parseInt(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                value={exposure}
                onChange={(e) => setExposure(parseInt(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Result</h3>
        <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
        <div className="mt-4 flex justify-end">
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            EXECUTE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageExposure; 