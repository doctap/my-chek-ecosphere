
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  sustainabilityScore: number;
  carbonFootprint: number;
  resourceUsage: number;
  supplyChainEthics: number;
  packaging: number;
  longevity: number;
  category: string;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bamboo Fiber T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    sustainabilityScore: 4.8,
    carbonFootprint: 2.3,
    resourceUsage: 4.9,
    supplyChainEthics: 4.7,
    packaging: 4.8,
    longevity: 4.5,
    category: 'Clothing',
    description: 'Soft, breathable bamboo fiber t-shirt made from sustainable materials with minimal environmental impact.'
  },
  {
    id: '2',
    name: 'Solar Power Bank 20000mAh',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
    sustainabilityScore: 4.5,
    carbonFootprint: 8.5,
    resourceUsage: 4.2,
    supplyChainEthics: 4.8,
    packaging: 4.3,
    longevity: 4.9,
    category: 'Electronics',
    description: 'High-capacity solar power bank with renewable energy charging capability and durable construction.'
  },
  {
    id: '3',
    name: 'Organic Cotton Bedding Set',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
    sustainabilityScore: 4.6,
    carbonFootprint: 4.2,
    resourceUsage: 4.8,
    supplyChainEthics: 4.7,
    packaging: 4.1,
    longevity: 4.8,
    category: 'Home',
    description: 'Luxurious organic cotton bedding set, GOTS certified and ethically produced for better sleep and environment.'
  },
  {
    id: '4',
    name: 'Reusable Glass Water Bottle',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    sustainabilityScore: 4.7,
    carbonFootprint: 1.8,
    resourceUsage: 4.5,
    supplyChainEthics: 4.9,
    packaging: 4.8,
    longevity: 4.6,
    category: 'Lifestyle',
    description: 'Premium borosilicate glass water bottle with protective silicone sleeve, perfect for daily hydration.'
  },
  {
    id: '5',
    name: 'Biodegradable Phone Case',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
    sustainabilityScore: 4.4,
    carbonFootprint: 0.9,
    resourceUsage: 4.6,
    supplyChainEthics: 4.3,
    packaging: 4.7,
    longevity: 3.9,
    category: 'Electronics',
    description: 'Eco-friendly biodegradable phone case made from plant-based materials, fully compostable after use.'
  },
  {
    id: '6',
    name: 'Organic Quinoa 2kg',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
    sustainabilityScore: 4.3,
    carbonFootprint: 3.2,
    resourceUsage: 4.1,
    supplyChainEthics: 4.5,
    packaging: 4.0,
    longevity: 4.8,
    category: 'Food',
    description: 'Premium organic quinoa from sustainable farms, rich in protein and essential amino acids.'
  },
  {
    id: '7',
    name: 'LED Smart Bulb Set',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    sustainabilityScore: 4.1,
    carbonFootprint: 5.4,
    resourceUsage: 3.8,
    supplyChainEthics: 4.2,
    packaging: 3.9,
    longevity: 4.7,
    category: 'Electronics',
    description: 'Energy-efficient LED smart bulbs with app control, reducing energy consumption by up to 80%.'
  },
  {
    id: '8',
    name: 'Cork Yoga Mat',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    sustainabilityScore: 4.9,
    carbonFootprint: 2.1,
    resourceUsage: 4.9,
    supplyChainEthics: 4.8,
    packaging: 4.9,
    longevity: 4.7,
    category: 'Fitness',
    description: 'Natural cork yoga mat with excellent grip and antimicrobial properties, harvested sustainably.'
  }
];
