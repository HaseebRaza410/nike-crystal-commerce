import { Product } from '@/store/cartStore';

import shoeAirmax1 from '@/assets/shoe-airmax-1.png';
import shoeAirforce1 from '@/assets/shoe-airforce-1.png';
import shoeBasketball1 from '@/assets/shoe-basketball-1.png';
import shoeTraining1 from '@/assets/shoe-training-1.png';
import shoeRetro1 from '@/assets/shoe-retro-1.png';
import shoeRunning2 from '@/assets/shoe-running-2.png';
import shoeLifestyle2 from '@/assets/shoe-lifestyle-2.png';

export const products: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max Pulse',
    price: 189,
    image: shoeAirmax1,
    category: 'Running',
    colors: ['#ffffff', '#000000', '#00B2FF'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'The Air Max Pulse pulls inspiration from the London music scene, bringing an energetic touch to the iconic Air Max line.',
  },
  {
    id: '2',
    name: 'Nike Air Force 1 \'07',
    price: 149,
    image: shoeAirforce1,
    category: 'Lifestyle',
    colors: ['#ffffff', '#000000', '#FF006E'],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'The radiance lives on in the Nike Air Force 1 \'07, a clean, modern look that\'s icon-approved.',
  },
  {
    id: '3',
    name: 'Nike Precision 7',
    price: 129,
    image: shoeBasketball1,
    category: 'Basketball',
    colors: ['#000000', '#FF0000', '#ffffff'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    description: 'Built for the hardwood, designed for dominance. The Precision 7 delivers court-ready performance.',
  },
  {
    id: '4',
    name: 'Nike Air Zoom Pegasus',
    price: 159,
    image: shoeTraining1,
    category: 'Running',
    colors: ['#ffffff', '#00B2FF', '#00FFC4'],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    description: 'A springy ride for any run, the Pegasus keeps the speed coming with responsive cushioning.',
  },
  {
    id: '5',
    name: 'Nike Court Legacy',
    price: 109,
    image: shoeRetro1,
    category: 'Lifestyle',
    colors: ['#F5F5DC', '#8B0000', '#000000'],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Classic tennis heritage meets modern comfort. Timeless style for the streets.',
  },
  {
    id: '6',
    name: 'Nike Free Run 5.0',
    price: 139,
    image: shoeRunning2,
    category: 'Running',
    colors: ['#808080', '#32CD32', '#ffffff'],
    sizes: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    description: 'Feel the freedom of natural motion with flexible support and lightweight cushioning.',
  },
  {
    id: '7',
    name: 'Nike Blazer Low',
    price: 119,
    image: shoeLifestyle2,
    category: 'Lifestyle',
    colors: ['#000080', '#ffffff', '#D2691E'],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'Vintage basketball style modernized with a low-cut silhouette and premium materials.',
  },
  {
    id: '8',
    name: 'Nike Metcon 9',
    price: 179,
    image: shoeTraining1,
    category: 'Training',
    colors: ['#ffffff', '#00B2FF', '#000000'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    description: 'From box jumps to burpees, the Metcon 9 is built to handle whatever your workout demands.',
  },
];

export const categories = ['All', 'Running', 'Basketball', 'Lifestyle', 'Training'];
