import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category, Tool } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, categories }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Find current category based on URL with category prefix or tool ID
  const currentCategory = categories.find(c => {
    // Check if we're on a tool page that belongs to this category
    const toolId = currentPath.slice(1); // Remove leading slash
    return c.tools.some(t => t.id === toolId);
  });

  // Function to determine if we should show tools for a category
  const shouldShowTools = (categoryId: string) => {
    // Only show tools if we're on a tool page and this is the current category
    return currentCategory?.id === categoryId && currentPath.slice(1).length > 0;
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isOpen ? 'block' : 'hidden'
        } md:hidden`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-[48px] left-0 h-[calc(100vh-48px)] w-64 bg-white dark:bg-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 overflow-y-auto flex flex-col border-r border-gray-200 dark:border-gray-700`}
      >
        {/* Social Links */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3b5998] text-white text-sm"
              aria-label="Facebook"
            >
              f
            </a>
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1da1f2] text-white text-sm"
              aria-label="Twitter"
            >
              t
            </a>
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff0000] text-white text-sm"
              aria-label="YouTube"
            >
              y
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="py-2">
            {categories.map((category: Category) => (
              <li key={category.id}>
                {/* Category Link */}
                <Link
                  to={`/category/${category.id}`}
                  className={`block px-4 py-2 text-sm font-medium ${
                    currentCategory?.id === category.id
                      ? 'text-[#E55B4D] bg-gray-50 dark:bg-gray-700'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                >
                  {category.title}
                </Link>

                {/* Show tools only for the current tool's category */}
                {shouldShowTools(category.id) && (
                  <ul className="bg-gray-50 dark:bg-gray-700/50 py-1">
                    {category.tools.map((tool: Tool) => (
                      <li key={tool.id}>
                        <Link
                          to={`/${tool.id}`}
                          className={`block pl-8 pr-4 py-1.5 text-sm ${
                            location.pathname === `/${tool.id}`
                              ? 'text-[#E55B4D] bg-white dark:bg-gray-700'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                          }`}
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              onClose();
                            }
                          }}
                        >
                          {tool.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Links */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-700">
          <div className="p-4 flex justify-center">
            <Link to="/" className="text-xl font-bold text-[#E55B4D]">
              FREEMIUM TOOLS
            </Link>
          </div>
          <div className="px-4 pb-4">
            <ul className="space-y-2 text-sm text-center">
              <li>
                <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/suggest" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Suggest a tool
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;