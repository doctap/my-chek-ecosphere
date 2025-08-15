
import React, { useState } from 'react';
import { Search, Filter, Star, TrendingUp, Award, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/products/ProductCard';
import CartSheet from '@/components/cart/CartSheet';
import GameDashboard from '@/components/gamification/Dashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import EcoChatbot from '@/components/chatbot/EcoChatbot';
import AuthModal from '@/components/auth/AuthModal';
import PaymentFlow from '@/components/payment/PaymentFlow';
import { mockProducts } from '@/data/mockProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('sustainability');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartSheet, setShowCartSheet] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  
  const { user } = useAuth();
  const { items } = useCart();

  const categories = ['all', 'clothing', 'electronics', 'home', 'lifestyle', 'food', 'fitness'];

  // Check if user is admin
  const isAdmin = user?.email === 'admin@ecosphere.com';

  const handleSearchFromHeader = (searchValue: string) => {
    console.log('Search from header:', searchValue);
    setSearchTerm(searchValue);
  };

  const handleShowAuth = () => {
    console.log('Show auth modal');
    setShowAuthModal(true);
  };

  const handleShowCart = () => {
    console.log('Show cart sheet');
    setShowCartSheet(true);
  };

  const handleShowPayment = () => {
    setShowCartSheet(false);
    setShowPaymentFlow(true);
  };

  const filteredProducts = mockProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'sustainability':
          return b.sustainabilityScore - a.sustainabilityScore;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'carbon':
          return a.carbonFootprint - b.carbonFootprint;
        default:
          return 0;
      }
    });

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearchChange={handleSearchFromHeader}
        onShowAuth={handleShowAuth}
        onShowCart={handleShowCart}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shop Sustainably with <span className="text-green-200">EcoSphere AI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Discover eco-friendly products with AI-powered sustainability ratings
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <Star className="w-5 h-5" />
              <span>5-Star Rating System</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <Award className="w-5 h-5" />
              <span>Gamified Experience</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <TrendingUp className="w-5 h-5" />
              <span>AI Recommendations</span>
            </div>
          </div>
          {!user && (
            <Button 
              onClick={() => setShowAuthModal(true)}
              size="lg" 
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
            >
              Get Started Today
            </Button>
          )}
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
            </button>
            {user && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'admin'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <>
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sustainability">Sustainability Score</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="carbon">Carbon Footprint</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={() => setShowCartSheet(true)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Cart ({cartItemCount})
                </Button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onShowAuth={handleShowAuth}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'dashboard' && <GameDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Chatbot */}
      <EcoChatbot />

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Cart Sheet */}
      <CartSheet 
        open={showCartSheet} 
        onClose={() => setShowCartSheet(false)}
        onCheckout={handleShowPayment}
      />

      {/* Payment Flow */}
      <PaymentFlow 
        open={showPaymentFlow} 
        onClose={() => setShowPaymentFlow(false)} 
      />
    </div>
  );
};

export default Index;
