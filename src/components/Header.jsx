import { Coffee, Users, Home } from 'feather-icons-react';
import Button from '$/components/Button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container flex h-16 items-center">
        {/* Left-aligned logo and navigation */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2 mr-2">
            <Coffee className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              QueueFree
            </span>
          </div>
          
          {/* Navigation links immediately beside the logo */}
          <nav className="hidden md:flex items-center ml-6 space-x-6">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Right-aligned buttons with no gap */}
        <div className="flex-1 flex justify-end">
          <div className="flex space-x-4">
            <Button 
              variant="tertiary" 
              size="sm"
              icon={Users}
              onClick={() => window.location.href = '/StudentAuth'}
            >
              Student Login
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              icon={Home}
              onClick={() => window.location.href = '/StallOwnerAuth'}
            >
              Vendor Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;