import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-black mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white/5 p-6 rounded-3xl">
          <h2 className="text-gray-400">
            Total Users
          </h2>
          <p className="text-4xl font-black mt-2">
            1,250
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl">
          <h2 className="text-gray-400">
            Games
          </h2>
          <p className="text-4xl font-black mt-2">
            75
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl">
          <h2 className="text-gray-400">
            Scores
          </h2>
          <p className="text-4xl font-black mt-2">
            25K
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;