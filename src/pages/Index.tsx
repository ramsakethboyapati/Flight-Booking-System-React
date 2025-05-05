
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchForm from '@/components/SearchForm';
import { Button } from "@/components/ui/button";
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, TrendingUp, Shield, Clock } from 'lucide-react';

const featuredDestinations = [
  {
    id: 1,
    name: 'Paris',
    code: 'CDG',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9088d4decd?q=80&w=800',
    price: 299,
  },
  {
    id: 2,
    name: 'Tokyo',
    code: 'HND',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800',
    price: 799,
  },
  {
    id: 3,
    name: 'New York',
    code: 'JFK',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1546436836-07a91091f160?q=80&w=800',
    price: 349,
  },
  {
    id: 4,
    name: 'Sydney',
    code: 'SYD',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800',
    price: 899,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    comment: 'WanderlustWings made booking my family vacation so easy. The UI is clean and the flight selection was excellent. Will definitely use again!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Raj Patel',
    location: 'London, UK',
    comment: 'I was able to book my business trip in minutes. The seat selection feature is stellar and the prices were better than competitors.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Maria Gonzalez',
    location: 'Barcelona, Spain',
    comment: 'As a frequent traveler, I appreciate how simple WanderlustWings makes the booking process. The flight change options are also very convenient.',
    rating: 4,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [showMoreTestimonials, setShowMoreTestimonials] = useState(false);
  
  const handleSearch = (searchParams: any) => {
    // Store search parameters in localStorage
    localStorage.setItem('searchOrigin', searchParams.origin);
    localStorage.setItem('searchDestination', searchParams.destination);
    if (searchParams.departDate) {
      localStorage.setItem('searchDepartDate', searchParams.departDate.toISOString());
    }
    if (searchParams.returnDate) {
      localStorage.setItem('searchReturnDate', searchParams.returnDate.toISOString());
    }
    
    // Navigate to search results page
    navigate('/search');
  };
  
  // Handle click on featured destination
  const handleDestinationClick = (destination: any) => {
    // Set Mumbai (BOM) as a default origin
    const origin = 'BOM'; // Mumbai
    
    // Set destination's airport code
    const destinationCode = destination.code;
    
    // Store search parameters in localStorage
    localStorage.setItem('searchOrigin', origin);
    localStorage.setItem('searchDestination', destinationCode);
    
    // Set default departure date as 7 days from now
    const departDate = new Date();
    departDate.setDate(departDate.getDate() + 7);
    localStorage.setItem('searchDepartDate', departDate.toISOString());
    
    // Navigate to search results page
    navigate('/search');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find and Book Your Perfect Flight
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Search, compare, and book flights to anywhere in the world with ease.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Popular Destinations</h2>
          <p className="text-gray-600 text-center mb-8">Explore our most popular flight destinations</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{destination.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {destination.country}
                      </span>
                      <span className="text-white font-medium">
                        from ${destination.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      Best time to visit: May-Oct
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => handleDestinationClick(destination)}
                    >
                      Find Flights
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Why Choose WanderlustWings</h2>
          <p className="text-gray-600 text-center mb-12">We're committed to making your travel experience seamless</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Flight Deals</h3>
              <p className="text-gray-600">Compare thousands of flights to find the best prices and deals for your next trip.</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Booking</h3>
              <p className="text-gray-600">Your flight bookings are secured with the latest encryption and security standards.</p>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-12">Thousands of satisfied travelers trust WanderlustWings</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, showMoreTestimonials ? testimonials.length : 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`h-5 w-5 ${
                        index < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.585l-7.06 3.711 1.35-7.865L.54 7.07l7.889-1.146L10 0l2.571 5.924L20.46 7.07l-5.752 4.361 1.35 7.865L10 15.585z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {!showMoreTestimonials && testimonials.length > 3 && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline"
                onClick={() => setShowMoreTestimonials(true)}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                Show More Reviews
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get the Best Flight Deals</h2>
            <p className="mb-6">Subscribe to our newsletter and never miss out on exclusive deals and travel tips.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md flex-1 text-gray-900"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-sm mt-4 text-purple-200">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
