import { ArrowRight, Clock, CreditCard, Maximize2 } from 'feather-icons-react';
import Button from '$/components/Button';
import Image from 'next/image';
import heroImage from '$/assets/hero-canteen.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Skip the{' '}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Queue
                </span>
                <br />
                Order Smart
              </h1>
              <p className="text-xl text-gray-600 max-w-[600px]">
                Pre-order your favorite canteen meals and pick them up without waiting. 
                QueueFree makes college dining faster, smarter, and more convenient.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="text-lg px-8"
                icon={ArrowRight}
                iconPosition="right"
              >
                Get Started
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8"
              >
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <Clock className="h-8 w-8 text-primary-600 mx-auto" />
                <p className="text-sm font-medium">Save Time</p>
              </div>
              <div className="text-center space-y-2">
                <CreditCard className="h-8 w-8 text-primary-600 mx-auto text-black" />
                <p className="text-sm font-medium">Easy Payment</p>
              </div>
              <div className="text-center space-y-2">
                <Maximize2 className="h-8 w-8 text-primary-600 mx-auto" />
                <p className="text-sm font-medium">QR Pickup</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <Image
                src={heroImage}
                alt="College canteen with students ordering food"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating cards for visual appeal */}
            <div className="absolute -top-4 -right-4 bg-white rounded-md shadow-sm p-3 border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-secondary-500"></div>
                <span className="text-sm font-medium">Order Ready!</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-md shadow-sm p-3 border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                <span className="text-sm font-medium">5 min pickup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;