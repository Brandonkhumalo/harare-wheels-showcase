import { Link } from "react-router-dom";
import { Car as CarIcon, Calendar, Gauge, Fuel, Settings2 } from "lucide-react";
import { Car } from "@/lib/api";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const primaryImage = car.images.find((img) => img.is_primary) || car.images[0];
  const imageUrl = primaryImage?.url;

  return (
    <Link to={`/cars/${car.id}`} className="block" data-testid={`card-car-${car.id}`}>
      <div className="card-luxury group cursor-pointer">
        <div className="relative h-56 overflow-hidden bg-charcoal-lighter">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${car.brand_name} ${car.model}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <CarIcon className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
          {car.featured && (
            <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-primary text-sm font-medium mb-1">{car.brand_name}</p>
              <h3 className="text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                {car.model}
              </h3>
            </div>
            {car.body_type && (
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                {car.body_type}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm">{car.year}</span>
            </div>
            {car.mileage && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="text-sm">{car.mileage.toLocaleString()} km</span>
              </div>
            )}
            {car.fuel_type && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Fuel className="w-4 h-4 text-primary" />
                <span className="text-sm">{car.fuel_type}</span>
              </div>
            )}
            {car.transmission && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Settings2 className="w-4 h-4 text-primary" />
                <span className="text-sm">{car.transmission}</span>
              </div>
            )}
          </div>

          {car.color && (
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-3 h-3 rounded-full border border-muted-foreground"
                style={{
                  backgroundColor: car.color.toLowerCase().includes('white')
                    ? '#fff'
                    : car.color.toLowerCase().includes('black')
                    ? '#000'
                    : car.color.toLowerCase().includes('red')
                    ? '#dc2626'
                    : car.color.toLowerCase().includes('blue')
                    ? '#2563eb'
                    : car.color.toLowerCase().includes('silver')
                    ? '#9ca3af'
                    : car.color.toLowerCase().includes('grey') || car.color.toLowerCase().includes('gray')
                    ? '#6b7280'
                    : '#d4af37',
                }}
              />
              <span className="text-sm text-muted-foreground">{car.color}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-2xl font-bold text-gradient-gold">
              ${car.price.toLocaleString()}
            </p>
            <span className="text-sm text-primary font-medium group-hover:underline">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
