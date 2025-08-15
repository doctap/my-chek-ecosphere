
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Bell, Menu, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useGameification } from '@/contexts/GameContext';

interface HeaderProps {
  onSearchChange?: (searchTerm: string) => void;
  onShowAuth?: () => void;
  onShowCart?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, onShowAuth, onShowCart }) => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { userStats } = useGameification();
  const [searchTerm, setSearchTerm] = useState('');

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSignInClick = () => {
    console.log('Sign in clicked');
    if (onShowAuth) {
      onShowAuth();
    }
  };

  const handleCartClick = () => {
    console.log('Cart clicked');
    if (onShowCart) {
      onShowCart();
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoSphere AI</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sustainable products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Level {userStats.level}</div>
                  <div className="text-green-600">{userStats.points} points</div>
                </div>
              </div>
            )}
            
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" className="relative" onClick={handleCartClick}>
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSignInClick}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
