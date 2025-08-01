import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-blue-500 flex items-center justify-center mb-8">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          
          <h1 className="text-6xl font-light text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-normal text-gray-700 mb-2">Page not found</h2>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="w-full flex justify-center py-3 px-4 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Go to homepage
          </Link>
          
          <button
            onClick={handleGoBack}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Go back
          </button>
        </div>

        {/* Help Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Need help?</h3>
            <div className="space-y-2">
              <Link 
                href="/contact"
                className="block text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Contact support
              </Link>
              <Link 
                href="/help"
                className="block text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Visit help center
              </Link>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <div className="h-2 w-2 bg-emerald-500"></div>
          <span className="text-xs text-gray-500">All systems operational</span>
        </div>
      </div>
    </div>
  );
}