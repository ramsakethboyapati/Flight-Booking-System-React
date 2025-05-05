
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, PlaneTakeoff, PlaneLanding, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type TripType = "one-way" | "round-trip" | "multi-city";

// Define popular airports with Indian cities highlighted
const popularAirports = [
  { code: "DEL", city: "Delhi", country: "India", airport: "Indira Gandhi International Airport" },
  { code: "BOM", city: "Mumbai", country: "India", airport: "Chhatrapati Shivaji International Airport" },
  { code: "MAA", city: "Chennai", country: "India", airport: "Chennai International Airport" },
  { code: "BLR", city: "Bangalore", country: "India", airport: "Kempegowda International Airport" },
  { code: "CCU", city: "Kolkata", country: "India", airport: "Netaji Subhash Chandra Bose International Airport" },
  { code: "HYD", city: "Hyderabad", country: "India", airport: "Rajiv Gandhi International Airport" },
  { code: "COK", city: "Kochi", country: "India", airport: "Cochin International Airport" },
  { code: "PNQ", city: "Pune", country: "India", airport: "Pune Airport" },
  { code: "GOI", city: "Goa", country: "India", airport: "Dabolim Airport" },
  { code: "AMD", city: "Ahmedabad", country: "India", airport: "Sardar Vallabhbhai Patel International Airport" },
  { code: "LKO", city: "Lucknow", country: "India", airport: "Chaudhary Charan Singh International Airport" },
  { code: "JAI", city: "Jaipur", country: "India", airport: "Jaipur International Airport" },
  { code: "JFK", city: "New York", country: "USA", airport: "John F. Kennedy International Airport" },
  { code: "LAX", city: "Los Angeles", country: "USA", airport: "Los Angeles International Airport" },
  { code: "LHR", city: "London", country: "UK", airport: "Heathrow Airport" },
  { code: "CDG", city: "Paris", country: "France", airport: "Charles de Gaulle Airport" },
  { code: "DXB", city: "Dubai", country: "UAE", airport: "Dubai International Airport" },
  { code: "SIN", city: "Singapore", country: "Singapore", airport: "Changi Airport" },
  { code: "HKG", city: "Hong Kong", country: "Hong Kong", airport: "Hong Kong International Airport" },
  { code: "SYD", city: "Sydney", country: "Australia", airport: "Sydney Airport" },
];

const SearchForm = ({ onSearch }: { onSearch: (searchParams: any) => void }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState<string>("1");
  const [travelClass, setTravelClass] = useState<string>("Economy");
  
  const [originOpen, setOriginOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [selectedOriginAirport, setSelectedOriginAirport] = useState<string>("");
  const [selectedDestinationAirport, setSelectedDestinationAirport] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!selectedOriginAirport) {
      toast({
        title: "Missing origin",
        description: "Please select a departure city",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedDestinationAirport) {
      toast({
        title: "Missing destination",
        description: "Please select an arrival city",
        variant: "destructive"
      });
      return;
    }
    
    if (!departDate) {
      toast({
        title: "Missing departure date",
        description: "Please select when you want to depart",
        variant: "destructive"
      });
      return;
    }
    
    if (tripType === "round-trip" && !returnDate) {
      toast({
        title: "Missing return date",
        description: "Please select when you want to return",
        variant: "destructive"
      });
      return;
    }
    
    const searchParams = {
      tripType,
      origin: selectedOriginAirport,
      destination: selectedDestinationAirport,
      departDate,
      returnDate: tripType === "round-trip" ? returnDate : undefined,
      passengers,
      travelClass,
    };
    
    // Log search parameters for debugging
    console.info("Search params:", JSON.stringify(searchParams, null, 2));
    
    // Call the parent component's onSearch function
    onSearch(searchParams);
    
    // Navigate to search results page
    navigate('/search');
  };

  const handleSwapLocations = () => {
    const tempAirport = selectedOriginAirport;
    setSelectedOriginAirport(selectedDestinationAirport);
    setSelectedDestinationAirport(tempAirport);
    
    const tempCity = origin;
    setOrigin(destination);
    setDestination(tempCity);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6">
        <Tabs defaultValue="round-trip" className="w-full">
          <TabsList className="mb-6 grid grid-cols-3">
            <TabsTrigger
              value="round-trip"
              onClick={() => setTripType("round-trip")}
            >
              Round Trip
            </TabsTrigger>
            <TabsTrigger 
              value="one-way" 
              onClick={() => setTripType("one-way")}
            >
              One Way
            </TabsTrigger>
            <TabsTrigger
              value="multi-city"
              onClick={() => setTripType("multi-city")}
            >
              Multi City
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Origin Input */}
              <div className="relative">
                <Popover open={originOpen} onOpenChange={setOriginOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <PlaneTakeoff size={18} />
                      </div>
                      <Input
                        type="text"
                        placeholder="From where?"
                        className="pl-10"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        onClick={() => setOriginOpen(true)}
                        required
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-full" align="start">
                    <Command>
                      <CommandInput placeholder="Search airports..." />
                      <CommandList>
                        <CommandEmpty>No airports found.</CommandEmpty>
                        <CommandGroup heading="Popular Airports">
                          {popularAirports
                            .filter(airport => 
                              airport.city.toLowerCase().includes(origin.toLowerCase()) ||
                              airport.code.toLowerCase().includes(origin.toLowerCase()) ||
                              airport.country.toLowerCase().includes(origin.toLowerCase()) ||
                              origin === ""
                            )
                            .map(airport => (
                              <CommandItem
                                key={airport.code}
                                onSelect={() => {
                                  setSelectedOriginAirport(airport.code);
                                  setOrigin(`${airport.city} (${airport.code})`);
                                  setOriginOpen(false);
                                }}
                                className="flex justify-between"
                              >
                                <div>
                                  <span className="font-medium">{airport.city}</span>
                                  <span className="ml-2 text-gray-500">{airport.code}</span>
                                </div>
                                <span className="text-sm text-gray-500">{airport.country}</span>
                              </CommandItem>
                            ))
                          }
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Swap Button (Mobile view only) */}
              <div className="md:hidden flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleSwapLocations}
                >
                  <ArrowRightLeft size={16} />
                </Button>
              </div>

              {/* Location Swap Button and Destination (Desktop) */}
              <div className="flex items-center gap-2">
                {/* Swap button - Only visible on desktop */}
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full hidden md:flex"
                  onClick={handleSwapLocations}
                >
                  <ArrowRightLeft size={16} />
                </Button>

                {/* Destination input */}
                <div className="relative flex-grow">
                  <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative w-full">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          <PlaneLanding size={18} />
                        </div>
                        <Input
                          type="text"
                          placeholder="To where?"
                          className="pl-10 w-full"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          onClick={() => setDestinationOpen(true)}
                          required
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full" align="start">
                      <Command>
                        <CommandInput placeholder="Search airports..." />
                        <CommandList>
                          <CommandEmpty>No airports found.</CommandEmpty>
                          <CommandGroup heading="Popular Airports">
                            {popularAirports
                              .filter(airport => 
                                selectedOriginAirport !== airport.code && (
                                  airport.city.toLowerCase().includes(destination.toLowerCase()) ||
                                  airport.code.toLowerCase().includes(destination.toLowerCase()) ||
                                  airport.country.toLowerCase().includes(destination.toLowerCase()) ||
                                  destination === ""
                                )
                              )
                              .map(airport => (
                                <CommandItem
                                  key={airport.code}
                                  onSelect={() => {
                                    setSelectedDestinationAirport(airport.code);
                                    setDestination(`${airport.city} (${airport.code})`);
                                    setDestinationOpen(false);
                                  }}
                                  className="flex justify-between"
                                >
                                  <div>
                                    <span className="font-medium">{airport.city}</span>
                                    <span className="ml-2 text-gray-500">{airport.code}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">{airport.country}</span>
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Departure and Return Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Departure Date */}
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departDate ? (
                        format(departDate, "MMM d, yyyy")
                      ) : (
                        <span className="text-gray-500">Departure Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={departDate}
                      onSelect={setDepartDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date - Only show for round trip */}
              {tripType === "round-trip" && (
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? (
                          format(returnDate, "MMM d, yyyy")
                        ) : (
                          <span className="text-gray-500">Return Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 z-50"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                        disabled={(date) =>
                          date < new Date() ||
                          (departDate && date < departDate)
                        }
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            {/* Passengers and Class Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Passengers */}
              <div>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger className="w-full border-gray-200">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2" />
                      <SelectValue placeholder="1 Passenger" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Number of passengers</SelectLabel>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                      <SelectItem value="5">5 Passengers</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Class */}
              <div>
                <Select value={travelClass} onValueChange={setTravelClass}>
                  <SelectTrigger className="w-full border-gray-200">
                    <SelectValue placeholder="Economy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Travel class</SelectLabel>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="First">First</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                Search Flights
              </Button>
            </div>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
