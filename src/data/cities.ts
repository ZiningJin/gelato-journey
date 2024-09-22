import { City } from '@/types/City';

export const cities: City[] = [
  { 
    name: 'Paris', 
    coordinates: [48.8566, 2.3522], 
    visited: true, 
    date: '2019-02-26', 
    photos: [
      '/images/paris_1.jpg',
      '/images/paris_2.jpg'
    ]
  },
  { 
    name: 'Firenze', 
    coordinates: [43.7700, 11.2577], 
    visited: true, 
    date: '2019-12-30', 
    photos: [
      '/images/firenze_1.jpg'
    ]
  },
  { 
    name: 'Barcelona', 
    coordinates: [41.3851, 2.1734], 
    visited: true, 
    date: '2024-06-11', 
    photos: [
      '/images/barcelona_1.jpg',
      '/images/barcelona_2.jpg',
      '/images/barcelona_3.jpg'
    ]
  },
  { 
    name: 'Antwerp', 
    coordinates: [51.2213, 4.4051], 
    visited: true, 
    date: '2024-02-19', 
    photos: [
      '/images/antwerp_1.jpg',
      '/images/antwerp_2.jpg',
      '/images/antwerp_3.jpg'
    ]
  },
  { 
    name: 'Amsterdam', 
    coordinates: [52.3676, 4.9041], 
    visited: true, 
    date: '2024-08-30', 
    photos: [
      '/images/amsterdam_1.jpg',
      '/images/amsterdam_2.jpg'
    ]
  },
  {
    name: 'Prague',
    coordinates: [50.0755, 14.4378],
    visited: true,
    date: '2015-07-04',
    photos: [
        '/images/prage_1.jpg'
    ]
  },
  {
    name: 'Zurich',
    coordinates: [47.3769, 8.5417],
    visited: true,
    date: '2019-12-25',
    photos: [
        '/images/zurich_1.jpg'
    ]
  },
  {
    name: 'San Francisco',
    coordinates: [37.7749, -122.4194],
    visited: true,
    date: '2017-08-20',
    photos: [
        '/images/sanfrancisco_1.jpg',
        'images/sanfrancisco_2.jpg'
    ]
  },
  { 
    name: 'New York', 
    coordinates: [40.7128, -74.0060], 
    visited: true, 
    date: '2017-08-30', 
    photos: [
      '/images/newyork_1.jpg'
    ]
  },
  { name: 'London', coordinates: [51.5074, -0.1278], visited: false },
  { name: 'Berlin', coordinates: [52.5200, 13.4050], visited: false },
  { name: 'Dubai', coordinates: [25.2048, 55.2708], visited: false },
  { name: 'Rio de Janeiro', coordinates: [-22.9068, -43.1729], visited: false},
  { name: 'Lisbon', coordinates: [38.7223, -9.1393], visited: false},
  { name: 'Rabat', coordinates: [34.0209, -6.8416], visited: false},
  { name: 'Mexico City', coordinates: [19.4326, -99.1332], visited: false},
  { name: 'Cairo', coordinates: [30.0444, 31.2357], visited: false}
];