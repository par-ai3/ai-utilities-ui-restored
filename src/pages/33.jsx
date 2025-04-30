import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const SocialMediaGenerator = () => {
  const [industry, setIndustry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('https://');
  const [platform, setPlatform] = useState('LinkedIn');
  const [type, setType] = useState('Generic');
  const [category, setCategory] = useState('');
  const [customText, setCustomText] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleGenerate = async () => {
    if (!validateUrl(website)) {
      setError('Please enter a valid website URL.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        industry,
        companyName,
        website,
        platform,
        type,
        category: type === 'Generic' ? category : '',
        customText: type === 'Custom' ? customText : ''
      };

      const response = await axios.post(
        'https://your-account.app.n8n.cloud/webhook-test/social-media-backend',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { post, image } = response.data;
      setGeneratedContent(post || 'Post generated successfully.');
      setImageUrl(image || '');
    } catch (err) {
      setGeneratedContent('Something went wrong while generating the post.');
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const contentBlock = document.createElement('div');
      contentBlock.innerHTML = `<div>${generatedContent}</div>`;
      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "Generated Visual";
        img.style.maxWidth = '100%';
        img.style.borderRadius = '0.5rem';
        contentBlock.appendChild(img);
      }

      const htmlBlob = new Blob([contentBlock.innerHTML], { type: 'text/html' });
      const plainBlob = new Blob([`${generatedContent}\n${imageUrl || ''}`], { type: 'text/plain' });

      const clipboardItem = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': plainBlob
      });

      await navigator.clipboard.write([clipboardItem]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    if (!website.startsWith('https://')) {
      setWebsite(prev => `https://${prev.replace(/^https?:\/\//, '')}`);
    }
  }, [website]);

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-6 sm:px-6 md:px-8 lg:px-12 overflow-y-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-center text-blue-700 mb-6 sm:mb-8"
      >
        Social Media Generator
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-screen-xl mx-auto items-start"
      >
        <motion.div layout className="bg-white rounded-lg shadow p-4 sm:p-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g., Technology, Healthcare" className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm" />

          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter your company name" className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm" />

          <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm" />

          <label className="block text-sm font-medium text-gray-700 mb-1">Social Media Platform</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm">
            <option>LinkedIn</option>
            <option>X</option>
            <option>Instagram</option>
            <option>Facebook</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">Post Type</label>
          <div className="mb-4">
            <label className="inline-flex items-center mr-4">
              <input type="radio" value="Generic" checked={type === 'Generic'} onChange={() => setType('Generic')} className="form-radio text-blue-600" />
              <span className="ml-2 text-sm text-gray-700">Generic</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="Custom" checked={type === 'Custom'} onChange={() => setType('Custom')} className="form-radio text-blue-600" />
              <span className="ml-2 text-sm text-gray-700">Custom</span>
            </label>
          </div>

          <AnimatePresence mode="wait">
            {type === 'Generic' ? (
              <motion.div
                key="generic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm">
                  <option value="">Select category</option>
                  <option>News</option>
                  <option>Tools</option>
                  <option>Productivity</option>
                </select>
              </motion.div>
            ) : (
              <motion.div
                key="custom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Text</label>
                <textarea value={customText} onChange={(e) => setCustomText(e.target.value)} rows={4} className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm" placeholder="Describe the post you want to generate..." />
              </motion.div>
            )}
          </AnimatePresence>

          <button onClick={handleGenerate} disabled={loading} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 shadow transition-all duration-300">
            {loading ? 'Generating...' : 'Generate Post'}
          </button>

          {copied && <p className="mt-2 text-green-600 text-sm">Post copied to clipboard!</p>}
        </motion.div>

        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Generated Content</h3>
          {loading ? (
            <motion.div
              className="w-full h-32 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="whitespace-pre-wrap text-sm text-gray-700 mb-4">{generatedContent}</div>
                {imageUrl && <img src={imageUrl} alt="Generated Visual" className="max-w-full rounded-lg border" />}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="mt-4 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md shadow text-sm transition duration-300"
                >
                  Copy Post
                </motion.button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SocialMediaGenerator;
