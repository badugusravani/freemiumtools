import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ImageToolProps } from '../../../types';
import ToolHeader from '../../ToolHeader';

const ImageResizer: React.FC<ImageToolProps> = ({ onBack }) => {
  const [showKeywords, setShowKeywords] = useState(false);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const location = useLocation();
  
  const keywords = [
    'image resizer',
    'resize image',
    'change image size',
    'online image resizer',
    'photo resize tool',
    'picture size changer',
    'image dimensions',
    'resize photos online'
  ];

  const shareUrl = `${window.location.origin}${location.pathname}`;
  const shareTitle = 'Image Resizer Online - FreemiumTools.com';
  const shareText = 'Resize your images to any dimensions while maintaining or adjusting the aspect ratio with this free online tool.';

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`,
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const toolInfo = {
    title: 'Image Resizer Online',
    description: 'Resize your images to any dimensions while maintaining or adjusting the aspect ratio.',
    category: 'IMAGES',
    keywords: [
      'image resizer',
      'resize image',
      'change image size',
      'online image resizer',
      'photo resize tool',
      'picture size changer',
      'image dimensions',
      'resize photos online'
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

      {/* Ad Space */}
      <div className="w-full h-[100px] bg-gray-100 dark:bg-gray-800 mb-8 flex items-center justify-center">
        <span className="text-gray-400">Advertisement Space</span>
      </div>

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

            {/* Size Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="aspectRatio"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="aspectRatio" className="text-sm text-gray-700 dark:text-gray-300">
                Maintain aspect ratio
              </label>
            </div>

            <button className="w-full px-4 py-2 bg-[#E55B4D] hover:bg-[#c54d41] text-white rounded-md">
              Resize Image
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

export default ImageResizer; 