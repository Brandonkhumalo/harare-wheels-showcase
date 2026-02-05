import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Headphones } from "lucide-react";
import heroDealershipImg from "@/assets/images/hero-dealership.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(43_74%_49%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(43_74%_49%/0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
              Welcome to Exceed Auto
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Drive Your Dreams
              <span className="block text-gradient-gold">Home Today</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Zimbabwe's premier destination for quality pre-owned vehicles. 
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

            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Shield, label: "Quality Assured", value: "100%" },
                { icon: Award, label: "Years Experience", value: "15+" },
                { icon: Headphones, label: "Support", value: "24/7" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl" />
              <img
                src={heroDealershipImg}
                alt="Exceed Auto Dealership"
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-xl z-20">
                <p className="text-3xl font-bold text-gradient-gold">500+</p>
                <p className="text-sm text-muted-foreground">Vehicles Sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
