
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Edit, Trash2, Eye, Leaf } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AddUserModal from './AddUserModal';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      joinedAt: '2024-01-15', 
      totalOrders: 5,
      carbonSaved: 12.5,
      sustainabilityScore: 4.2,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      joinedAt: '2024-02-20', 
      totalOrders: 3,
      carbonSaved: 8.3,
      sustainabilityScore: 3.8,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      joinedAt: '2024-03-10', 
      totalOrders: 8,
      carbonSaved: 22.1,
      sustainabilityScore: 4.7,
      status: 'active'
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User Removed",
      description: "User has been successfully removed from the system.",
    });
  };

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser]);
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 4.0) return 'text-green-700 bg-green-100';
    if (score >= 3.0) return 'text-green-600 bg-green-50';
    if (score >= 2.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              User Management
            </CardTitle>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Carbon Saved</TableHead>
                <TableHead>Eco Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.joinedAt}</TableCell>
                  <TableCell>{user.totalOrders}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-green-500" />
                      {user.carbonSaved}kg CO₂
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSustainabilityColor(user.sustainabilityScore)}>
                      {user.sustainabilityScore.toFixed(1)}/5.0
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddUserModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddUser={handleAddUser}
      />
    </>
  );
};

export default UserManagement;
