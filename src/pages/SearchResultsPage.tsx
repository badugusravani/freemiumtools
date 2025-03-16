import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../data/categories';
import { Tool } from '../types';
import SEO from '../components/SEO';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Array<{ tool: Tool; category: string }>>([]);

  useEffect(() => {
    if (query) {
      const searchResults = categories.reduce<Array<{ tool: Tool; category: string }>>((acc, category) => {
        const matchingTools = category.tools.filter(tool => 
          tool.title.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase())
        );
        
        return [
          ...acc,
          ...matchingTools.map(tool => ({ tool, category: category.title }))
        ];
      }, []);

      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <SEO 
        title={`Search Results for "${query}" - FreemiumTools.com`}
        description={`Search results for "${query}" on FreemiumTools.com`}
        keywords={`search, ${query}, tools`}
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
        {query ? `Search Results for "${query}"` : 'Search Tools'}
      </h1>

      {/* Search bar */}
      <form 
        action="/search"
        method="get"
        className="mb-8"
      >
        <div className="flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for tools..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E55B4D] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#E55B4D] text-white rounded-md hover:bg-[#c54d41] transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {query ? (
        results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(({ tool, category }) => (
              <article 
                key={tool.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-semibold mb-2 dark:text-white">{tool.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{tool.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">Category: {category}</p>
                <Link
                  to={`/${tool.id}`}
                  className="inline-flex items-center px-3 py-1.5 bg-[#E55B4D] hover:bg-[#c54d41] text-white rounded-md text-sm transition-colors"
                >
                  Use Tool
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No results found for "{query}"</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Try searching with different keywords or{' '}
              <Link to="/" className="text-[#E55B4D] hover:underline">
                browse all tools
              </Link>
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">Enter a search term to find tools</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage; 