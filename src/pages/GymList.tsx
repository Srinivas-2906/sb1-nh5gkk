import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import axios from 'axios';

interface Gym {
  id: number;
  name: string;
  address: string;
  rating: number;
  image: string;
}

const fetchGyms = async (location: string): Promise<Gym[]> => {
  // In a real application, this would be an API call
  // For this example, we'll return mock data
  return [
    { id: 1, name: "FitZone", address: "123 Main St, Cityville", rating: 4.5, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "PowerHouse Gym", address: "456 Elm St, Townsburg", rating: 4.2, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Iron Pumpers", address: "789 Oak St, Fitnessville", rating: 4.7, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
  ];
};

const GymList: React.FC = () => {
  const [location, setLocation] = useState('');
  const { data: gyms, isLoading, error } = useQuery({
    queryKey: ['gyms', location],
    queryFn: () => fetchGyms(location),
    enabled: !!location,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger the query by updating the location
    setLocation(location);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Find Gyms Near You</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms && gyms.map((gym) => (
          <Link key={gym.id} to={`/gym/${gym.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img src={gym.image} alt={gym.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{gym.name}</h2>
              <p className="text-gray-600 mb-2 flex items-center">
                <MapPin size={16} className="mr-1" /> {gym.address}
              </p>
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span>{gym.rating.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GymList;