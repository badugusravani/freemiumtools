import React, { useState } from 'react';
import SEO from '../components/SEO';

const SuggestPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setSubmitted(true);
    
    // Optional: Send email using mailto link
    window.location.href = `mailto:contact@freemiumtools.com?subject=Tool Suggestion: ${toolName}&body=Tool Name: ${toolName}%0D%0A%0D%0ADescription: ${description}%0D%0A%0D%0ASubmitted by: ${name}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <SEO 
        title="Suggest a Tool - FreemiumTools.com"
        description="Suggest a new tool for FreemiumTools.com"
        keywords="suggest tool, new tool, feature request"
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">Suggest a Tool</h1>
      
      {submitted ? (
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg mb-6">
          <p className="text-green-800 dark:text-green-200">
            Thank you for your suggestion! We'll review it and get back to you soon.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have an idea for a useful tool? We'd love to hear it! Fill out the form below to suggest a new tool for our platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E55B4D] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E55B4D] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="toolName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tool Name
              </label>
              <input
                type="text"
                id="toolName"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E55B4D] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tool Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Please describe what the tool should do and why it would be useful..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E55B4D] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#E55B4D] text-white rounded-md hover:bg-[#c54d41] transition-colors"
            >
              Submit Suggestion
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Other Ways to Reach Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Email us directly at:{' '}
              <a 
                href="mailto:contact@freemiumtools.com"
                className="text-[#E55B4D] hover:underline"
              >
                contact@freemiumtools.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestPage; 