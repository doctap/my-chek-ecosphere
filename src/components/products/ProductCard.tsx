import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Leaf, Truck, Shield, Package, Clock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useGameification } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Product {
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

interface ProductCardProps {
  product: Product;
  onShowAuth?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowAuth }) => {
  const { addToCart } = useCart();
  const { addPoints } = useGameification();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add products to your cart.",
        variant: "destructive",
      });
      if (onShowAuth) {
        onShowAuth();
      }
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sustainabilityScore: product.sustainabilityScore,
      carbonFootprint: product.carbonFootprint,
    });
    
    // Award points for sustainable shopping
    if (product.sustainabilityScore >= 4) {
      addPoints(10, 'Added eco-friendly product to cart!');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 4.5) return 'text-green-700 bg-green-100';
    if (score >= 3.5) return 'text-green-600 bg-green-50';
    if (score >= 2.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getSustainabilityLabel = (score: number) => {
    if (score >= 4.5) return 'Excellent';
    if (score >= 3.5) return 'Good';
    if (score >= 2.5) return 'Fair';
    return 'Poor';
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getSustainabilityColor(product.sustainabilityScore)} font-medium`}>
            {getSustainabilityLabel(product.sustainabilityScore)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <span className="text-xl font-bold text-green-600">${product.price}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        {/* Sustainability Rating */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Sustainability Score</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(product.sustainabilityScore)}
            <span className="text-sm text-gray-600 ml-1">
              ({product.sustainabilityScore.toFixed(1)})
            </span>
          </div>
        </div>
        
        {/* Detailed Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-blue-500" />
            <span>Carbon: {product.carbonFootprint}kg</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-purple-500" />
            <span>Ethics: {product.supplyChainEthics}/5</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="w-3 h-3 text-orange-500" />
            <span>Packaging: {product.packaging}/5</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-red-500" />
            <span>Longevity: {product.longevity}/5</span>
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {user ? 'Add to Cart' : 'Login to Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
