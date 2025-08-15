
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

const AddProductModal = ({ open, onClose, onAddProduct }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    sustainabilityScore: '',
    carbonFootprint: '',
    image: ''
  });

  const categories = ['clothing', 'electronics', 'home', 'lifestyle', 'food', 'fitness'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      sustainabilityScore: parseFloat(formData.sustainabilityScore) || 3.0,
      carbonFootprint: parseFloat(formData.carbonFootprint) || 5.0,
      image: formData.image || '/placeholder.svg'
    };

    onAddProduct(newProduct);
    
    toast({
      title: "Success",
      description: "Product added successfully!",
    });

    // Reset form
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      sustainabilityScore: '',
      carbonFootprint: '',
      image: ''
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
            />
          </div>
          
          <div>
            <Label htmlFor="sustainability">Sustainability Score (1-5)</Label>
            <Input
              id="sustainability"
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={formData.sustainabilityScore}
              onChange={(e) => setFormData({ ...formData, sustainabilityScore: e.target.value })}
              placeholder="3.0"
            />
          </div>
          
          <div>
            <Label htmlFor="carbon">Carbon Footprint (kg CO₂)</Label>
            <Input
              id="carbon"
              type="number"
              step="0.1"
              value={formData.carbonFootprint}
              onChange={(e) => setFormData({ ...formData, carbonFootprint: e.target.value })}
              placeholder="5.0"
            />
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
