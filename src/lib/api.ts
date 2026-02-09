const API_BASE = import.meta.env.VITE_API_URL || '/api';
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '');

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return API_ORIGIN ? `${API_ORIGIN}${path}` : path;
}

export interface Car {
  id: number;
  brand_id: number;
  brand_name: string;
  model: string;
  year: number;
  price: number;
  mileage: number | null;
  fuel_type: string | null;
  transmission: string | null;
  body_type: string | null;
  color: string | null;
  engine: string | null;
  description: string | null;
  featured: boolean;
  images: CarImage[];
  created_at: string;
}

export interface CarImage {
  id: number;
  car_id: number;
  filename: string;
  url: string;
  is_primary: boolean;
}

export interface Brand {
  id: number;
  name: string;
  car_count: number;
  created_at: string;
}

export interface Filters {
  brands: Brand[];
  body_types: string[];
  fuel_types: string[];
  transmissions: string[];
}

export interface Admin {
  id: number;
  username: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  private getHeaders(isFormData = false): HeadersInit {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  async login(username: string, password: string): Promise<{ token: string; admin: Admin }> {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
    } finally {
      this.clearToken();
    }
  }

  async verifyToken(): Promise<boolean> {
    if (!this.token) return false;
    
    try {
      const response = await fetch(`${API_BASE}/auth/verify`, {
        headers: this.getHeaders(),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async getFilters(): Promise<Filters> {
    const response = await fetch(`${API_BASE}/filters`);
    return response.json();
  }

  async getBrands(): Promise<Brand[]> {
    const response = await fetch(`${API_BASE}/brands`);
    return response.json();
  }

  async createBrand(name: string): Promise<Brand> {
    const response = await fetch(`${API_BASE}/brands`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create brand');
    }
    
    return response.json();
  }

  async getCars(params?: {
    brand_id?: number;
    body_type?: string;
    fuel_type?: string;
    transmission?: string;
    min_price?: number;
    max_price?: number;
    featured?: boolean;
  }): Promise<Car[]> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const url = `${API_BASE}/cars${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    const response = await fetch(url);
    return response.json();
  }

  async getCar(id: number): Promise<Car> {
    const response = await fetch(`${API_BASE}/cars/${id}`);
    if (!response.ok) {
      throw new Error('Car not found');
    }
    return response.json();
  }

  async createCar(formData: FormData): Promise<Car> {
    const response = await fetch(`${API_BASE}/cars`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create car');
    }
    
    return response.json();
  }

  async updateCar(id: number, formData: FormData): Promise<Car> {
    const response = await fetch(`${API_BASE}/cars/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update car');
    }
    
    return response.json();
  }

  async deleteCar(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/cars/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete car');
    }
  }

  async deleteCarImage(carId: number, imageId: number): Promise<void> {
    const response = await fetch(`${API_BASE}/cars/${carId}/images/${imageId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete image');
    }
  }
}

export const api = new ApiService();
