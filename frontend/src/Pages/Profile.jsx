import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl text-white">
            {user.username ? user.username[0].toUpperCase() : '?'}
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Quizzes Taken</h3>
            <p className="text-3xl font-bold text-blue-600">{user.quizzesTaken || 0}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Average Score</h3>
            <p className="text-3xl font-bold text-green-600">{user.averageScore || 0}%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Ranking</h3>
            <p className="text-3xl font-bold text-purple-600">#{user.ranking || '--'}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {user.recentActivity && user.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {user.recentActivity.map((activity, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold">{activity.title}</p>
                  <p className="text-sm text-gray-600">
                    Score: {activity.score}% • {activity.date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No recent activity</p>
          )}
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.achievements ? (
              user.achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-yellow-400' : 'bg-gray-200'}`}>
                    {/* Achievement icon would go here */}
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="text-sm font-semibold">{achievement.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No achievements yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;