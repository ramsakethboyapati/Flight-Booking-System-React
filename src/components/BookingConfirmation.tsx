
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Download, Calendar, Mail, MapPin } from "lucide-react";
import { Link } from 'react-router-dom';

interface BookingConfirmationProps {
  bookingDetails: {
    bookingReference: string;
    flight: {
      airline: string;
      flightNumber: string;
      departureAirport: string;
      departureCity: string;
      departureTime: string;
      departureDate: string;
      arrivalAirport: string;
      arrivalCity: string;
      arrivalTime: string;
      arrivalDate: string;
    };
    passenger: {
      name: string;
      email: string;
    };
    seat: string;
    totalPrice: number;
  };
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ bookingDetails }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="bg-green-50 border-b flex flex-col items-center text-center">
        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="text-xl text-green-700">Booking Confirmed!</CardTitle>
        <CardDescription>
          Your flight has been booked successfully. Booking reference: <span className="font-bold">{bookingDetails.bookingReference}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Flight Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <p className="font-medium">{bookingDetails.flight.airline} {bookingDetails.flight.flightNumber}</p>
                  <p className="text-sm text-gray-500">{bookingDetails.flight.departureDate}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="text-xs bg-purple-100 text-purple-800 py-1 px-2 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="hidden md:block mr-4">
                  <div className="h-full flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <div className="h-full border-l border-dashed border-gray-300 mx-auto my-1"></div>
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-bold">{bookingDetails.flight.departureTime}</p>
                      <p className="font-medium">{bookingDetails.flight.departureAirport}</p>
                      <p className="text-sm text-gray-500">{bookingDetails.flight.departureCity}</p>
                    </div>
                    <div className="md:text-right mt-2 md:mt-0">
                      <p className="text-xs text-gray-500">DEPARTURE</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4 md:hidden" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">{bookingDetails.flight.arrivalTime}</p>
                      <p className="font-medium">{bookingDetails.flight.arrivalAirport}</p>
                      <p className="text-sm text-gray-500">{bookingDetails.flight.arrivalCity}</p>
                    </div>
                    <div className="md:text-right mt-2 md:mt-0">
                      <p className="text-xs text-gray-500">ARRIVAL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Passenger Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{bookingDetails.passenger.name}</p>
                <p className="text-sm text-gray-500">{bookingDetails.passenger.email}</p>
                <div className="mt-2 flex items-center">
                  <span className="font-medium">Seat:</span>
                  <span className="ml-2 bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm">
                    {bookingDetails.seat}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Payment Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Base fare</span>
                  <span>${(bookingDetails.totalPrice * 0.8).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Taxes & fees</span>
                  <span>${(bookingDetails.totalPrice * 0.2).toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-purple-600">${bookingDetails.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Next Steps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-sky-50 border-sky-100">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Mail className="h-6 w-6 text-sky-600 mb-2" />
                  <p className="text-sky-800 text-sm">Check your email for booking confirmation and e-ticket</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-100">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Calendar className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="text-purple-800 text-sm">Check-in online 24 hours before your flight departs</p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-100">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <MapPin className="h-6 w-6 text-orange-600 mb-2" />
                  <p className="text-orange-800 text-sm">Arrive at the airport at least 2 hours before departure</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" className="w-full sm:w-auto border-purple-200 hover:bg-purple-50 text-purple-600 flex items-center gap-2">
          <Download size={16} />
          Download E-Ticket
        </Button>
        <Link to="/" className="w-full sm:w-auto">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Return to Homepage
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookingConfirmation;
