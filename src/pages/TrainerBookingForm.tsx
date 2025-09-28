import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

interface Trainer {
  id: string;
  name: string;
  email: string;
  specialty: string;
  experience: number;
  bio?: string;
}

const TrainerBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    trainerId: '',
    trainerName: '',
    sessionDate: '',
    preferredTime: ''
  });
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Fetch trainers on component mount
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/trainers`);
        const data = await response.json();
        if (data.success) {
          setTrainers(data.data);
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };
    fetchTrainers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update trainerName when trainerId changes
    if (name === 'trainerId') {
      const selectedTrainer = trainers.find(t => t.id === value);
      setFormData(prev => ({
        ...prev,
        trainerId: value,
        trainerName: selectedTrainer?.name || ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${BASE_URL}/api/trainers/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: 'Trainer session booked successfully! We will contact you soon.', type: 'success' });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setMessage({ text: data.message || 'Booking failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Book a Trainer Session
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Choose your trainer and schedule your personal training session
          </p>
        </div>
        
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="trainerId" className="block text-sm font-medium text-gray-300 mb-2">
                  Select Trainer *
                </label>
                <select
                  id="trainerId"
                  name="trainerId"
                  required
                  value={formData.trainerId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Choose a trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} - {trainer.specialty} ({trainer.experience} years exp.)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="sessionDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Session Date *
                </label>
                <input
                  id="sessionDate"
                  name="sessionDate"
                  type="date"
                  required
                  value={formData.sessionDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Time *
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
                  <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                </select>
              </div>
            </div>

            {message.text && (
              <div className={`p-4 rounded-lg text-sm font-medium ${
                message.type === 'success' 
                  ? 'bg-green-900/20 border border-green-500 text-green-400' 
                  : 'bg-red-900/20 border border-red-500 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Booking...' : 'Book Trainer Session'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainerBookingForm;
