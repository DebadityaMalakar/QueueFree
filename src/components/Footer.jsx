import { Coffee, Mail, Phone, MapPin } from 'feather-icons-react';

const currentYear = new Date().getFullYear();
const displayYear = currentYear > 2025 ? `2025-${currentYear}` : "2025";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                QueueFree
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs">
              Revolutionizing college dining with smart pre-ordering and queue-free pickup.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#features" className="hover:text-blue-600 transition-colors duration-200">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors duration-200">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Student Portal</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Vendor Dashboard</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4" id='contact'>
            <h3 className="font-semibold text-gray-900">Contact Info</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>support@queuefree.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>monish@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>College Campus, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {displayYear} QueueFree. All rights reserved with monish. | For SRM STUDENTS Exclusively available</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;