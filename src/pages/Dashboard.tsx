import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState<{ id: string; role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    if (!token || !userId || !userRole) {
      navigate('/login');
      return;
    }

    setUser({ id: userId, role: userRole });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">StayFit Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, User #{user.id} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-6">Welcome to Your Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h3 className="text-lg font-semibold text-white mb-2">Profile</h3>
              <p className="text-gray-400 text-sm">Manage your account settings and preferences</p>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                View Profile
              </button>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h3 className="text-lg font-semibold text-white mb-2">Bookings</h3>
              <p className="text-gray-400 text-sm">View and manage your fitness program bookings</p>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                View Bookings
              </button>
            </div>

            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <h3 className="text-lg font-semibold text-white mb-2">Programs</h3>
              <p className="text-gray-400 text-sm">Explore available fitness programs and classes</p>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Browse Programs
              </button>
            </div>

            {user.role === 'admin' && (
              <>
                <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-2">Admin Panel</h3>
                  <p className="text-gray-400 text-sm">Manage bookings, contacts, and trainers</p>
                  <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    Admin Tools
                  </button>
                </div>

                <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                  <p className="text-gray-400 text-sm">View system statistics and reports</p>
                  <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                    View Analytics
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Placeholder Content */}
          <div className="mt-8 p-6 bg-slate-700 rounded-lg border border-slate-600">
            <h3 className="text-xl font-semibold text-white mb-4">Dashboard Overview</h3>
            <p className="text-gray-400 mb-4">
              This is a placeholder dashboard. In a full implementation, you would see:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Recent bookings and appointments</li>
              <li>• Fitness progress tracking</li>
              <li>• Upcoming classes and programs</li>
              <li>• Personal trainer communications</li>
              <li>• Payment history and billing</li>
              {user.role === 'admin' && (
                <>
                  <li>• User management tools</li>
                  <li>• Booking management system</li>
                  <li>• Analytics and reporting</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
