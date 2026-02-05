import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, Car } from "@/lib/api";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  Phone,
  MessageCircle,
  ChevronRight,
  Loader2,
  Car as CarIcon,
} from "lucide-react";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: ["/api/cars", id],
    queryFn: () => api.getCar(parseInt(id || "0")),
    enabled: !!id,
  });

  const { data: allCars = [] } = useQuery<Car[]>({
    queryKey: ["/api/cars"],
    queryFn: () => api.getCars(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
            Vehicle Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The vehicle you're looking for doesn't exist or has been sold.
          </p>
          <Link to="/cars" className="btn-gold" data-testid="link-browse-cars">
            Browse Available Cars
          </Link>
        </div>
      </div>
    );
  }

  const similarCars = allCars
    .filter((c) => c.body_type === car.body_type && c.id !== car.id)
    .slice(0, 4);

  const primaryImage = car.images.find((img) => img.is_primary) || car.images[0];

  const specs = [
    { icon: Calendar, label: "Year", value: car.year.toString() },
    car.mileage ? { icon: Gauge, label: "Mileage", value: `${car.mileage.toLocaleString()} km` } : null,
    car.fuel_type ? { icon: Fuel, label: "Fuel Type", value: car.fuel_type } : null,
    car.transmission ? { icon: Settings2, label: "Transmission", value: car.transmission } : null,
    car.color ? { icon: Palette, label: "Color", value: car.color } : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
            <span className="text-foreground">{car.brand_name} {car.model}</span>
          </div>
        </div>
      </div>

      <div className="bg-charcoal-light pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Results
          </button>
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-charcoal-light">
                {primaryImage ? (
                  <img
                    src={primaryImage.url}
                    alt={`${car.brand_name} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CarIcon className="w-24 h-24 text-muted-foreground" />
                  </div>
                )}
                {car.featured && (
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.map((image) => (
                    <div key={image.id} className="aspect-[4/3] rounded-lg overflow-hidden bg-charcoal-light">
                      <img
                        src={image.url}
                        alt={`${car.brand_name} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-6">
                <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">
                  {car.brand_name}
                </p>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                  {car.model}
                </h1>
                <p className="text-lg text-muted-foreground">{car.year}</p>
              </div>

              <div className="mb-8">
                <p className="text-4xl font-bold text-gradient-gold">
                  ${car.price.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {specs.map((spec) => spec && (
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

              {car.engine && (
                <div className="mb-8 p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Engine</h3>
                  <p className="text-muted-foreground">{car.engine}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/contact" className="btn-gold flex-1 flex items-center justify-center gap-2" data-testid="button-contact">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Link>
                <a
                  href={`https://wa.me/263771234567?text=Hi, I'm interested in the ${car.year} ${car.brand_name} ${car.model} listed at $${car.price.toLocaleString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold flex-1 flex items-center justify-center gap-2"
                  data-testid="button-whatsapp"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {car.description && (
            <div className="mt-12 pt-12 border-t border-border">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {car.description}
              </p>
            </div>
          )}
        </div>
      </section>

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
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCars.map((similarCar) => (
                <Link
                  key={similarCar.id}
                  to={`/cars/${similarCar.id}`}
                  className="block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                  data-testid={`link-similar-car-${similarCar.id}`}
                >
                  <div className="aspect-[4/3] bg-muted">
                    {similarCar.images[0] ? (
                      <img
                        src={similarCar.images[0].url}
                        alt={`${similarCar.brand_name} ${similarCar.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CarIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-primary">{similarCar.brand_name}</p>
                    <h3 className="font-semibold text-foreground">{similarCar.model}</h3>
                    <p className="text-lg font-bold text-gradient-gold mt-2">
                      ${similarCar.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
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
