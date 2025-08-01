const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`relative overflow-hidden border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`p-6 pb-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 
      className={`text-xl font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p 
      className={`text-gray-600 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`p-6 pt-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent };