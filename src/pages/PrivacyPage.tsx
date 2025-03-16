import React from 'react';
import SEO from '../components/SEO';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <SEO 
        title="Privacy Policy - FreemiumTools.com"
        description="Privacy Policy for FreemiumTools.com"
        keywords="privacy policy, data protection, personal information"
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you voluntarily provide to us when you use our tools and services. This may include:
        </p>
        <ul>
          <li>Contact information (such as email address)</li>
          <li>Usage data and preferences</li>
          <li>Files and content you upload to use our tools</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain our services</li>
          <li>Improve and personalize your experience</li>
          <li>Communicate with you about our services</li>
          <li>Respond to your requests and inquiries</li>
        </ul>

        <h2>3. Data Storage and Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information. However, 
          please note that no method of transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2>4. Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our Website and hold certain information. 
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, 
          perform service-related tasks, or assist us in analyzing how our services are used.
        </p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to our processing of your data</li>
        </ul>

        <h2>7. Children's Privacy</h2>
        <p>
          Our services are not intended for use by children under the age of 13. We do not knowingly collect personal 
          information from children under 13.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page and updating the "last updated" date.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:{' '}
          <a href="mailto:contact@freemiumtools.com" className="text-[#E55B4D] hover:underline">
            contact@freemiumtools.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage; 