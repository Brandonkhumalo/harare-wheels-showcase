import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cars } from "@/data/cars";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Users,
  Palette,
  Phone,
  MessageCircle,
  Check,
  ChevronRight,
} from "lucide-react";
import CarCard from "@/components/CarCard";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
            Vehicle Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The vehicle you're looking for doesn't exist or has been sold.
          </p>
          <Link to="/cars" className="btn-gold">
            Browse Available Cars
          </Link>
        </div>
      </div>
    );
  }

  // Get similar cars (same design, different car)
  const similarCars = cars
    .filter((c) => c.design === car.design && c.id !== car.id)
    .slice(0, 4);

  const specs = [
    { icon: Calendar, label: "Year", value: car.year.toString() },
    { icon: Gauge, label: "Mileage", value: `${car.mileage.toLocaleString()} km` },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Users, label: "Seats", value: car.seats.toString() },
    { icon: Palette, label: "Color", value: car.color },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-4 bg-charcoal-light">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/cars" className="text-muted-foreground hover:text-foreground transition-colors">
              Cars
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{car.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="bg-charcoal-light pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Results
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-charcoal-light">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop`;
                  }}
                />
                {car.isNewImport && (
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full">
                    New Import
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
                  {car.brand}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                  {car.name}
                </h1>
                <p className="text-lg text-muted-foreground">{car.model}</p>
              </div>

              <div className="mb-8">
                <p className="text-4xl font-bold text-gradient-gold">
                  ${car.price.toLocaleString()}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-4 rounded-lg bg-card border border-border"
                  >
                    <spec.icon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                    <p className="font-semibold text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Engine */}
              <div className="mb-8 p-6 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">Engine</h3>
                <p className="text-muted-foreground">{car.engine}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/contact" className="btn-gold flex-1 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Link>
                <a
                  href={`https://wa.me/263771234567?text=Hi, I'm interested in the ${car.year} ${car.name} (${car.model}) listed at $${car.price.toLocaleString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold flex-1 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-border">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Features
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {car.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Cars */}
      {similarCars.length > 0 && (
        <section className="section-padding bg-charcoal-light">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">
                Similar Vehicles
              </h2>
              <Link
                to="/cars"
                className="text-primary font-medium hover:underline"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CarDetail;
