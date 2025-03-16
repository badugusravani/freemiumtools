import React, { useState } from 'react';
import SEO from '../components/SEO';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setSubmitted(true);
    
    // Optional: Send email using mailto link
    window.location.href = `mailto:contact@freemiumtools.com?subject=${subject}&body=From: ${name}%0D%0A%0D%0A${message}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <SEO 
        title="Contact Us - FreemiumTools.com"
        description="Get in touch with the FreemiumTools.com team"
        keywords="contact, support, help, feedback"
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">Contact Us</h1>
      
      {submitted ? (
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg mb-6">
          <p className="text-green-800 dark:text-green-200">
            Thank you for your message! We'll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
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
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E55B4D] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E55B4D] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#E55B4D] text-white rounded-md hover:bg-[#c54d41] transition-colors"
            >
              Send Message
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

export default ContactPage; 