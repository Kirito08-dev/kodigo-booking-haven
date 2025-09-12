import axios from 'axios';
import { authService } from './auth';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: 'https://api.grandhotelkodigo.com', // Mock base URL
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  image: string;
  amenities: string[];
  capacity: number;
  available: boolean;
}

// Mock API functions (replace with real API endpoints)
export const hotelApi = {
  getRooms: async (): Promise<Room[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: 1,
        name: "Suite Presidencial",
        type: "Suite",
        price: 850,
        description: "La experiencia más lujosa con vista panorámica de la ciudad, jacuzzi privado y servicio de mayordomo 24/7.",
        image: "/src/assets/room-suite.jpg",
        amenities: ["Jacuzzi privado", "Vista panorámica", "Mayordomo 24/7", "Minibar premium", "Wifi premium"],
        capacity: 4,
        available: true
      },
      {
        id: 2,
        name: "Habitación Deluxe",
        type: "Deluxe",
        price: 420,
        description: "Habitación espaciosa con diseño moderno, baño de mármol y todas las comodidades premium.",
        image: "/src/assets/room-deluxe.jpg",
        amenities: ["Baño de mármol", "Smart TV 65\"", "Minibar", "Aire acondicionado", "Wifi gratis"],
        capacity: 2,
        available: true
      },
      {
        id: 3,
        name: "Habitación Estándar",
        type: "Estándar",
        price: 280,
        description: "Habitación confortable con todas las amenidades necesarias para una estancia perfecta.",
        image: "/src/assets/room-standard.jpg",
        amenities: ["Smart TV 43\"", "Minibar", "Aire acondicionado", "Wifi gratis", "Caja fuerte"],
        capacity: 2,
        available: true
      }
    ];
  },

  getRoomById: async (id: number): Promise<Room | null> => {
    const rooms = await hotelApi.getRooms();
    return rooms.find(room => room.id === id) || null;
  }
};