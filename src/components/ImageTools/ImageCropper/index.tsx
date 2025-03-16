import React, { useState } from 'react';
import { ImageToolProps } from '../../../types';
import ToolHeader from '../../ToolHeader';

const ImageCropper: React.FC<ImageToolProps> = ({ onBack }) => {
  const [aspectRatio, setAspectRatio] = useState('16:9');
  
  const toolInfo = {
    title: 'Image Cropper Online',
    description: 'Crop your images to any size or aspect ratio with our easy-to-use online tool.',
    category: 'IMAGES',
    keywords: [
      'image cropper',
      'crop image',
      'photo cropper',
      'online image crop',
      'picture cropping tool',
      'resize and crop',
      'image trim',
      'photo editor crop'
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ToolHeader 
        title={toolInfo.title}
        description={toolInfo.description}
        category={toolInfo.category}
        keywords={toolInfo.keywords}
      />

      {/* Tool Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        {/* Tool Interface */}
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageInput"
              />
              <label
                htmlFor="imageInput"
                className="cursor-pointer text-[#E55B4D] hover:text-[#c54d41]"
              >
                Click to upload an image or drag and drop
              </label>
            </div>

            {/* Crop Controls */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="16:9">16:9 - Widescreen</option>
                <option value="4:3">4:3 - Standard</option>
                <option value="1:1">1:1 - Square</option>
                <option value="2:3">2:3 - Portrait</option>
                <option value="free">Free Form</option>
              </select>
            </div>

            <button className="w-full px-4 py-2 bg-[#E55B4D] hover:bg-[#c54d41] text-white rounded-md">
              Crop Image
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4 min-h-[200px] flex items-center justify-center">
              <span className="text-gray-500">Preview will appear here</span>
            </div>
            <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper; 