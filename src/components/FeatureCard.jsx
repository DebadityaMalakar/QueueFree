const FeatureCard = ({ icon: Icon, title, description, color = "bg-blue-600" }) => {
  return (
    <div className="border border-gray-200 bg-white p-6 rounded-lg hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 rounded-lg ${color} transition-all duration-300 group-hover:opacity-90`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;