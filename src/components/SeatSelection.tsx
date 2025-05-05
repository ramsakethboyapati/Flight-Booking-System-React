
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample seat data structure
type SeatType = {
  id: string;
  row: number;
  column: string;
  type: 'Economy' | 'Business' | 'First';
  price: number;
  isOccupied: boolean;
};

const generateSeats = (): SeatType[] => {
  const seats: SeatType[] = [];
  // Economy class (rows 20-30)
  for (let row = 20; row <= 30; row++) {
    for (let col of ['A', 'B', 'C', 'D', 'E', 'F']) {
      seats.push({
        id: `${row}${col}`,
        row,
        column: col,
        type: 'Economy',
        price: 0, // Base price included in ticket
        isOccupied: Math.random() > 0.7, // Randomly mark some seats as occupied
      });
    }
  }
  
  // Business class (rows 10-12)
  for (let row = 10; row <= 12; row++) {
    for (let col of ['A', 'C', 'D', 'F']) {
      seats.push({
        id: `${row}${col}`,
        row,
        column: col,
        type: 'Business',
        price: 50, // Additional fee for business class
        isOccupied: Math.random() > 0.5,
      });
    }
  }
  
  // First class (rows 1-2)
  for (let row = 1; row <= 2; row++) {
    for (let col of ['A', 'D']) {
      seats.push({
        id: `${row}${col}`,
        row,
        column: col,
        type: 'First',
        price: 150, // Additional fee for first class
        isOccupied: Math.random() > 0.3,
      });
    }
  }
  
  return seats;
};

interface SeatSelectionProps {
  onContinue: (selectedSeats: string[]) => void;
  onBack: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ onContinue, onBack }) => {
  const [seats] = useState<SeatType[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [currentClass, setCurrentClass] = useState<'First' | 'Business' | 'Economy'>('Economy');
  
  const handleSeatClick = (seat: SeatType) => {
    if (seat.isOccupied) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seat.id)) {
        return prev.filter(id => id !== seat.id);
      } else {
        if (prev.length < 1) { // Limiting to 1 selection for simplicity
          return [...prev, seat.id];
        }
        return prev;
      }
    });
  };
  
  const getColorClassForSeat = (seat: SeatType) => {
    if (selectedSeats.includes(seat.id)) {
      return 'seat-selected';
    }
    
    if (seat.isOccupied) {
      return 'seat-occupied';
    }
    
    switch(seat.type) {
      case 'First':
        return 'bg-purple-100 hover:bg-purple-200';
      case 'Business':
        return 'bg-blue-50 hover:bg-blue-100';
      case 'Economy':
      default:
        return 'bg-gray-50 hover:bg-gray-100';
    }
  };
  
  const getAdditionalPrice = () => {
    return seats
      .filter(seat => selectedSeats.includes(seat.id))
      .reduce((sum, seat) => sum + seat.price, 0);
  };
  
  const filteredSeats = seats.filter(seat => seat.type === currentClass);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Select Your Seat</CardTitle>
        <CardDescription>
          Choose your preferred seat on the aircraft
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6 space-x-2">
          <Button 
            variant={currentClass === 'First' ? 'default' : 'outline'}
            onClick={() => setCurrentClass('First')}
            className={currentClass === 'First' ? 'bg-purple-600' : ''}
          >
            First Class
          </Button>
          <Button 
            variant={currentClass === 'Business' ? 'default' : 'outline'}
            onClick={() => setCurrentClass('Business')}
            className={currentClass === 'Business' ? 'bg-purple-600' : ''}
          >
            Business
          </Button>
          <Button 
            variant={currentClass === 'Economy' ? 'default' : 'outline'}
            onClick={() => setCurrentClass('Economy')}
            className={currentClass === 'Economy' ? 'bg-purple-600' : ''}
          >
            Economy
          </Button>
        </div>
        
        <div className="relative mb-8 mx-auto">
          {/* Airplane illustration */}
          <div className="w-full h-20 bg-gray-100 rounded-t-full border border-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Front</span>
          </div>
          
          {/* Main cabin */}
          <div className="border-x border-gray-300 px-4 py-8">
            <div className="grid grid-cols-6 gap-2">
              {currentClass === 'First' && (
                <>
                  <div className="col-span-6 mb-4 text-center text-sm text-gray-500">
                    First Class (+$150)
                  </div>
                  <div className="col-start-1 col-span-3">
                    <div className="grid grid-cols-3 gap-2">
                      {filteredSeats
                        .filter(seat => seat.column === 'A')
                        .map(seat => (
                          <div key={seat.id} className="col-span-3 flex justify-start">
                            <button 
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isOccupied}
                              className={`seat w-12 h-12 rounded-lg flex items-center justify-center font-medium ${getColorClassForSeat(seat)}`}
                            >
                              {seat.row}{seat.column}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="col-start-4 col-span-3">
                    <div className="grid grid-cols-3 gap-2">
                      {filteredSeats
                        .filter(seat => seat.column === 'D')
                        .map(seat => (
                          <div key={seat.id} className="col-span-3 flex justify-end">
                            <button 
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isOccupied}
                              className={`seat w-12 h-12 rounded-lg flex items-center justify-center font-medium ${getColorClassForSeat(seat)}`}
                            >
                              {seat.row}{seat.column}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
              
              {currentClass === 'Business' && (
                <>
                  <div className="col-span-6 mb-4 text-center text-sm text-gray-500">
                    Business Class (+$50)
                  </div>
                  {['A', 'C', 'D', 'F'].map((column) => (
                    <div key={column} className="col-span-3 md:col-span-1 flex justify-center">
                      <div className="grid grid-rows-3 gap-2">
                        {filteredSeats
                          .filter(seat => seat.column === column)
                          .map(seat => (
                            <button 
                              key={seat.id}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isOccupied}
                              className={`seat w-10 h-10 rounded-lg flex items-center justify-center font-medium ${getColorClassForSeat(seat)}`}
                            >
                              {seat.row}{seat.column}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
              
              {currentClass === 'Economy' && (
                <>
                  <div className="col-span-6 mb-4 text-center text-sm text-gray-500">
                    Economy Class (Included)
                  </div>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((column) => (
                    <div key={column} className="col-span-1 flex justify-center">
                      <div className="grid grid-rows-11 gap-1">
                        {filteredSeats
                          .filter(seat => seat.column === column)
                          .map(seat => (
                            <button 
                              key={seat.id}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.isOccupied}
                              className={`seat w-8 h-8 rounded-md flex items-center justify-center text-sm ${getColorClassForSeat(seat)}`}
                            >
                              {seat.row}{seat.column}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          
          {/* Airplane tail */}
          <div className="w-full h-8 bg-gray-100 rounded-b-lg border border-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Rear</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-50 border border-gray-300 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 seat-selected rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 seat-occupied rounded"></div>
            <span className="text-sm">Occupied</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {selectedSeats.length > 0 && (
            <div className="text-sm">
              <span className="font-medium">Selected seat(s):</span> {selectedSeats.join(', ')}
              {getAdditionalPrice() > 0 && (
                <div className="text-purple-600 font-medium">
                  Additional fee: ${getAdditionalPrice()}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            onClick={() => onContinue(selectedSeats)} 
            disabled={selectedSeats.length === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeatSelection;
