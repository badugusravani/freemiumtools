import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <SEO 
        title="About Us - FreemiumTools.com"
        description="Learn about FreemiumTools.com, our mission, and the team behind our free online tools."
        keywords="about us, freemium tools, online tools, free tools, web tools"
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">About FreemiumTools.com</h1>
      
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400">
            At FreemiumTools.com, our mission is to provide high-quality, free online tools that make everyday tasks easier and more efficient. 
            We believe that essential digital tools should be accessible to everyone, regardless of their technical expertise or budget.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">What We Offer</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our platform features a growing collection of tools across various categories:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
            <li>Image editing and manipulation tools</li>
            <li>Mathematical calculators and converters</li>
            <li>Color tools and utilities</li>
            <li>Text and document processing tools</li>
            <li>And many more...</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2 dark:text-white">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We ensure our tools are accessible to everyone, with a user-friendly interface and responsive design.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2 dark:text-white">Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We maintain high standards for all our tools, ensuring reliability and accuracy.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2 dark:text-white">Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We respect user privacy and handle data with utmost care and security.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously improve our tools and add new features based on user feedback.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our tools are designed to work directly in your browser - no downloads or installations required. 
            Simply choose a tool, upload your files if needed, and get instant results. We process everything 
            in your browser to ensure privacy and speed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Get Involved</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We welcome feedback and suggestions from our users. If you have ideas for new tools or improvements:
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to="/suggest"
              className="inline-flex items-center px-4 py-2 bg-[#E55B4D] hover:bg-[#c54d41] text-white rounded-md transition-colors"
            >
              Suggest a Tool
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Support Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            FreemiumTools.com is supported by minimal, non-intrusive advertising. By using our tools, you help 
            us maintain and improve the platform while keeping it free for everyone.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 