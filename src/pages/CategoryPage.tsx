import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { Category, Tool } from '../types';
import SEO from '../components/SEO';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  // Find the category without the c- prefix
  const category = categories.find((c: Category) => c.id === categoryId);

  // If category doesn't exist, redirect to home
  if (!category) {
    React.useEffect(() => {
      navigate('/', { replace: true });
    }, [navigate]);
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <SEO 
        title={`${category.title} Tools - FreemiumTools.com`}
        description={`Explore our collection of ${category.title.toLowerCase()} tools. ${category.description}`}
        keywords={`${category.title.toLowerCase()}, tools, online tools, free tools`}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">{category.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.tools.map((tool: Tool) => (
          <article 
            key={tool.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2 dark:text-white">{tool.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
            <Link
              to={`/${tool.id}`}
              className="inline-flex items-center px-4 py-2 bg-[#E55B4D] hover:bg-[#c54d41] text-white rounded-md text-sm transition-colors"
            >
              Use Tool
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 