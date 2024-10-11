import React from 'react';
import { User, Calendar, CreditCard } from 'lucide-react';

const Profile: React.FC = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2023-01-01',
    upcomingBookings: [
      { id: 1, gym: 'FitZone', date: '2024-03-25', time: '10:00 AM' },
      { id: 2, gym: 'PowerHouse Gym', date: '2024-03-28', time: '2:00 PM' },
    ],
    paymentMethods: [
      { id: 1, type: 'Visa', last4: '4242' },
      { id: 2, type: 'Mastercard', last4: '5555' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <User size={24} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Personal Information</h2>
        </div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member Since:</strong> {user.memberSince}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Calendar size={24} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
        </div>
        {user.upcomingBookings.length > 0 ? (
          <ul className="space-y-2">
            {user.upcomingBookings.map((booking) => (
              <li key={booking.id} className="border-b pb-2">
                <p><strong>{booking.gym}</strong></p>
                <p>{booking.date} at {booking.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming bookings</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <CreditCard size={24} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Payment Methods</h2>
        </div>
        {user.paymentMethods.length > 0 ? (
          <ul className="space-y-2">
            {user.paymentMethods.map((method) => (
              <li key={method.id} className="flex items-center">
                <CreditCard size={20} className="mr-2" />
                <span>{method.type} ending in {method.last4}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No payment methods added</p>
        )}
      </div>
    </div>
  );
};

export default Profile;