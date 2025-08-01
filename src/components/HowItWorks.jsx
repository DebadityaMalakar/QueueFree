import { 
  LogIn, 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Maximize2 as QrCode, 
  Star,
  ArrowRight
} from 'feather-icons-react';
import Button from '$/components/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$/components/Card';

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: LogIn,
      title: "Sign In",
      description: "Students and vendors log in through their respective portals with college credentials.",
      userType: "Both",
      bgColor: "bg-blue-600"
    },
    {
      step: "02",
      icon: Search,
      title: "Browse Stalls",
      description: "Students explore available stalls, view live menus, prices, and preparation times.",
      userType: "Student",
      bgColor: "bg-orange-500"
    },
    {
      step: "03",
      icon: ShoppingCart,
      title: "Place Order",
      description: "Select items, choose pickup time slot, and add special instructions if needed.",
      userType: "Student",
      bgColor: "bg-blue-600"
    },
    {
      step: "04",
      icon: CreditCard,
      title: "Secure Payment",
      description: "Complete payment through UPI (GPay/PhonePe/Paytm) for a cashless experience.",
      userType: "Student",
      bgColor: "bg-orange-500"
    },
    {
      step: "05",
      icon: QrCode,
      title: "Pickup & Scan",
      description: "Show QR code or student ID at the stall for instant order verification and collection.",
      userType: "Student",
      bgColor: "bg-blue-600"
    },
    {
      step: "06",
      icon: Star,
      title: "Rate & Review",
      description: "Share feedback to help improve service quality and help other students choose.",
      userType: "Student",
      bgColor: "bg-orange-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              QueueFree
            </span>{" "}
            Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, fast, and efficient. Get your favorite meals in just a few taps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center text-white font-bold text-lg`}>
                      {step.step}
                    </div>
                    <div>
                      <CardTitle>{step.title}</CardTitle>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {step.userType}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-lg ${step.bgColor}`}>
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {step.description}
                </CardDescription>
              </CardContent>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="primary" 
            size="lg" 
            className="text-lg px-8"
            icon={ArrowRight}
            iconPosition="right"
          >
            Start Ordering Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;