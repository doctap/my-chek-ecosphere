
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, ShoppingCart, TrendingUp, Package, Eye, Edit, Trash2, Plus, Leaf, Recycle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { mockProducts } from '@/data/mockProducts';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import SustainabilityMetrics from './SustainabilityMetrics';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { items } = useCart();
  const [selectedSection, setSelectedSection] = useState('overview');

  // Mock admin check - in real app, this would be based on user role
  const isAdmin = user?.email === 'admin@ecosphere.com';

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
          <p className="text-sm text-gray-500 mt-2">Use admin@ecosphere.com to access admin features</p>
        </div>
      </div>
    );
  }

  const mockOrders = [
    { id: 1, user: 'John Doe', total: 129.99, status: 'completed', date: '2024-06-20', carbonSaved: 2.5 },
    { id: 2, user: 'Jane Smith', total: 89.50, status: 'pending', date: '2024-06-21', carbonSaved: 1.8 },
    { id: 3, user: 'Bob Johnson', total: 245.00, status: 'completed', date: '2024-06-22', carbonSaved: 4.2 },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,567</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProducts.length}</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
      </div>

      <SustainabilityMetrics />
    </div>
  );

  const renderOrders = () => (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Carbon Saved</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>${order.total}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-green-500" />
                    {order.carbonSaved}kg CO₂
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Admin Access
        </Badge>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setSelectedSection('overview')}
          className={`py-2 px-4 border-b-2 font-medium text-sm ${
            selectedSection === 'overview'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedSection('users')}
          className={`py-2 px-4 border-b-2 font-medium text-sm ${
            selectedSection === 'users'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedSection('orders')}
          className={`py-2 px-4 border-b-2 font-medium text-sm ${
            selectedSection === 'orders'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setSelectedSection('products')}
          className={`py-2 px-4 border-b-2 font-medium text-sm ${
            selectedSection === 'products'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setSelectedSection('sustainability')}
          className={`py-2 px-4 border-b-2 font-medium text-sm ${
            selectedSection === 'sustainability'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Sustainability
        </button>
      </div>

      <div>
        {selectedSection === 'overview' && renderOverview()}
        {selectedSection === 'users' && <UserManagement />}
        {selectedSection === 'orders' && renderOrders()}
        {selectedSection === 'products' && <ProductManagement />}
        {selectedSection === 'sustainability' && <SustainabilityMetrics />}
      </div>
    </div>
  );
};

export default AdminDashboard;
