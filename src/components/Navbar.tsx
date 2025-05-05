
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Globe, Search, Headphones, LogIn, LogOut, Plane } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on component mount or route change
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
                WanderlustWings
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-gray-700 hover:text-purple-600 font-medium flex items-center ${isActive('/') ? 'text-purple-600' : ''}`}>
              <Plane size={16} className="mr-1" /> Find Flights
            </Link>
            <Link to="/bookings" className={`text-gray-700 hover:text-purple-600 font-medium flex items-center ${isActive('/bookings') ? 'text-purple-600' : ''}`}>
              <User size={16} className="mr-1" /> My Trips
            </Link>
            <Link to="/help" className={`text-gray-700 hover:text-purple-600 font-medium flex items-center ${isActive('/help') ? 'text-purple-600' : ''}`}>
              <Headphones size={16} className="mr-1" /> Support
            </Link>
            
            {userInfo ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                    <User size={16} className="mr-2" /> {userInfo.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookings')}>
                    My Trips
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                    <LogIn size={16} className="mr-1" /> Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-purple-600 font-medium px-2 py-1 ${isActive('/') ? 'text-purple-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Plane size={16} className="mr-2" /> Find Flights
                </div>
              </Link>
              <Link 
                to="/bookings" 
                className={`text-gray-700 hover:text-purple-600 font-medium px-2 py-1 ${isActive('/bookings') ? 'text-purple-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <User size={16} className="mr-2" /> My Trips
                </div>
              </Link>
              <Link 
                to="/help" 
                className={`text-gray-700 hover:text-purple-600 font-medium px-2 py-1 ${isActive('/help') ? 'text-purple-600' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Headphones size={16} className="mr-2" /> Support
                </div>
              </Link>
              
              {userInfo ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-purple-600 font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2" /> {userInfo.name}'s Profile
                    </div>
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-purple-600 font-medium px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2" /> Dashboard
                    </div>
                  </Link>
                  <div 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-500 hover:text-red-600 font-medium px-2 py-1 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" /> Log Out
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-2 flex flex-col space-y-2">
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-purple-500 text-purple-600">
                      <LogIn size={16} className="mr-1" /> Sign In
                    </Button>
                  </Link>
                  <Link 
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
