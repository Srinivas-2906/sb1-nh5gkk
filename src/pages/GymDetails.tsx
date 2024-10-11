import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Star, Clock, DollarSign } from 'lucide-react';

interface Gym {
  id: number;
  name: string;
  address: string;
  rating: number;
  image: string;
  description: string;
  hours: string;
  pricing: {
    hourly: number;
    monthly: number;
  };
}

const fetchGymDetails = async (id: string): Promise<Gym> => {
  // In a real application, this would be an API call
  // For this example, we'll return mock data
  return {
    id: parseInt(id),
    name: "FitZone",
    address: "123 Main St, Cityville",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "FitZone is a state-of-the-art gym facility offering a wide range of equipment and classes for all fitness levels.",
    hours: "Monday - Friday: 6am - 10pm, Saturday - Sunday: 8am - 8pm",
    pricing: {
      hourly: 10,
      monthly: 50
    }
  };
};

const GymDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: gym, isLoading, error } = useQuery({
    queryKey: ['gym', id],
    queryFn: () => fetchGymDetails(id!),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  if (!gym) return <div>Gym not found</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={gym.image} alt={gym.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{gym.name}</h1>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin size={20} className="mr-2" /> {gym.address}
        </p>
        <div className="flex items-center mb-4">
          <Star size={20} className="text-yellow-400 mr-2" />
          <span className="text-xl font-semibold">{gym.rating.toFixed(1)}</span>
        </div>
        <p className="text-gray-700 mb-4">{gym.description}</p>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Hours</h2>
          <p className="text-gray-600 flex items-center">
            <Clock size={20} className="mr-2" /> {gym.hours}
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Pricing</h2>
          <p className="text-gray-600 flex items-center mb-1">
            <DollarSign size={20} className="mr-2" /> Hourly: ${gym.pricing.hourly}
          </p>
          <p className="text-gray-600 flex items-center">
            <DollarSign size={20} className="mr-2" /> Monthly: ${gym.pricing.monthly}
          </p>
        </div>
        <Link
          to={`/booking/${gym.id}`}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold inline-block hover:bg-blue-700 transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default GymDetails;