import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

      console.log("Sending Payload:", payload);

      const response = await axios.post(
        'https://striking-gavra-parai-6600deaf.koyeb.app/webhook/social-media-backend',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Webhook Response:", response.data);

      const { post, image } = response.data;
      setGeneratedContent(post || 'Post generated successfully.');
      setImageUrl(image || '');
    } catch (err) {
      console.error("Webhook Error:", err.message, err.response?.data || err);
      setGeneratedContent('Something went wrong while generating the post.');
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!website.startsWith('https://')) {
      setWebsite(prev => `https://${prev.replace(/^https?:\/\//, '')}`);
    }
  }, [website]);

  return (
    <div className="h-screen bg-blue-50 px-6 py-10 overflow-y-auto">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">Social Media Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto h-full items-start">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Your Post</h3>
          <p className="text-sm text-gray-500 mb-6">Fill out the form to create an AI-powered social media post.</p>

          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g., Technology, Healthcare"
            className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
          <input
            type="text"
            value={website}
            onChange={(e) => {
              const val = e.target.value;
              setWebsite(val.startsWith('https://') ? val : `https://${val.replace(/^https?:\/\//, '')}`);
            }}
            placeholder="https://example.com"
            className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <label className="block text-sm font-medium text-gray-700 mb-1">Social Media Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm"
          >
            <option>LinkedIn</option>
            <option>X</option>
            <option>Instagram</option>
            <option>Facebook</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">Type of Post</label>
          <div className="mb-4">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="Generic"
                checked={type === 'Generic'}
                onChange={() => setType('Generic')}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Generic</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Custom"
                checked={type === 'Custom'}
                onChange={() => setType('Custom')}
                className="form-radio text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">Custom</span>
            </label>
          </div>

          {type === 'Generic' ? (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm"
              >
                <option value="">Select category</option>
                <option>News</option>
                <option>Tools</option>
                <option>Productivity</option>
              </select>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Text</label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={4}
                placeholder="Describe the post you want to generate..."
                className="w-full mb-4 px-3 py-2 border rounded-md shadow-sm"
              ></textarea>
            </>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 shadow"
          >
            {loading ? 'Generating...' : 'Generate Post'}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Content</h3>
          <p className="text-sm text-gray-500 mb-4">Your AI-generated social media post will appear here.</p>
          <div className="text-gray-700 whitespace-pre-line min-h-[150px] mb-4">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
              </div>
            ) : (
              generatedContent || 'No post generated yet.'
            )}
          </div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="Generated Visual"
                className="w-full max-h-96 object-contain rounded-md shadow mb-4"
              />
              <a
                href={imageUrl}
                download="ai-image.jpg"
                className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGenerator;
