import Header from "$/components/Header";
import Hero from "$/components/Hero";
import UserTypeSection from "$/components/UserTypeSection";
import Features from "$/components/Feature";
import HowItWorks from "$/components/HowItWorks";
import Footer from "$/components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <UserTypeSection />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}