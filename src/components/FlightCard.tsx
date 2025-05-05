
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Wifi, Coffee } from 'lucide-react';

export interface Flight {
  id: string;
  airline: {
    name: string;
    logo: string;
  };
  flightNumber: string;
  departureAirport: string;
  departureCity: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  aircraft: string;
  amenities: string[];
  seatsAvailable: number;
}

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  return (
    <Card className="flight-card mb-4 hover:border-purple-300">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Airline and Flight Details */}
          <div className="flex items-center mb-3 lg:mb-0">
            <div className="w-12 h-12 mr-3 flex-shrink-0">
              <img
                src={flight.airline.logo}
                alt={flight.airline.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-medium text-gray-900">{flight.airline.name}</div>
              <div className="text-xs text-gray-500">{flight.flightNumber} • {flight.aircraft}</div>
            </div>
          </div>

          {/* Flight Schedule */}
          <div className="flex items-center justify-between lg:justify-center flex-grow px-4 mb-3 lg:mb-0">
            <div className="text-center">
              <div className="text-lg font-semibold">{flight.departureTime}</div>
              <div className="text-sm font-medium">{flight.departureAirport}</div>
              <div className="text-xs text-gray-500">{flight.departureCity}</div>
            </div>
            
            <div className="mx-4 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-2">{flight.duration}</div>
              <div className="relative w-20 lg:w-32">
                <div className="border-t border-gray-300 w-full absolute top-1/2"></div>
                <div className="absolute -top-1 -right-1">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {flight.stops === 0 ? 'Direct' : `${flight.stops} ${flight.stops === 1 ? 'Stop' : 'Stops'}`}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold">{flight.arrivalTime}</div>
              <div className="text-sm font-medium">{flight.arrivalAirport}</div>
              <div className="text-xs text-gray-500">{flight.arrivalCity}</div>
            </div>
          </div>

          {/* Price and Book Button */}
          <div className="text-center lg:text-right">
            <div className="mb-2">
              <div className="text-2xl font-bold text-purple-600">${flight.price}</div>
              <div className="text-xs text-gray-500">per passenger</div>
            </div>
            <Button 
              onClick={() => onSelect(flight)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Select Flight
            </Button>
          </div>
        </div>

        {/* Flight Details */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
              <Clock size={12} /> 
              {flight.duration}
            </Badge>
            
            {flight.amenities.includes('WiFi') && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Wifi size={12} /> WiFi
              </Badge>
            )}
            
            {flight.amenities.includes('Meals') && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Coffee size={12} /> Meals
              </Badge>
            )}
            
            <div className="text-sm text-gray-500 ml-auto">
              {flight.seatsAvailable} seats left at this price
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
