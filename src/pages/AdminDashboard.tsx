import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, Car, Brand, getImageUrl } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, LogOut, Car as CarIcon, Image, X } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    brand_id: "",
    brand_name: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    mileage: "",
    fuel_type: "",
    transmission: "",
    body_type: "",
    color: "",
    engine: "",
    description: "",
    featured: false,
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [useExistingBrand, setUseExistingBrand] = useState(true);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const isValid = await api.verifyToken();
    if (!isValid) {
      navigate("/admin");
    }
  };

  const loadData = async () => {
    try {
      const [carsData, brandsData] = await Promise.all([
        api.getCars(),
        api.getBrands(),
      ]);
      setCars(carsData);
      setBrands(brandsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    navigate("/admin");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (newFiles.length > 8) {
        toast({
          title: "Too many images",
          description: "Maximum 8 images allowed per vehicle",
          variant: "destructive",
        });
        return;
      }
      setSelectedImages(newFiles);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      
      if (useExistingBrand && formData.brand_id) {
        data.append("brand_id", formData.brand_id);
      } else if (!useExistingBrand && formData.brand_name) {
        data.append("brand_name", formData.brand_name);
      } else {
        throw new Error("Please select or enter a brand");
      }

      data.append("model", formData.model);
      data.append("year", String(formData.year));
      data.append("price", formData.price);
      if (formData.mileage) data.append("mileage", formData.mileage);
      if (formData.fuel_type) data.append("fuel_type", formData.fuel_type);
      if (formData.transmission) data.append("transmission", formData.transmission);
      if (formData.body_type) data.append("body_type", formData.body_type);
      if (formData.color) data.append("color", formData.color);
      if (formData.engine) data.append("engine", formData.engine);
      if (formData.description) data.append("description", formData.description);
      data.append("featured", String(formData.featured));

      selectedImages.forEach((image) => {
        data.append("images", image);
      });

      await api.createCar(data);
      
      toast({
        title: "Success",
        description: "Car added successfully",
      });

      setFormData({
        brand_id: "",
        brand_name: "",
        model: "",
        year: new Date().getFullYear(),
        price: "",
        mileage: "",
        fuel_type: "",
        transmission: "",
        body_type: "",
        color: "",
        engine: "",
        description: "",
        featured: false,
      });
      setSelectedImages([]);
      setShowAddForm(false);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add car",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (carId: number) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      await api.deleteCar(carId);
      toast({
        title: "Success",
        description: "Car deleted successfully",
      });
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete car",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <CarIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-serif font-bold text-foreground">
              Exceed <span className="text-primary">Auto</span> Admin
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">
              {cars.length} vehicles | {brands.length} brands
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-gold flex items-center gap-2"
            data-testid="button-add-car"
          >
            <Plus className="w-5 h-5" />
            Add New Car
          </button>
        </div>

        {showAddForm && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Add New Vehicle</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useExistingBrand}
                    onChange={() => setUseExistingBrand(true)}
                    className="text-primary"
                  />
                  <span className="text-foreground">Select Existing Brand</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useExistingBrand}
                    onChange={() => setUseExistingBrand(false)}
                    className="text-primary"
                  />
                  <span className="text-foreground">Create New Brand</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {useExistingBrand ? (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Brand *</label>
                    <select
                      value={formData.brand_id}
                      onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      data-testid="select-brand"
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name} ({brand.car_count} cars)
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">New Brand Name *</label>
                    <input
                      type="text"
                      value={formData.brand_name}
                      onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g. BMW"
                      required={!useExistingBrand}
                      data-testid="input-brand-name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 3 Series"
                    required
                    data-testid="input-model"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Year *</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    required
                    data-testid="input-year"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 35000"
                    min="0"
                    required
                    data-testid="input-price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 25000"
                    min="0"
                    data-testid="input-mileage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Fuel Type</label>
                  <select
                    value={formData.fuel_type}
                    onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="select-fuel-type"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Transmission</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="select-transmission"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Body Type</label>
                  <select
                    value={formData.body_type}
                    onChange={(e) => setFormData({ ...formData, body_type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="select-body-type"
                  >
                    <option value="">Select Body Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Wagon">Wagon</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Pearl White"
                    data-testid="input-color"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Engine</label>
                  <input
                    type="text"
                    value={formData.engine}
                    onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 2.0L Turbo"
                    data-testid="input-engine"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    data-testid="checkbox-featured"
                  />
                  <label htmlFor="featured" className="text-sm text-foreground">Featured Vehicle</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter vehicle description..."
                  data-testid="textarea-description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Vehicle Images (max 8)
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer"
                  data-testid="input-images"
                />
                
                {selectedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold px-6 py-2 disabled:opacity-50"
                  data-testid="button-submit-car"
                >
                  {isSubmitting ? "Adding..." : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Type</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cars.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      No vehicles in inventory. Add your first car above.
                    </td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr key={car.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        {car.images.length > 0 ? (
                          <img
                            src={getImageUrl(car.images[0].url)}
                            alt={`${car.brand_name} ${car.model}`}
                            className="w-16 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                            <CarIcon className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{car.brand_name} {car.model}</p>
                        <p className="text-sm text-muted-foreground">{car.color}</p>
                      </td>
                      <td className="px-6 py-4 text-foreground">{car.year}</td>
                      <td className="px-6 py-4 text-primary font-medium">
                        ${car.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-foreground">{car.body_type || "-"}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          data-testid={`button-delete-car-${car.id}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
