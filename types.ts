
export enum AppTab {
  LANDING = 'landing',
  GALLERY = 'gallery',
  BOOKING = 'booking',
  ADMIN = 'admin'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string; // Added image property
  priceRange?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

export interface BookingPayload {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  message: string;
  aiInsights?: string;
  timestamp: string;
}
