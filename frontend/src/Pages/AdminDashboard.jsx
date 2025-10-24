import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Users, ListChecks, Brain, UserCircle, Plus } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Temporarily removed redirect for testing
  // useEffect(() => {
  //   if (!user || user.role !== "admin") {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);
  // ---------- STATES ----------
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalUsers: 0,
    avgScore: 0,
  });

  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------- FETCH DATA ----------
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with your backend endpoints later
        const [statsRes, quizzesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/stats"),
          axios.get("http://localhost:5000/api/admin/recent-quizzes"),
        ]);

        setStats(statsRes.data);
        setRecentQuizzes(quizzesRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);

        // Temporary fallback data for UI testing
        setStats({ totalQuizzes: 150, totalUsers: 500, avgScore: 75 });
        setRecentQuizzes([
          { title: "History Quiz", participants: 25, avgScore: "80%", status: "Active" },
          { title: "Science Challenge", participants: 30, avgScore: "70%", status: "Completed" },
          { title: "Math Mania", participants: 20, avgScore: "90%", status: "Active" },
          { title: "Literature Test", participants: 15, avgScore: "75%", status: "Completed" },
          { title: "Geography Quiz", participants: 22, avgScore: "85%", status: "Active" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">QuizMaster</h2>
          </div>
          <nav className="p-4 space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 p-2 rounded-lg bg-blue-100 text-blue-600 font-medium"
            >
              <ListChecks size={18} /> Dashboard
            </Link>
            <Link
              to="/admin/quizzes"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Brain size={18} /> Quizzes
            </Link>
            <Link
              to="/admin/create-quiz"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Plus size={18} /> Create Quiz
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Users size={18} /> Users
            </Link>
            <Link
              to="/admin/ai-assistant"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              🤖 AI Assistant
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t">
          <Link
            to="/admin/profile"
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600"
          >
            <UserCircle size={18} /> Profile
          </Link>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-gray-500">Total Quizzes</p>
            <h2 className="text-3xl font-bold mt-2">{stats.totalQuizzes}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold mt-2">{stats.totalUsers}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-gray-500">Average Score</p>
            <h2 className="text-3xl font-bold mt-2">{stats.avgScore}%</h2>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Quiz Title</th>
                <th className="p-3">Participants</th>
                <th className="p-3">Average Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentQuizzes.map((quiz, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 text-gray-700"
                >
                  <td className="p-3">{quiz.title}</td>
                  <td className="p-3">{quiz.participants}</td>
                  <td className="p-3">{quiz.avgScore}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        quiz.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {quiz.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
