const StatsCard = ({ title, value, icon, className = "" }) => {
  return (
    <div className={`border border-gray-200 bg-white rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
};

export default StatsCard;