import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, Car, Target } from "lucide-react";

const stats = [
  { icon: Car, value: "500+", label: "Vehicles Sold" },
  { icon: Users, value: "450+", label: "Happy Customers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Target, value: "100%", label: "Satisfaction Rate" },
];

const team = [
  {
    name: "Tendai Moyo",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Grace Chirisa",
    role: "Sales Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Farai Mutasa",
    role: "Service Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 bg-charcoal-light">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Driving Excellence in Zimbabwe
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Since 2009, Exceed Auto has been Harare's trusted destination for 
            quality pre-owned vehicles. Our commitment to excellence and customer 
            satisfaction sets us apart.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-3xl font-bold text-gradient-gold mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                A Legacy of Trust & Quality
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Exceed Auto was founded with a simple vision: to provide Zimbabweans 
                  with access to high-quality vehicles at competitive prices, backed by 
                  unparalleled customer service.
                </p>
                <p>
                  Over the past 15 years, we've grown from a small showroom to one of 
                  Harare's most respected dealerships. Our success is built on the 
                  foundation of honest dealings, transparent pricing, and genuine care 
                  for our customers.
                </p>
                <p>
                  We source our vehicles directly from Japan, the United Kingdom, and 
                  South Africa, ensuring each car meets our stringent quality standards 
                  before it reaches our showroom floor.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1562141961-b5d1c8d834d9?w=800&h=600&fit=crop"
                alt="Car Showroom"
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">Est. 2009</p>
                <p className="text-sm">Serving Zimbabwe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
              Our Values
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                description: "We believe in honest, transparent dealings with every customer. No hidden fees, no surprises.",
              },
              {
                title: "Quality",
                description: "Every vehicle is thoroughly inspected and prepared to meet the highest standards before sale.",
              },
              {
                title: "Service",
                description: "Our relationship with customers extends well beyond the sale. We're here for the long drive.",
              },
            ].map((value) => (
              <div key={value.title} className="p-8 rounded-xl bg-card border border-border text-center">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Meet the Experts
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
