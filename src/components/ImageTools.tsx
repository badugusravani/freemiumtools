import React, { useState, useRef, ChangeEvent } from 'react';

interface ImageToolProps {
  onBack: () => void;
}

export const ImageResizer: React.FC<ImageToolProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setSelectedImage(dataUrl);
        
        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const handleDownload = () => {
    if (!selectedImage) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx && imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, width, height);
      const link = document.createElement('a');
      link.download = 'resized-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">← Back</button>
      <h1 className="text-2xl font-bold mb-6">Image Resizer</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400"
          />
        </div>

        {selectedImage && (
          <>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Preview
              </label>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2 overflow-hidden">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="Preview"
                  style={{ width: width + 'px', height: height + 'px', maxWidth: '100%' }}
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Maintain aspect ratio
                </span>
              </label>
            </div>

            <button
              onClick={handleDownload}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Download Resized Image
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const ImageCropper: React.FC<ImageToolProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:text-blue-800">← Back</button>
      <h1 className="text-2xl font-bold mb-6">Image Cropper</h1>
      {/* Implementation coming soon */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <p>Image cropping functionality coming soon...</p>
      </div>
    </div>
  );
};

// Add more image tool components as needed... 