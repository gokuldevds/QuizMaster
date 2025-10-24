import { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Dummy Data (remove when API is ready)
    const dummyData = [
      {
        name: "Sophia Clark",
        username: "sophclark",
        email: "sophia@example.com",
        avatar: "https://i.pravatar.cc/100?img=1",
        score: 950,
        quizzesCompleted: 15,
      },
      {
        name: "Ethan Bennett",
        username: "ethanb",
        email: "ethan@example.com",
        avatar: "https://i.pravatar.cc/100?img=2",
        score: 920,
        quizzesCompleted: 14,
      },
      {
        name: "Olivia Carter",
        username: "oliviac",
        email: "olivia@example.com",
        avatar: "https://i.pravatar.cc/100?img=3",
        score: 900,
        quizzesCompleted: 13,
      },
      {
        name: "Liam Davis",
        username: "liamdavis",
        email: "liam@example.com",
        avatar: "https://i.pravatar.cc/100?img=4",
        score: 880,
        quizzesCompleted: 12,
      },
      {
        name: "Ava Evans",
        username: "avaevans",
        email: "ava@example.com",
        avatar: "https://i.pravatar.cc/100?img=5",
        score: 860,
        quizzesCompleted: 11,
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setLeaderboard(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <main className="p-8 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
      <p className="text-gray-500 mb-8">
        See how you stack up against other quiz enthusiasts. The competition is fierce!
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-8 mb-6 border-b border-gray-200">
        <button className="text-indigo-600 border-b-2 border-indigo-600 pb-2 font-medium">
          Overall
        </button>
        <button className="text-gray-500 hover:text-indigo-600 pb-2">
          By Quiz
        </button>
        <button className="text-gray-500 hover:text-indigo-600 pb-2">
          Friends
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Rank</th>
              <th className="px-6 py-3 text-left font-semibold">User</th>
              <th className="px-6 py-3 text-left font-semibold">Total Score</th>
              <th className="px-6 py-3 text-left font-semibold">Quizzes Completed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr
                key={user.email}
                className={`${
                  index === 0 ? "bg-indigo-50" : "bg-white"
                } border-t border-gray-200`}
              >
                {/* Rank */}
                <td className="px-6 py-4 font-medium">
                  {index === 0 ? (
                    <span className="text-yellow-500 text-xl">🏆 1</span>
                  ) : (
                    <span className="text-gray-600">{index + 1}</span>
                  )}
                </td>

                {/* User Info */}
                <td className="px-6 py-4 flex items-center gap-3 text-left">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-gray-500 text-sm">@{user.username}</div>
                  </div>
                </td>

                {/* Score */}
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {user.score}
                </td>

                {/* Quizzes Completed */}
                <td className="px-6 py-4 text-gray-700">
                  {user.quizzesCompleted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-6 text-gray-500">
        <button className="flex items-center hover:text-indigo-600">
          ← Previous
        </button>
        <div className="flex space-x-2 text-gray-700">
          <span className="text-indigo-600 font-semibold">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>10</span>
        </div>
        <button className="flex items-center hover:text-indigo-600">
          Next →
        </button>
      </div>
    </main>
  );
};

export default LeaderBoard;
