import React from 'react';
import SEO from '../components/SEO';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <SEO 
        title="Terms of Service - FreemiumTools.com"
        description="Terms of Service and conditions for using FreemiumTools.com"
        keywords="terms of service, legal, conditions, terms and conditions"
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using FreemiumTools.com ("the Website"), you accept and agree to be bound by the terms and 
          provision of this agreement.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily access and use the tools and services on FreemiumTools.com for personal, 
          non-commercial transitory viewing and usage only.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          The tools and services on FreemiumTools.com are provided "as is". We make no warranties, expressed or implied, 
          and hereby disclaim and negate all other warranties, including without limitation, implied warranties or 
          conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
          or other violation of rights.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall FreemiumTools.com or its suppliers be liable for any damages (including, without limitation, 
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
          use the tools and services on the Website.
        </p>

        <h2>5. User Content</h2>
        <p>
          Users are responsible for any content they upload, transmit, or otherwise make available via our tools and 
          services. We do not claim ownership of your content, but you grant us a license to use it for providing and 
          improving our services.
        </p>

        <h2>6. Privacy</h2>
        <p>
          Your use of FreemiumTools.com is also governed by our Privacy Policy. Please review our Privacy Policy, which 
          also governs the Website and informs users of our data collection practices.
        </p>

        <h2>7. Modifications</h2>
        <p>
          FreemiumTools.com reserves the right, at its sole discretion, to modify or replace these Terms at any time. 
          What constitutes a material change will be determined at our sole discretion.
        </p>

        <h2>8. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{' '}
          <a href="mailto:contact@freemiumtools.com" className="text-[#E55B4D] hover:underline">
            contact@freemiumtools.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermsPage; 