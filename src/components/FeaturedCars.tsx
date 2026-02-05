import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { api, Car } from "@/lib/api";
import CarCard from "./CarCard";

const FeaturedCars = () => {
  const { data: cars = [], isLoading } = useQuery<Car[]>({
    queryKey: ["/api/cars"],
    queryFn: () => api.getCars(),
  });

  const featuredCars = cars.filter((car) => car.featured).slice(0, 4);
  const displayCars = featuredCars.length > 0 ? featuredCars : cars.slice(0, 4);

  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (displayCars.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
              Featured Vehicles
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Latest Arrivals
            </h2>
          </div>
          <Link
            to="/cars"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
            data-testid="link-view-all-cars"
          >
            View All Cars
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
