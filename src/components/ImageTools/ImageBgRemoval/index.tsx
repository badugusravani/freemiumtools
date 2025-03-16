import React, { useState } from 'react';
import type { ImageToolProps } from '../../../types';
import ToolHeader from '../../ToolHeader';

const ImageBgRemoval: React.FC<ImageToolProps> = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [tolerance, setTolerance] = useState(30);

  const toolInfo = {
    title: 'Background Remover Online',
    description: 'Remove background from your images automatically - Free & Unlimited.',
    category: 'IMAGES',
    keywords: [
      'background remover',
      'remove background',
      'transparent background',
      'image background removal',
      'AI background remover',
      'photo background eraser',
      'png maker',
      'background eraser'
    ]
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProcessedImage(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProcessedImage(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getPixel = (imageData: ImageData, x: number, y: number) => {
    const i = (y * imageData.width + x) * 4;
    return {
      r: imageData.data[i],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2],
      a: imageData.data[i + 3]
    };
  };

  const setPixel = (imageData: ImageData, x: number, y: number, r: number, g: number, b: number, a: number) => {
    const i = (y * imageData.width + x) * 4;
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = a;
  };

  const colorDistance = (color1: { r: number, g: number, b: number }, color2: { r: number, g: number, b: number }) => {
    return Math.sqrt(
      Math.pow(color2.r - color1.r, 2) +
      Math.pow(color2.g - color1.g, 2) +
      Math.pow(color2.b - color1.b, 2)
    );
  };

  const floodFill = (imageData: ImageData, startX: number, startY: number, tolerance: number) => {
    const width = imageData.width;
    const height = imageData.height;
    const startColor = getPixel(imageData, startX, startY);
    const pixelsToCheck = [[startX, startY]];
    const checked = new Set<string>();

    while (pixelsToCheck.length > 0) {
      const [x, y] = pixelsToCheck.pop()!;
      const key = `${x},${y}`;
      
      if (checked.has(key)) continue;
      checked.add(key);

      const currentColor = getPixel(imageData, x, y);
      if (colorDistance(startColor, currentColor) <= tolerance) {
        setPixel(imageData, x, y, 0, 0, 0, 0);

        // Add adjacent pixels
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => {
          const newX = x + dx;
          const newY = y + dy;
          if (
            newX >= 0 && newX < width &&
            newY >= 0 && newY < height &&
            !checked.has(`${newX},${newY}`)
          ) {
            pixelsToCheck.push([newX, newY]);
          }
        });
      }
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    try {
      // Load the image
      const img = new Image();
      img.src = preview!;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Create a canvas to process the image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Start flood fill from the edges
      const edges = [
        [0, 0], // Top-left
        [canvas.width - 1, 0], // Top-right
        [0, canvas.height - 1], // Bottom-left
        [canvas.width - 1, canvas.height - 1], // Bottom-right
        [Math.floor(canvas.width / 2), 0], // Top-middle
        [Math.floor(canvas.width / 2), canvas.height - 1], // Bottom-middle
        [0, Math.floor(canvas.height / 2)], // Left-middle
        [canvas.width - 1, Math.floor(canvas.height / 2)] // Right-middle
      ];

      edges.forEach(([x, y]) => {
        floodFill(imageData, x, y, tolerance);
      });

      // Put processed image data back
      ctx.putImageData(imageData, 0, 0);

      // Convert to PNG with transparency
      const processedImageUrl = canvas.toDataURL('image/png');
      setProcessedImage(processedImageUrl);
    } catch (error) {
      console.error('Error removing background:', error);
      alert('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'removed-background.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="imageInput"
              />
              <label
                htmlFor="imageInput"
                className="cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-[#E55B4D] hover:text-[#c54d41]">
                    Click to upload an image or drag and drop
                  </div>
                  <div className="text-sm text-gray-500">
                    Supports: JPG, PNG (Max 10MB)
                  </div>
                </div>
              </label>
            </div>

            {/* Tolerance Control */}
            {preview && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background Detection Sensitivity
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Adjust if the background is not being removed correctly
                </div>
              </div>
            )}

            {preview && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Image */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Original Image</h3>
                  <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img 
                      src={preview} 
                      alt="Original" 
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Processed Image */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {processedImage ? 'Background Removed' : 'Result'}
                  </h3>
                  <div className="relative aspect-video bg-[url('/checkerboard.png')] bg-repeat rounded-lg overflow-hidden">
                    {isProcessing ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E55B4D] border-t-transparent"></div>
                      </div>
                    ) : processedImage ? (
                      <img 
                        src={processedImage} 
                        alt="Processed" 
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        Click "Remove Background" to process
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {preview && !isProcessing && (
              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleRemoveBackground}
                  disabled={isProcessing}
                  className="w-full px-4 py-2 bg-[#E55B4D] hover:bg-[#c54d41] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Remove Background'}
                </button>

                {processedImage && (
                  <button 
                    onClick={handleDownload}
                    className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md"
                  >
                    Download Image
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBgRemoval; 