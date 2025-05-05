
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeatSelection from '@/components/SeatSelection';
import PassengerForm, { PassengerData } from '@/components/PassengerForm';
import PaymentForm from '@/components/PaymentForm';
import BookingConfirmation from '@/components/BookingConfirmation';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Mock flight data for the booking details
const flightDetails = {
  id: "flight-1",
  airline: {
    name: "AirJet",
    logo: "https://cdn-icons-png.flaticon.com/512/984/984267.png",
  },
  flightNumber: "AJ 1234",
  departureAirport: "JFK",
  departureCity: "New York",
  departureTime: "08:30",
  departureDate: "Aug 15, 2023",
  arrivalAirport: "LAX",
  arrivalCity: "Los Angeles",
  arrivalTime: "11:45",
  arrivalDate: "Aug 15, 2023",
  duration: "3h 15m",
  stops: 0,
  price: 299,
  aircraft: "Boeing 737",
};

type BookingStep = 'seat' | 'passenger' | 'payment' | 'confirmation';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('seat');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);
  const [bookingReference, setBookingReference] = useState<string>('');
  const { toast } = useToast();
  
  const getStepProgress = () => {
    switch (currentStep) {
      case 'seat':
        return 25;
      case 'passenger':
        return 50;
      case 'payment':
        return 75;
      case 'confirmation':
        return 100;
      default:
        return 0;
    }
  };
  
  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats);
    setCurrentStep('passenger');
    
    toast({
      title: "Seats selected",
      description: `You have selected seat${seats.length > 1 ? 's' : ''}: ${seats.join(', ')}`,
    });
  };
  
  const handlePassengerSubmit = (data: PassengerData) => {
    setPassengerData(data);
    setCurrentStep('payment');
    
    toast({
      title: "Passenger details saved",
      description: `Passenger information for ${data.firstName} ${data.lastName} has been saved.`,
    });
  };
  
  const handlePaymentComplete = () => {
    // Generate a random booking reference
    const randomRef = Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookingReference(randomRef);
    setCurrentStep('confirmation');
    
    toast({
      title: "Payment successful!",
      description: `Your booking has been confirmed. Booking reference: ${randomRef}`,
      variant: "default",
    });
  };
  
  // Calculate total price including any addons
  const calculateTotalPrice = () => {
    let total = flightDetails.price;
    
    // Add extra price for non-economy seats
    if (selectedSeats.length > 0) {
      const seatType = selectedSeats[0].match(/^\d+/)?.[0];
      if (seatType && parseInt(seatType) < 10) {
        total += 150; // First class
      } else if (seatType && parseInt(seatType) < 20) {
        total += 50; // Business class
      }
    }
    
    // Add extras from passenger form
    if (passengerData?.addBaggage) {
      total += 30; // Extra baggage fee
    }
    
    return total;
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'seat':
        return <SeatSelection onContinue={handleSeatSelection} onBack={() => window.history.back()} />;
      case 'passenger':
        return <PassengerForm onSubmit={handlePassengerSubmit} onBack={() => setCurrentStep('seat')} />;
      case 'payment':
        return (
          <PaymentForm 
            totalPrice={calculateTotalPrice()} 
            onComplete={handlePaymentComplete} 
            onBack={() => setCurrentStep('passenger')} 
          />
        );
      case 'confirmation':
        return (
          <BookingConfirmation
            bookingDetails={{
              bookingReference,
              flight: {
                airline: flightDetails.airline.name,
                flightNumber: flightDetails.flightNumber,
                departureAirport: flightDetails.departureAirport,
                departureCity: flightDetails.departureCity,
                departureTime: flightDetails.departureTime,
                departureDate: flightDetails.departureDate,
                arrivalAirport: flightDetails.arrivalAirport,
                arrivalCity: flightDetails.arrivalCity,
                arrivalTime: flightDetails.arrivalTime,
                arrivalDate: flightDetails.arrivalDate,
              },
              passenger: {
                name: passengerData ? `${passengerData.firstName} ${passengerData.lastName}` : '',
                email: passengerData?.email || '',
              },
              seat: selectedSeats[0] || 'Not selected',
              totalPrice: calculateTotalPrice(),
            }}
          />
        );
      default:
        return null;
    }
  };
  
  const getStepTitle = () => {
    switch (currentStep) {
      case 'seat':
        return 'Select Your Seat';
      case 'passenger':
        return 'Passenger Information';
      case 'payment':
        return 'Payment Details';
      case 'confirmation':
        return 'Booking Confirmation';
      default:
        return '';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {currentStep !== 'confirmation' && (
          <>
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex justify-between mb-2">
                <h1 className="text-2xl font-bold">{getStepTitle()}</h1>
                <span className="text-gray-500">Step {getStepProgress() / 25} of 4</span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>
            
            {/* Flight Summary */}
            <div className="max-w-3xl mx-auto mb-6">
              <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center mb-3 md:mb-0">
                    <img
                      src={flightDetails.airline.logo}
                      alt={flightDetails.airline.name}
                      className="w-10 h-10 mr-3"
                    />
                    <div>
                      <p className="font-medium">{flightDetails.airline.name} {flightDetails.flightNumber}</p>
                      <p className="text-sm text-gray-600">{flightDetails.aircraft}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="text-center">
                      <p className="font-medium">{flightDetails.departureTime}</p>
                      <p className="text-sm">{flightDetails.departureAirport}</p>
                    </div>
                    <div className="hidden md:block text-gray-400">→</div>
                    <div className="text-center">
                      <p className="font-medium">{flightDetails.arrivalTime}</p>
                      <p className="text-sm">{flightDetails.arrivalAirport}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-0">
                    <p className="text-lg font-bold">${flightDetails.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {renderStepContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
