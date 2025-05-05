
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  Calendar, 
  MapPin, 
  Download, 
  UserCircle, 
  Edit, 
  CreditCard 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; isLoggedIn: boolean } | null>(null);
  
  // Mock upcoming and past bookings
  const upcomingBookings = [
    {
      id: 'booking1',
      bookingReference: 'ABC123',
      flightNumber: 'AJ 1234',
      airline: 'AirJet',
      departureDate: 'Aug 22, 2025',
      departureAirport: 'DEL',
      departureCity: 'Delhi',
      departureTime: '08:30',
      arrivalAirport: 'BOM',
      arrivalCity: 'Mumbai',
      arrivalTime: '11:45',
      status: 'Confirmed',
    },
    {
      id: 'booking2',
      bookingReference: 'DEF456',
      flightNumber: 'SW 5678',
      airline: 'SkyWings',
      departureDate: 'Sep 15, 2025',
      departureAirport: 'BLR',
      departureCity: 'Bangalore',
      departureTime: '14:20',
      arrivalAirport: 'CCU',
      arrivalCity: 'Kolkata',
      arrivalTime: '23:05',
      status: 'Confirmed',
    },
  ];
  
  const pastBookings = [
    {
      id: 'booking3',
      bookingReference: 'GHI789',
      flightNumber: 'GA 9012',
      airline: 'Global Airways',
      departureDate: 'Jul 10, 2023',
      departureAirport: 'MAA',
      departureCity: 'Chennai',
      departureTime: '06:45',
      arrivalAirport: 'HYD',
      arrivalCity: 'Hyderabad',
      arrivalTime: '12:30',
      status: 'Completed',
    },
    {
      id: 'booking4',
      bookingReference: 'JKL012',
      flightNumber: 'IG 5432',
      airline: 'IndiGo',
      departureDate: 'Jan 05, 2023',
      departureAirport: 'DEL',
      departureCity: 'Delhi',
      departureTime: '12:15',
      arrivalAirport: 'GOI',
      arrivalCity: 'Goa',
      arrivalTime: '14:45',
      status: 'Completed',
    },
  ];
  
  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      // Redirect to login if not logged in
      navigate('/login');
      toast({
        title: "Login Required",
        description: "Please log in to access your dashboard.",
        variant: "destructive"
      });
      return;
    }
    
    setUserInfo(JSON.parse(storedUserInfo));
    
    // Save bookings to localStorage for consistency across pages
    localStorage.setItem('userBookings', JSON.stringify([...upcomingBookings, ...pastBookings]));
  }, [navigate, toast]);

  const handleBookFlight = () => {
    navigate('/');
  };
  
  const handleViewProfile = () => {
    navigate('/profile');
  };
  
  const handleDownloadTicket = (bookingReference: string) => {
    toast({
      title: "E-Ticket Downloaded",
      description: `Ticket for booking ${bookingReference} has been downloaded.`,
    });
  };
  
  const handleManageBooking = (bookingId: string) => {
    const booking = [...upcomingBookings, ...pastBookings].find(b => b.id === bookingId);
    if (booking) {
      // Store selected booking in localStorage for booking page
      localStorage.setItem('selectedBooking', JSON.stringify(booking));
      toast({
        title: "Managing Booking",
        description: `Now viewing details for booking ${booking.bookingReference}`,
      });
      navigate('/booking');
    }
  };
  
  const renderBookingCard = (booking: any, isPast = false) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <Plane size={16} className="text-purple-500 mr-2" />
              <span className="font-medium">{booking.airline} • {booking.flightNumber}</span>
            </div>
            <div className="flex items-center mb-2">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-600">{booking.departureDate}</span>
            </div>
          </div>
          
          <div className="my-3 lg:my-0">
            <div className="flex items-center space-x-8">
              <div>
                <p className="text-lg font-medium">{booking.departureTime}</p>
                <p className="text-sm text-gray-600">{booking.departureAirport}</p>
                <p className="text-xs text-gray-500">{booking.departureCity}</p>
              </div>
              
              <div className="text-gray-300">→</div>
              
              <div>
                <p className="text-lg font-medium">{booking.arrivalTime}</p>
                <p className="text-sm text-gray-600">{booking.arrivalAirport}</p>
                <p className="text-xs text-gray-500">{booking.arrivalCity}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start lg:items-end">
            <div className="mb-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                booking.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {booking.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Ref: {booking.bookingReference}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs border-purple-200 hover:bg-purple-50 text-purple-600"
                onClick={() => handleDownloadTicket(booking.bookingReference)}
              >
                <Download size={14} className="mr-1" /> E-Ticket
              </Button>
              {!isPast && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => handleManageBooking(booking.id)}
                >
                  <Edit size={14} className="mr-1" /> Manage
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* User Profile Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
                {userInfo?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {userInfo?.name || 'User'}!</h1>
                <p className="text-gray-600">Manage your bookings and account</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={handleViewProfile}
              >
                <UserCircle size={16} className="mr-2" />
                Profile
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
                onClick={handleBookFlight}
              >
                <Plane size={16} className="mr-2" />
                Book a Flight
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <Plane size={18} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Flights Booked</p>
                    <p className="text-2xl font-bold">{upcomingBookings.length + pastBookings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <MapPin size={18} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Cities Visited</p>
                    <p className="text-2xl font-bold">
                      {new Set([...pastBookings.map(b => b.arrivalCity)]).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                    <CreditCard size={18} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Loyalty Points</p>
                    <p className="text-2xl font-bold">
                      {(upcomingBookings.length + pastBookings.length) * 150}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Bookings */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Trips</h2>
            
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => renderBookingCard(booking))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">You don't have any upcoming trips</p>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={handleBookFlight}
                    >
                      Book a Flight
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-4">
                {pastBookings.length > 0 ? (
                  pastBookings.map(booking => renderBookingCard(booking, true))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">You don't have any past trips</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
