import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { categories } from '../data/categories';
import SEO from '../components/SEO';
import { Calculator } from '../components/MathTools';
import { ImageResizer, ImageCropper, ImageExposure, ImageBgRemoval } from '../components/ImageTools';
import { Category, Tool } from '../types';

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();

  if (!toolId) {
    return <Navigate to="/" replace />;
  }

  // Find which category this tool belongs to
  const categoryAndTool = categories.reduce<{ category: Category | null; tool: Tool | null }>(
    (acc, currentCategory) => {
      const foundTool = currentCategory.tools.find(t => t.id === toolId);
      if (foundTool) {
        return { category: currentCategory, tool: foundTool };
      }
      return acc;
    },
    { category: null, tool: null }
  );

  const { category, tool } = categoryAndTool;

  if (!tool || !category) {
    return <Navigate to="/" replace />;
  }

  const renderTool = () => {
    switch (toolId) {
      case 'calculator':
        return <Calculator />;
      case 'image-resizer':
        return <ImageResizer />;
      case 'image-cropper':
        return <ImageCropper />;
      case 'change-image-exposure':
        return <ImageExposure />;
      case 'image-background-remover':
        return <ImageBgRemoval />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-4 dark:text-white">Tool Coming Soon</h1>
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
        <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">{tool.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
      </div>

      {/* Tool content */}
      {renderTool()}
    </div>
  );
};

export default ToolPage; 