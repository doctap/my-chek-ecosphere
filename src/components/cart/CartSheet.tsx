
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Trash2, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartSheetProps {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onCheckout?: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ children, open, onClose, onCheckout }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalCarbonFootprint, clearCart } = useCart();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      // Simulate checkout process
      alert('Checkout functionality would be implemented here with payment processing!');
    }
  };

  // If used as a controlled component (with open/onClose props)
  if (open !== undefined && onClose) {
    return (
      <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping Cart ({items.length} items)
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-full">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add some eco-friendly products!</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-green-600 font-semibold">${item.price}</span>
                          <Badge variant="outline" className="text-xs">
                            <Leaf className="w-3 h-3 mr-1" />
                            {item.sustainabilityScore.toFixed(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-2 py-1 bg-white rounded text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Carbon Footprint:</span>
                    <span className="text-sm font-medium text-green-600">
                      {getTotalCarbonFootprint().toFixed(1)}kg CO₂
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-green-600">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button 
                      onClick={clearCart}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // If used as a trigger component (with children)
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({items.length} items)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400">Add some eco-friendly products!</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-green-600 font-semibold">${item.price}</span>
                        <Badge variant="outline" className="text-xs">
                          <Leaf className="w-3 h-3 mr-1" />
                          {item.sustainabilityScore.toFixed(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-2 py-1 bg-white rounded text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Carbon Footprint:</span>
                  <span className="text-sm font-medium text-green-600">
                    {getTotalCarbonFootprint().toFixed(1)}kg CO₂
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button 
                    onClick={clearCart}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
