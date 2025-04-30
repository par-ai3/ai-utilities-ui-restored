import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBullhorn, FaBuilding, FaCog } from 'react-icons/fa';

const toolsList = [
  {
    id: 1,
    title: 'Social Media Generator',
    description: 'Use AI to create tailored social media content',
    icon: <FaBullhorn size={32} color="#facc15" />,
    path: '/social-media-generator',
  },
  {
    id: 2,
    title: 'HR Policies',
    description: 'Ask questions and get AI-powered HR answers',
    icon: <FaBuilding size={32} color="#60a5fa" />,
    path: '/hr-policies',
  },
  {
    id: 3,
    title: 'Placeholder 3',
    description: 'Reserved for future AI tools',
    icon: <FaCog size={32} color="#a78bfa" />,
    path: '/placeholder-3',
  },
  {
    id: 4,
    title: 'Placeholder 4',
    description: 'Reserved for future AI tools',
    icon: <FaCog size={32} color="#f472b6" />,
    path: '/placeholder-4',
  },
];

const Home = () => {
  const [navSearch, setNavSearch] = useState('');
  const [navSuggestions, setNavSuggestions] = useState(false);
  const [mainSearch, setMainSearch] = useState('');
  const [mainSuggestions, setMainSuggestions] = useState(false);
  const navigate = useNavigate();

  const navFiltered = toolsList.filter(tool =>
    tool.title.toLowerCase().includes(navSearch.toLowerCase())
  );

  const mainFiltered = toolsList.filter(tool =>
    tool.title.toLowerCase().includes(mainSearch.toLowerCase())
  );

  const handleNavSubmit = (e) => {
    e.preventDefault();
    if (navFiltered.length === 1) {
      navigate(navFiltered[0].path);
    }
  };

  const handleMainSubmit = (e) => {
    e.preventDefault();
    if (mainFiltered.length === 1) {
      navigate(mainFiltered[0].path);
    }
  };

  const handleNavSelect = (tool) => {
    setNavSearch(tool.title);
    setNavSuggestions(false);
    navigate(tool.path);
  };

  const handleMainSelect = (tool) => {
    setMainSearch(tool.title);
    setMainSuggestions(false);
    navigate(tool.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-blue-700 text-white px-6 py-4 shadow flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-700 font-bold px-2 py-1 rounded shadow">AI</div>
          <h1 className="text-white text-xl font-semibold">CKPL AI Utilities</h1>
        </div>
        <div className="flex space-x-4 relative">
          <form
            onSubmit={handleNavSubmit}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={navSearch}
              onChange={(e) => {
                setNavSearch(e.target.value);
                setNavSuggestions(true);
              }}
              placeholder="Search AI Agents..."
              className="rounded px-3 py-1 text-sm text-black shadow"
            />
            {navSuggestions && navSearch && (
              <ul className="absolute z-10 bg-white text-black border mt-1 w-full max-h-40 overflow-y-auto rounded shadow">
                {navFiltered.map(tool => (
                  <li
                    key={tool.id}
                    onClick={() => handleNavSelect(tool)}
                    className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
                  >
                    {tool.title}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <button
            className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 shadow"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
      </div>

      <div className="px-6 py-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4 tracking-tight">CKPL AI Utilities</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Access powerful tools to streamline your workflow and increase productivity
        </p>

        <form
          onSubmit={handleMainSubmit}
          className="flex justify-center mb-10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={mainSearch}
            onChange={(e) => {
              setMainSearch(e.target.value);
              setMainSuggestions(true);
            }}
            placeholder="Search tools..."
            className="rounded-l px-4 py-3 border w-96 shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-r hover:bg-blue-700 shadow"
          >
            Search
          </button>
          {mainSuggestions && mainSearch && (
            <ul className="absolute left-0 top-full z-10 bg-white text-black border mt-1 w-full max-h-40 overflow-y-auto rounded shadow">
              {mainFiltered.map(tool => (
                <li
                  key={tool.id}
                  onClick={() => handleMainSelect(tool)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {tool.title}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
          {mainFiltered.map(tool => (
            <div
              key={tool.id}
              onClick={() => navigate(tool.path)}
              className="cursor-pointer p-6 bg-white rounded-xl shadow-md hover:shadow-xl text-center transition duration-300 border-t-4 border-blue-600"
            >
              <div className="flex justify-center mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600">{tool.description}</p>
            </div>
          ))}
          {mainFiltered.length === 0 && (
            <p className="col-span-full text-center text-gray-500">No tools found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
