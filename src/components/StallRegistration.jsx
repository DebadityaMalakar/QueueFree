import { useState } from "react";
import Button from "./Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$/components/Card";
import AuthInput from "$/components/auth/AuthInput";
import { ShoppingBag, Clock, MapPin } from "feather-icons-react";
import Toast from "$/components/Toast";


const StallRegistration = ({ onRegistrationComplete, userEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    floor_number: "",
    owner_phone: "",
    opening_time: "",
    closing_time: "",
    operating_days: []
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    visible,
    message,
    description,
    type
  } | null>(null);

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      operating_days: prev.operating_days.includes(day)
        ? prev.operating_days.filter(d => d !== day)
        : [...prev.operating_days, day]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('stalls')
        .insert({
          name: formData.name,
          description: formData.description,
          floor_number: parseInt(formData.floor_number),
          owner_email: userEmail,
          owner_phone: formData.owner_phone,
          opening_time: formData.opening_time,
          closing_time: formData.closing_time,
          operating_days: formData.operating_days,
          is_registered: true,
          is_active: true
        });

      if (error) throw error;

      setToast({
        visible: true,
        message: "Success",
        description: "Your stall has been registered successfully!",
        type: 'success'
      });

      onRegistrationComplete();
    } catch (error) {
      setToast({
        visible: true,
        message: "Error",
        description: error.message || "Failed to register stall",
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const CustomCheckbox = ({ checked, onChange, label }) => {
    return (
      <div 
        className={`flex items-center space-x-2 p-2 border ${checked ? 'border-blue-600 bg-blue-50' : 'border-gray-300'} cursor-pointer`}
        onClick={onChange}
      >
        <div className={`w-4 h-4 border ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400'} flex items-center justify-center`}>
          {checked && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className="text-sm text-gray-700">{label}</span>
      </div>
    );
  };

  const CustomTextarea = ({ value, onChange, placeholder, className = '' }) => {
    return (
      <div className={`border border-gray-300 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-500 ${className}`}>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 focus:outline-none resize-none"
          rows={4}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Register Your Stall</CardTitle>
          <CardDescription className="text-gray-600">
            Complete your stall registration to start accepting orders
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Stall Information</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stall Name</label>
                  <AuthInput
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Rajesh's Fast Food"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <AuthInput
                    value={formData.owner_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, owner_phone: e.target.value }))}
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <CustomTextarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your stall and cuisine type..."
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Location</h3>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Floor Number</label>
                <div className="border border-gray-300">
                  <select
                    value={formData.floor_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, floor_number: e.target.value }))}
                    className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select floor</option>
                    <option value="1">Ground Floor</option>
                    <option value="2">First Floor</option>
                    <option value="3">Second Floor</option>
                    <option value="4">Third Floor</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Operating Hours</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                  <AuthInput
                    type="time"
                    value={formData.opening_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, opening_time: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                  <AuthInput
                    type="time"
                    value={formData.closing_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, closing_time: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operating Days</label>
                <div className="grid grid-cols-3 gap-2">
                  {daysOfWeek.map((day) => (
                    <CustomCheckbox
                      key={day}
                      checked={formData.operating_days.includes(day)}
                      onChange={() => handleDayToggle(day)}
                      label={day.slice(0, 3)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Stall"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {toast?.visible && (
        <Toast
          message={{ title: toast.message, description: toast.description }}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default StallRegistration;