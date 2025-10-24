import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Sample data (you can later fetch these from your backend)
  const featuredQuizzes = [
    {
      id: 1,
      title: "Science Trivia Challenge",
      description: "Test your knowledge of the natural world.",
      image: "https://images.unsplash.com/photo-1581091870622-6c85a11d5a2b",
    },
    {
      id: 2,
      title: "History Buff's Delight",
      description: "Journey through time with challenging questions.",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926",
    },
    {
      id: 3,
      title: "Literary Mastermind",
      description:
        "Prove your expertise in classic and modern literature.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
  ];

  const recentActivity = [
    { id: 1, title: "Science Trivia Challenge", score: "85%", date: "2024-01-15" },
    { id: 2, title: "History Buff's Delight", score: "70%", date: "2024-01-10" },
    { id: 3, title: "Literary Mastermind", score: "92%", date: "2024-01-05" },
  ];

  const leaderboard = [
    { id: 1, name: "Alex", score: "95%", avatar: "https://i.pravatar.cc/50?img=1" },
    { id: 2, name: "Emily", score: "92%", avatar: "https://i.pravatar.cc/50?img=2" },
    { id: 3, name: "Sarah (You)", score: "90%", avatar: "https://i.pravatar.cc/50?img=3" },
    { id: 4, name: "Chris", score: "88%", avatar: "https://i.pravatar.cc/50?img=4" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, user
        </h1>
        <p className="text-gray-600">
          Explore new quizzes or review your past performances.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left section (Featured + Recent) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Featured Quizzes */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Featured Quizzes
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={quiz.image}
                    alt={quiz.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="text-indigo-700 font-medium hover:underline"
                    >
                      Start Quiz →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Your Recent Activity
            </h2>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="min-w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <tr>
                    <th className="py-3 px-5">Quiz Title</th>
                    <th className="py-3 px-5">Score</th>
                    <th className="py-3 px-5">Date Taken</th>
                    <th className="py-3 px-5"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {recentActivity.map((activity) => (
                    <tr
                      key={activity.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-5">{activity.title}</td>
                      <td className="py-3 px-5">{activity.score}</td>
                      <td className="py-3 px-5">{activity.date}</td>
                      <td className="py-3 px-5">
                        <Link
                          to={`/result/${activity.id}`}
                          className="text-indigo-700 font-medium hover:underline"
                        >
                          View Results
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right section (Leaderboard) */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Leaderboard</h2>
          <div className="bg-white rounded-xl shadow divide-y">
            {leaderboard.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-700">{index + 1}</span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-800">{user.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {user.score} avg. score
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
