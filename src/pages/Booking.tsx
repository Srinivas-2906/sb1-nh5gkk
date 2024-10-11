import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

interface Gym {
  id: number;
  name: string;
}

interface BookingForm {
  date: string;
  time: string;
  duration: string;
}

const fetchGymDetails = async (id: string): Promise<Gym> => {
  // In a real application, this would be an API call
  return { id: parseInt(id), name: "FitZone" };
};

const BookingForm: React.FC<{ gym: Gym }> = ({ gym }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingForm>();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const onSubmit = async (data: BookingForm) => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    // In a real application, you would send the booking data to your server
    // and create a PaymentIntent on the server side
    const { error } = await stripe.confirmCardPayment('client_secret_test');

    if (error) {
      setPaymentError(error.message || 'An error occurred during payment.');
      setIsProcessing(false);
    } else {
      // Payment successful, handle the booking confirmation
      console.log('Booking confirmed:', { gym, ...data });
      // Redirect to a confirmation page or show a success message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            id="date"
            {...register('date', { required: 'Date is required' })}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>}
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="time"
            id="time"
            {...register('time', { required: 'Time is required' })}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        {errors.time && <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>}
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
        <select
          id="duration"
          {...register('duration', { required: 'Duration is required' })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select duration</option>
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
        </select>
        {errors.duration && <p className="mt-2 text-sm text-red-600">{errors.duration.message}</p>}
      </div>

      <div>
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">Credit Card</label>
        <div className="mt-1">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {paymentError && <div className="text-red-600 text-sm">{paymentError}</div>}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isProcessing ? 'Processing...' : 'Book Now'}
      </button>
    </form>
  );
};

const Booking: React.FC = () => {
  const { gymId } = useParams<{ gymId: string }>();
  const { data: gym, isLoading, error } = useQuery({
    queryKey: ['gym', gymId],
    queryFn: () => fetchGymDetails(gymId!),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;
  if (!gym) return <div>Gym not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book a Session at {gym.name}</h1>
      <Elements stripe={stripePromise}>
        <BookingForm gym={gym} />
      </Elements>
    </div>
  );
};

export default Booking;