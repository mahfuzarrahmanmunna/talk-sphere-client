import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul>
                        <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
                        <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-gray-400">Email: mdmahfuzarrahmanmunna44@gmail.com</p>
                    <p className="text-gray-400">Phone: +880 1314181695</p>
                </div>

                {/* Social Media Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=61558381851640" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://x.com/mahfuzar_m35559" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://wa.me/01314181695" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <FaWhatsapp size={24} />
                        </a>
                        <a href="https://github.com/mahfuzarrahmanmunna" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="col-span-1 md:col-span-3 lg:col-span-4 text-center md:text-left">
                    <p className="text-sm text-center text-gray-400 mt-4">&copy; {new Date().getFullYear()} TalkSphere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
