import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cars } from "@/data/cars";
import CarCard from "./CarCard";

const FeaturedCars = () => {
  // Get 4 featured cars (newest imports)
  const featuredCars = cars.filter((car) => car.isNewImport).slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
          >
            View All Cars
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
