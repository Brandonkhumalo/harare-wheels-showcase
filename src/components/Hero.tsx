import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Headphones } from "lucide-react";
import heroLandingImg from "@/assets/images/hero-landing.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroLandingImg}
          alt="Exceed Auto Dealership - Toyota Land Cruiser"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="animate-fade-up">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
              Welcome to Exceed Auto
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Drive Your Dreams
              <span className="block text-gradient-gold">Home Today</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mb-8 leading-relaxed">
              Zimbabwe's premier destination for quality new and pre-owned vehicles. 
              Experience luxury, reliability, and exceptional service at Harare's 
              most trusted dealership.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/cars" className="btn-gold inline-flex items-center justify-center gap-2" data-testid="button-browse-collection">
                Browse Our Collection
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-outline-gold inline-flex items-center justify-center" data-testid="button-contact-us">
                Contact Us
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {[
                { icon: Shield, label: "Quality Assured", value: "100%" },
                { icon: Award, label: "Years Experience", value: "15+" },
                { icon: Headphones, label: "Support", value: "24/7" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-2-2.7-3H9c-1.4 0-2.7.6-3.5 1.5L4 10H2c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h1" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400">Vehicles Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
