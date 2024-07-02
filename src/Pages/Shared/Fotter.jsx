import React, { useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <footer className="bg-gray-900 text-white py-8 " data-aos="fade-up"
    >
      <div className="container mx-auto px-4"  >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Learn Together</h3>
            <p className="text-gray-400">
              Learn Together is a platform dedicated to providing high-quality educational resources and fostering a collaborative learning environment for students and teachers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li className="mb-2"><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li className="mb-2"><a href="/course" className="text-gray-400 hover:text-white">Sessions</a></li>
              <li className="mb-2"><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400">123 Learning St.</p>
            <p className="text-gray-400">Education City, EC 12345</p>
            <p className="text-gray-400">Email: info@learntogether.com</p>
            <p className="text-gray-400">Phone: +880 1908-945145</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400">&copy; 2024 Learn Together. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
