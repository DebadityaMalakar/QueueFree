import { 
  Clock, 
  Smartphone, 
  CreditCard, 
  Maximize2 as QrCode, 
  Users, 
  BarChart2 as BarChart3,
  Coffee as UtensilsCrossed,
  Calendar,
  Star
} from 'feather-icons-react';
import FeatureCard from '$/components/FeatureCard';

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: "Time Slot Booking",
      description: "Choose your preferred pickup time and avoid long queues during peak hours.",
      color: "bg-blue-600"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Intuitive mobile app designed for quick ordering on the go between classes.",
      color: "bg-orange-500"
    },
    {
      icon: CreditCard,
      title: "UPI Payments",
      description: "Secure payments through GPay, PhonePe, and Paytm. No cash, no hassles.",
      color: "bg-blue-600"
    },
    {
      icon: QrCode,
      title: "QR Code Pickup",
      description: "Show your QR code or student ID for instant order verification and pickup.",
      color: "bg-orange-500"
    },
    {
      icon: UtensilsCrossed,
      title: "Multiple Stalls",
      description: "Browse menus from all canteen stalls in one place. More variety, more choice.",
      color: "bg-blue-600"
    },
    {
      icon: Calendar,
      title: "Real-time Updates",
      description: "Live menu availability, preparation status, and pickup notifications.",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "Student Portal",
      description: "Personalized dashboard with order history, favorites, and quick reorders.",
      color: "bg-blue-600"
    },
    {
      icon: BarChart3,
      title: "Vendor Analytics",
      description: "Stall owners get insights on popular items, peak hours, and revenue tracking.",
      color: "bg-orange-500"
    },
    {
      icon: Star,
      title: "Reviews & Ratings",
      description: "Rate your meals and help fellow students discover the best food options.",
      color: "bg-blue-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            Everything you need for
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"> smart dining</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            QueueFree brings together students, stall owners, and technology to create 
            the ultimate college dining experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;