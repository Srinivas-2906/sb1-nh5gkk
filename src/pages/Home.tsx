import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to GymFinder</h1>
      <p className="text-xl mb-8">Discover and book gyms near you with ease.</p>
      <Link
        to="/gyms"
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold inline-flex items-center hover:bg-blue-700 transition duration-300"
      >
        <Search className="mr-2" />
        Find Gyms Now
      </Link>
      <div className="mt-12">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Gym equipment"
          className="rounded-lg shadow-xl mx-auto"
        />
      </div>
    </div>
  );
};

export default Home;