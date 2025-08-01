import { useState } from "react";
import { useRouter } from "next/router";
import Button from "$/components/Button";
import AuthCard from "$/components/auth/AuthCard";
import AuthTabs from "$/components/auth/AuthTabs";
import AuthInput from "$/components/auth/AuthInput";
import { supabase } from "$/integrations/supabase/client";

const StudentAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    studentId: "",
    year: "",
    department: ""
  });
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/StudentPortal`,
          data: {
            name: formData.name,
            student_id: formData.studentId,
            year: formData.year,
            department: formData.department
          }
        }
      });

      if (authError) throw authError;

      alert("Account created successfully! Please check your email to verify your account.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      router.push("/StudentPortal");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <AuthCard 
        title="Student Portal" 
        description="Sign in to order from canteen stalls"
      >
        <div className="flex justify-center"> {/* Center the tabs container */}
          <AuthTabs
            tabs={[
              {
                value: "signin",
                label: "Sign In",
                active: activeTab === "signin",
                onClick: () => setActiveTab("signin")
              },
              {
                value: "signup",
                label: "Sign Up",
                active: activeTab === "signup",
                onClick: () => setActiveTab("signup")
              }
            ]}
          />
        </div>
        
        {activeTab === "signin" ? (
          <form onSubmit={handleSignIn} className="space-y-4 mt-6"> {/* Added margin-top */}
            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <AuthInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button 
              type="submit" 
              variant="primary"
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4 mt-6"> {/* Added margin-top */}
            <AuthInput
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <AuthInput
              label="Student ID"
              type="text"
              placeholder="Enter your student ID"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <AuthInput
                label="Year"
                type="number"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                required
              />
              <AuthInput
                label="Department"
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>
            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <AuthInput
              label="Password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button 
              type="submit" 
              variant="primary"
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        )}
      </AuthCard>
    </div>
  );
};

export default StudentAuth;