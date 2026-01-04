
import { Service, GalleryImage } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Memorial Reception Catering',
    description: 'Dignified, high-quality menus designed for comfort and elegance during life celebrations and funeral gatherings.',
    icon: '🕊️',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's2',
    title: 'Artisanal Canapés',
    description: 'Bespoke hand-crafted appetizers using locally sourced organic ingredients for refined social events.',
    icon: '🍽️',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's3',
    title: 'Sommelier & Bar Service',
    description: 'Professional beverage management and curated wine pairings to complement your custom menu.',
    icon: '🍷',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's4',
    title: 'Full-Service Event Planning',
    description: 'Comprehensive logistics management, from venue selection to table scape design and floral coordination.',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800', title: 'Grand Buffet Display' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&q=80&w=800', title: 'Artisanal Hors d\'oeuvres' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', title: 'Elegant Plated Dinner' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800', title: 'Gold Theme Event Design' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800', title: 'Professional Service Staff' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800', title: 'Dignified Memorial Setting' }
];
