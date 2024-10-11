import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 GymFinder. All rights reserved.</p>
        <p className="mt-2">Find your perfect gym and stay fit!</p>
      </div>
    </footer>
  );
};

export default Footer;