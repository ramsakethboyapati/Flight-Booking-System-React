import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlightCard, { Flight } from '@/components/FlightCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterX, Sliders, ArrowUpDown } from "lucide-react";
import { format } from 'date-fns';

// Generate a large set of mock flight data
const generateMockFlights = (): Flight[] => {
  const airlines = [
    { name: "Air India", logo: "https://cdn-icons-png.flaticon.com/512/984/984267.png" },
    { name: "IndiGo", logo: "https://cdn-icons-png.flaticon.com/512/984/984234.png" },
    { name: "SpiceJet", logo: "https://cdn-icons-png.flaticon.com/512/984/984291.png" },
    { name: "Vistara", logo: "https://cdn-icons-png.flaticon.com/512/984/984223.png" },
    { name: "Go Air", logo: "https://cdn-icons-png.flaticon.com/512/984/984228.png" },
    { name: "Emirates", logo: "https://cdn-icons-png.flaticon.com/512/984/984267.png" },
    { name: "Lufthansa", logo: "https://cdn-icons-png.flaticon.com/512/984/984234.png" },
    { name: "British Airways", logo: "https://cdn-icons-png.flaticon.com/512/984/984291.png" },
    { name: "Air France", logo: "https://cdn-icons-png.flaticon.com/512/984/984223.png" },
  ];

  const airports = [
    { code: "DEL", city: "Delhi" },
    { code: "BOM", city: "Mumbai" },
    { code: "MAA", city: "Chennai" },
    { code: "BLR", city: "Bangalore" },
    { code: "CCU", city: "Kolkata" },
    { code: "HYD", city: "Hyderabad" },
    { code: "COK", city: "Kochi" },
    { code: "PNQ", city: "Pune" },
    { code: "GOI", city: "Goa" },
    { code: "AMD", city: "Ahmedabad" },
    { code: "LKO", city: "Lucknow" },
    { code: "JAI", city: "Jaipur" },
    { code: "JFK", city: "New York" },
    { code: "LAX", city: "Los Angeles" },
    { code: "LHR", city: "London" },
    { code: "CDG", city: "Paris" },
    { code: "DXB", city: "Dubai" },
    { code: "SIN", city: "Singapore" },
  ];

  const mockFlights: Flight[] = [];

  // For each origin and destination pair, generate 3-5 flights
  for (let i = 0; i < airports.length; i++) {
    for (let j = 0; j < airports.length; j++) {
      // Don't create flights from an airport to itself
      if (i === j) continue;

      const origin = airports[i];
      const destination = airports[j];
      
      // Generate 3-5 flights for this route
      const numFlights = Math.floor(Math.random() * 3) + 3;
      
      for (let k = 0; k < numFlights; k++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const flightNumber = `${airline.name.substring(0, 2).toUpperCase()} ${Math.floor(1000 + Math.random() * 9000)}`;
        
        // Random departure time between 6AM and 10PM
        const departureHour = Math.floor(6 + Math.random() * 16);
        const departureMinute = Math.floor(Math.random() * 60);
        const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
        
        // Flight duration between 1 and 5 hours
        const durationHours = Math.max(1, Math.floor(Math.random() * 5) + Math.floor(Math.random() * 2));
        const durationMinutes = Math.floor(Math.random() * 60);
        
        // Calculate arrival time
        let arrivalHour = departureHour + durationHours;
        let arrivalMinute = departureMinute + durationMinutes;
        if (arrivalMinute >= 60) {
          arrivalHour += 1;
          arrivalMinute -= 60;
        }
        if (arrivalHour >= 24) {
          arrivalHour -= 24;
        }
        const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
        
        // Random price between 120 and 950
        const price = Math.floor(120 + Math.random() * 830);
        
        // Random number of stops (0, 1, or rarely 2)
        const stops = Math.random() < 0.6 ? 0 : Math.random() < 0.9 ? 1 : 2;
        
        // Random amenities
        const amenitiesList = ["WiFi", "Meals", "Entertainment", "Power", "USB", "Legroom+"];
        const numAmenities = Math.floor(1 + Math.random() * 5);
        const selectedAmenities = [];
        for (let a = 0; a < numAmenities; a++) {
          const amenity = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
          if (!selectedAmenities.includes(amenity)) {
            selectedAmenities.push(amenity);
          }
        }
        
        // Random seats available
        const seatsAvailable = Math.floor(1 + Math.random() * 30);
        
        mockFlights.push({
          id: `flight-${origin.code}-${destination.code}-${k}`,
          airline: airline,
          flightNumber: flightNumber,
          departureAirport: origin.code,
          departureCity: origin.city,
          departureTime: departureTime,
          arrivalAirport: destination.code,
          arrivalCity: destination.city,
          arrivalTime: arrivalTime,
          duration: `${durationHours}h ${durationMinutes}m`,
          stops: stops,
          price: price,
          aircraft: Math.random() > 0.5 ? "Boeing 737" : "Airbus A320",
          amenities: selectedAmenities,
          seatsAvailable: seatsAvailable,
        });
      }
    }
  }

  return mockFlights;
};

// Generate all possible flight combinations
const allMockFlights = generateMockFlights();

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("price");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departDate, setDepartDate] = useState<Date | null>(null);
  
  // Get unique airlines from the flight data
  const airlines = [...new Set(allMockFlights.map(flight => flight.airline.name))];
  
  useEffect(() => {
    const filterFlights = () => {
      // Get search params from URL or localStorage
      const searchParams = new URLSearchParams(location.search);
      const origin = searchParams.get('origin') || localStorage.getItem('searchOrigin') || "";
      const destination = searchParams.get('destination') || localStorage.getItem('searchDestination') || "";
      
      console.log("Search params:", { origin, destination });
      
      setOrigin(origin);
      setDestination(destination);

      // Filter flights based on origin and destination
      let filteredResults = [...allMockFlights];

      if (origin) {
        filteredResults = filteredResults.filter(flight => 
          flight.departureAirport === origin
        );
      }

      if (destination) {
        filteredResults = filteredResults.filter(flight => 
          flight.arrivalAirport === destination
        );
      }

      // If we have a specific departure date from URL or localStorage, just set it for display
      const departDateString = searchParams.get('departDate') || localStorage.getItem('searchDepartDate');
      if (departDateString) {
        try {
          const date = new Date(departDateString);
          setDepartDate(date);
        } catch (e) {
          console.error('Invalid date format:', e);
        }
      }

      // Set min/max price range based on filtered results
      if (filteredResults.length > 0) {
        const minPrice = Math.min(...filteredResults.map(flight => flight.price));
        const maxPrice = Math.max(...filteredResults.map(flight => flight.price)) + 50; // Add a buffer
        setPriceRange([minPrice, maxPrice]);
      }

      return filteredResults;
    };

    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = filterFlights();
      setFlights(filteredResults);
      setFilteredFlights(filteredResults);
      setLoading(false);
    }, 1000);
  }, [location.search]);
  
  useEffect(() => {
    let results = [...flights];
    
    // Apply price filter
    results = results.filter(flight => 
      flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );
    
    // Apply airline filter
    if (selectedAirlines.length > 0) {
      results = results.filter(flight => 
        selectedAirlines.includes(flight.airline.name)
      );
    }
    
    // Apply stops filter
    if (selectedStops.length > 0) {
      results = results.filter(flight => 
        selectedStops.includes(flight.stops)
      );
    }
    
    // Apply sorting
    if (sortBy === "price") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "duration") {
      results.sort((a, b) => {
        const durationA = parseInt(a.duration.split('h')[0]);
        const durationB = parseInt(b.duration.split('h')[0]);
        return durationA - durationB;
      });
    } else if (sortBy === "departure") {
      results.sort((a, b) => {
        const timeA = parseInt(a.departureTime.replace(':', ''));
        const timeB = parseInt(b.departureTime.replace(':', ''));
        return timeA - timeB;
      });
    } else if (sortBy === "arrival") {
      results.sort((a, b) => {
        const timeA = parseInt(a.arrivalTime.replace(':', ''));
        const timeB = parseInt(b.arrivalTime.replace(':', ''));
        return timeA - timeB;
      });
    }
    
    setFilteredFlights(results);
  }, [flights, priceRange, sortBy, selectedAirlines, selectedStops]);
  
  const handleAirlineToggle = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline)
        ? prev.filter(a => a !== airline)
        : [...prev, airline]
    );
  };
  
  const handleStopsToggle = (stops: number) => {
    setSelectedStops(prev => 
      prev.includes(stops)
        ? prev.filter(s => s !== stops)
        : [...prev, stops]
    );
  };
  
  const resetFilters = () => {
    if (flights.length > 0) {
      const minPrice = Math.min(...flights.map(flight => flight.price));
      const maxPrice = Math.max(...flights.map(flight => flight.price));
      setPriceRange([minPrice, maxPrice]);
    } else {
      setPriceRange([0, 1000]);
    }
    setSelectedAirlines([]);
    setSelectedStops([]);
    setSortBy("price");
  };
  
  const handleFlightSelect = (flight: Flight) => {
    // Store the selected flight in localStorage
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    navigate('/booking');
  };
  
  // Find min and max prices from filtered flights
  const minPrice = flights.length > 0 ? Math.min(...flights.map(flight => flight.price)) : 0;
  const maxPrice = flights.length > 0 ? Math.max(...flights.map(flight => flight.price)) : 1000;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Search Results Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Flight Search Results</h1>
              <p className="text-gray-600">
                {origin && destination ? (
                  <>
                    {origin} to {destination}
                    {departDate && `, ${format(departDate, 'MMM dd, yyyy')}`}
                  </>
                ) : (
                  'All Flights'
                )}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Sliders size={16} />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <div className="flex items-center gap-1">
                    <ArrowUpDown size={14} />
                    <span>Sort by:</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="price">Price (Lowest First)</SelectItem>
                    <SelectItem value="duration">Duration (Shortest First)</SelectItem>
                    <SelectItem value="departure">Departure (Earliest First)</SelectItem>
                    <SelectItem value="arrival">Arrival (Earliest First)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Only visible on large screens or when showFilters is true */}
          {(showFilters || window.innerWidth >= 1024) && (
            <div className="w-full lg:w-72 lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-sm flex items-center gap-1 text-gray-600 hover:text-purple-600"
                  >
                    <FilterX size={14} />
                    Reset
                  </Button>
                </div>
                
                <Accordion type="multiple" className="w-full" defaultValue={["price", "airlines", "stops"]}>
                  {/* Price Filter */}
                  <AccordionItem value="price">
                    <AccordionTrigger className="py-3 text-base">Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="py-2">
                        <Slider 
                          value={priceRange}
                          min={minPrice}
                          max={maxPrice}
                          step={10}
                          onValueChange={setPriceRange}
                          className="my-6"
                        />
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">${priceRange[0]}</span>
                          <span className="text-sm font-medium text-gray-700">${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Airlines Filter */}
                  <AccordionItem value="airlines">
                    <AccordionTrigger className="py-3 text-base">Airlines</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {airlines.map((airline) => (
                          <div key={airline} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`airline-${airline}`}
                              checked={selectedAirlines.includes(airline)}
                              onCheckedChange={() => handleAirlineToggle(airline)}
                            />
                            <label 
                              htmlFor={`airline-${airline}`}
                              className="text-sm cursor-pointer"
                            >
                              {airline}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Stops Filter */}
                  <AccordionItem value="stops">
                    <AccordionTrigger className="py-3 text-base">Stops</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="direct" 
                            checked={selectedStops.includes(0)} 
                            onCheckedChange={() => handleStopsToggle(0)}
                          />
                          <label htmlFor="direct" className="text-sm cursor-pointer">Direct</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="one-stop" 
                            checked={selectedStops.includes(1)} 
                            onCheckedChange={() => handleStopsToggle(1)}
                          />
                          <label htmlFor="one-stop" className="text-sm cursor-pointer">1 Stop</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="two-stops" 
                            checked={selectedStops.includes(2)} 
                            onCheckedChange={() => handleStopsToggle(2)}
                          />
                          <label htmlFor="two-stops" className="text-sm cursor-pointer">2+ Stops</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Times Filter */}
                  <AccordionItem value="times">
                    <AccordionTrigger className="py-3 text-base">Times</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="text-sm font-medium mb-1">Departure</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="text-xs">Morning</Button>
                          <Button variant="outline" size="sm" className="text-xs">Afternoon</Button>
                          <Button variant="outline" size="sm" className="text-xs">Evening</Button>
                          <Button variant="outline" size="sm" className="text-xs">Night</Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}
          
          {/* Main Content - Flight Results */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Searching for the best flights...</p>
              </div>
            ) : (
              <>
                {filteredFlights.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-600 mb-4">{filteredFlights.length} flights found</p>
                    {filteredFlights.map((flight) => (
                      <FlightCard key={flight.id} flight={flight} onSelect={handleFlightSelect} />
                    ))}
                  </>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters to find more flight options.</p>
                    <Button onClick={resetFilters} className="bg-purple-600 hover:bg-purple-700 text-white">Reset Filters</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
