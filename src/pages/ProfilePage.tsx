
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, CreditCard, Shield, LogOut } from 'lucide-react';

interface UserInfo {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      // Redirect to login if not logged in
      toast({
        title: "Authentication Required",
        description: "Please log in to view your profile",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    const parsedUserInfo = JSON.parse(storedUserInfo);
    setUserInfo(parsedUserInfo);
    
    // Initialize form data
    setFormData({
      name: parsedUserInfo.name || '',
      email: parsedUserInfo.email || '',
      phone: parsedUserInfo.phone || '',
      address: parsedUserInfo.address || '',
    });
  }, [navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // In a real app, this would make an API call to update user info
    const updatedUserInfo = {
      ...userInfo,
      ...formData,
    };
    
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    setUserInfo(updatedUserInfo);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/login');
  };

  if (!userInfo) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hello, {userInfo.name}!</h1>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </Button>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex justify-between">
                    <span>Personal Information</span>
                    {!isEditing ? (
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        variant="outline" 
                        size="sm"
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="space-x-2">
                        <Button 
                          onClick={() => setIsEditing(false)} 
                          variant="outline" 
                          size="sm"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSaveChanges} 
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={formData.name} 
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={formData.phone} 
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address"
                          value={formData.address} 
                          onChange={handleInputChange}
                          placeholder="Your address"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Full Name</p>
                          <p className="mt-1">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email Address</p>
                          <p className="mt-1">{formData.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="mt-1">{formData.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Member Since</p>
                          <p className="mt-1">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="mt-1">{formData.address || "Not provided"}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Shield className="mr-2 h-4 w-4" /> Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your saved payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg mb-4 bg-gray-50 flex items-center justify-center text-gray-500">
                    <div className="text-center py-6">
                      <CreditCard className="mx-auto h-8 w-8 mb-2" />
                      <p>No payment methods added yet</p>
                      <p className="text-sm text-gray-400 mt-1">Add a payment method for faster checkout</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
