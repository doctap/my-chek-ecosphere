
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Leaf, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useGameification } from '@/contexts/GameContext';
import { toast } from '@/hooks/use-toast';

interface PaymentFlowProps {
  open: boolean;
  onClose: () => void;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({ open, onClose }) => {
  const [paymentStep, setPaymentStep] = useState<'bill' | 'processing' | 'success'>('bill');
  const { items, getTotalPrice, getTotalCarbonFootprint, clearCart } = useCart();
  const { user } = useAuth();
  const { addPoints } = useGameification();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;
  const carbonFootprint = getTotalCarbonFootprint();

  const handlePayment = () => {
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      
      // Award points for eco-friendly purchase
      const ecoPoints = Math.floor(subtotal / 10);
      addPoints(ecoPoints, `Completed eco-friendly purchase! Earned ${ecoPoints} points`);
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
      }, 2000);
      
      toast({
        title: "Payment Successful!",
        description: `Your order has been placed successfully. You earned ${ecoPoints} eco-points!`,
      });
    }, 2000);
  };

  const handleClose = () => {
    setPaymentStep('bill');
    onClose();
  };

  const renderBill = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-800">Environmental Impact</span>
        </div>
        <p className="text-sm text-green-700">
          Total Carbon Footprint: {carbonFootprint.toFixed(2)}kg CO₂
        </p>
        <p className="text-xs text-green-600 mt-1">
          You'll earn {Math.floor(subtotal / 10)} eco-points with this purchase!
        </p>
      </div>

      <Button 
        onClick={handlePayment}
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Pay ${total.toFixed(2)}
      </Button>
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center space-y-4 py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <h3 className="text-lg font-semibold">Processing Payment...</h3>
      <p className="text-gray-600">Please wait while we process your payment securely.</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-4 py-8">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
      <h3 className="text-2xl font-bold text-green-600">Payment Successful!</h3>
      <div className="space-y-2">
        <p className="text-gray-600">Your order has been placed successfully.</p>
        <p className="font-medium">Order Total: ${total.toFixed(2)}</p>
        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Eco Impact</span>
          </div>
          <p className="text-sm text-green-700">
            You earned {Math.floor(subtotal / 10)} eco-points!
          </p>
          <p className="text-xs text-green-600">
            Thanks for choosing sustainable products!
          </p>
        </div>
      </div>
      <Button 
        onClick={handleClose}
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
      >
        Continue Shopping
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {paymentStep === 'bill' && (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Checkout</span>
              </>
            )}
            {paymentStep === 'processing' && (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Processing Payment</span>
              </>
            )}
            {paymentStep === 'success' && (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Order Complete</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {paymentStep === 'bill' && renderBill()}
        {paymentStep === 'processing' && renderProcessing()}
        {paymentStep === 'success' && renderSuccess()}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentFlow;
