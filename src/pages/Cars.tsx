import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { api, Car, Filters } from "@/lib/api";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";

const CARS_PER_PAGE = 10;

type SortOption = "newest" | "oldest" | "price-low" | "price-high";

const Cars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { data: filtersData, isLoading: filtersLoading } = useQuery<Filters>({
    queryKey: ["/api/filters"],
    queryFn: () => api.getFilters(),
  });

  const { data: carsData = [], isLoading: carsLoading } = useQuery<Car[]>({
    queryKey: ["/api/cars"],
    queryFn: () => api.getCars(),
  });

  const filteredCars = useMemo(() => {
    let result = [...carsData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.brand_name.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query)
      );
    }

    if (selectedBrand) {
      result = result.filter((car) => car.brand_id === parseInt(selectedBrand));
    }

    if (selectedBodyType) {
      result = result.filter((car) => car.body_type === selectedBodyType);
    }

    if (selectedFuelType) {
      result = result.filter((car) => car.fuel_type === selectedFuelType);
    }

    if (selectedTransmission) {
      result = result.filter((car) => car.transmission === selectedTransmission);
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [carsData, searchQuery, selectedBrand, selectedBodyType, selectedFuelType, selectedTransmission, sortBy]);

  const totalPages = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * CARS_PER_PAGE,
    currentPage * CARS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("");
    setSelectedBodyType("");
    setSelectedFuelType("");
    setSelectedTransmission("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedBrand || selectedBodyType || selectedFuelType || selectedTransmission;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBrand, selectedBodyType, selectedFuelType, selectedTransmission, sortBy]);

  const isLoading = filtersLoading || carsLoading;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-12 px-4 bg-charcoal-light">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">
            Our Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Browse Our Vehicles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of quality vehicles. 
            Use the filters below to find your perfect match.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-background border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand or model..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="input-search"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-foreground hover:bg-muted transition-colors"
              data-testid="button-toggle-filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-fade-up">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="select-brand-filter"
              >
                <option value="">All Brands</option>
                {filtersData?.brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedBodyType}
                onChange={(e) => setSelectedBodyType(e.target.value)}
                className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="select-body-type-filter"
              >
                <option value="">All Body Types</option>
                {filtersData?.body_types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
                className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="select-fuel-type-filter"
              >
                <option value="">All Fuel Types</option>
                {filtersData?.fuel_types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="select-transmission-filter"
              >
                <option value="">All Transmissions</option>
                {filtersData?.transmissions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="select-sort"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors col-span-2 md:col-span-1"
                  data-testid="button-clear-filters"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {paginatedCars.length} of {filteredCars.length} vehicles
            </span>
            {totalPages > 1 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : paginatedCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {paginatedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-prev-page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-muted"
                          }`}
                          data-testid={`button-page-${page}`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-next-page"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-serif text-foreground mb-4">No vehicles found</p>
              <p className="text-muted-foreground mb-8">
                {carsData.length === 0
                  ? "No vehicles in inventory yet. Check back soon!"
                  : "Try adjusting your filters or search query"}
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-gold" data-testid="button-clear-all">
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cars;
