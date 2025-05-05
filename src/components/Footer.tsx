
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, CreditCard, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">WanderlustWings</h3>
            <p className="text-sm mb-4">
              Your trusted partner for hassle-free flight booking experiences worldwide. Connecting you to destinations across the globe.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">123 Travel Plaza, Skyview City</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">support@wanderlustwings.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/search" className="hover:text-white transition-colors">Search Flights</Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-white transition-colors">My Bookings</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">Popular Destinations</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-white transition-colors">Special Offers</Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">Help & Support</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">Flight Booking</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-white transition-colors">Aircraft Fleet</Link>
              </li>
              <li>
                <Link to="/group-booking" className="hover:text-white transition-colors">Group Travel</Link>
              </li>
              <li>
                <Link to="/frequent-flyer" className="hover:text-white transition-colors">Frequent Flyer Program</Link>
              </li>
              <li>
                <Link to="/business-travel" className="hover:text-white transition-colors">Business Travel</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for travel tips and exclusive deals.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 w-full rounded-l-md text-gray-900 text-sm focus:outline-none"
              />
              <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-r-md text-white text-sm transition-colors">
                Subscribe
              </button>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3 text-white">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-8 py-4 border-t border-b border-gray-700">
          <div className="flex items-center">
            <Shield size={20} className="text-purple-400 mr-2" />
            <span className="text-sm">Secure Payments</span>
          </div>
          <div className="flex items-center">
            <CreditCard size={20} className="text-purple-400 mr-2" />
            <span className="text-sm">Multiple Payment Options</span>
          </div>
          <div className="flex items-center">
            <div className="bg-purple-400 rounded-full h-5 w-5 flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-gray-900">24</span>
            </div>
            <span className="text-sm">24/7 Customer Support</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-sm pt-6 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} WanderlustWings. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
