import React from "react";

const StatsCard = ({ card }) => {
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{card.icon}</span>
        <span className="text-sm font-semibold text-green-500">
          {card.change}
        </span>
      </div>
      <p className="text-gray-500 text-sm">{card.title}</p>
      <p className="text-2xl font-bold text-gray-900">{card.value}</p>
    </div>
  );
};

export default StatsCard;
