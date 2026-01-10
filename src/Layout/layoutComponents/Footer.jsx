import React from 'react';
import { FaFacebook, FaTwitter, FaGooglePlus, FaYoutube, FaLinkedin, FaInstagram, FaApple, FaRss } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-8">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Contact Us Section */}
                    <div className="md:col-span-3">
                        <div className="footer-widget">
                            <h4 className="footer-widget-title text-lg font-bold mb-4">Contact Us</h4>
                            <p className="text-sm">Phone: 0171062308 <br /> Email: binachristina143@gmail.com</p>
                        </div>
                    </div>
                    
                    {/* Resources For Section */}
                    <div className="md:col-span-2">
                        <div className="footer-widget">
                            <h4 className="footer-widget-title text-lg font-bold mb-4">Resources For</h4>
                            <ul className="space-y-2">
                                <li><a href="/Home/GoverningBody" className="link link-hover text-sm">Governing Body</a></li>
                                <li><a href="/Home/TeacherInformation" className="link link-hover text-sm">Teacher Information</a></li>
                                <li><a href="/Home/StaffInformation" className="link link-hover text-sm">Staff Information</a></li>
                                <li><a href="/Home/JobAndVacancy" className="link link-hover text-sm">Job and Vacancy</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Other Page Links Section */}
                    <div className="md:col-span-2">
                        <div className="footer-widget">
                            <h4 className="footer-widget-title text-lg font-bold mb-4">Other Page Link</h4>
                            <ul className="space-y-2">
                                <li><a href="https://moedu.gov.bd/" target="_blank" rel="noopener noreferrer" className="link link-hover text-sm">Ministry of Education</a></li>
                                <li><a href="http://www.nubd.info/" target="_blank" rel="noopener noreferrer" className="link link-hover text-sm">National University</a></li>
                                <li><a href="https://dhakaeducationboard.gov.bd/" target="_blank" rel="noopener noreferrer" className="link link-hover text-sm">Dhaka Education Board</a></li>
                                <li><a href="http://www.educationboardresults.gov.bd/" target="_blank" rel="noopener noreferrer" className="link link-hover text-sm">Education Board Result</a></li>
                                <li><a href="https://www.prothomalo.com/" target="_blank" rel="noopener noreferrer" className="link link-hover text-sm">Prothom Alo</a></li>
                                <li><a href="https://www.jugantor.com/" target="_blank" rel="noopener noreferrer" className="link link-hover text-sm">Jugantor</a></li>
                                <li><a href="http://www.dailynayadiganta.com/" target="_blank" rel="noopener noreferrer" className="link link-hover text-sm">Daily Nayadiganta</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Study Section */}
                    <div className="md:col-span-2">
                        <div className="footer-widget">
                            <h4 className="footer-widget-title text-lg font-bold mb-4">Study</h4>
                            <ul className="space-y-2">
                                <li><a href="/Home/AdmissionOnline" className="link link-hover text-sm">Apply Now</a></li>
                                <li><a href="#" className="link link-hover text-sm">Applying Instruction</a></li>
                                <li><a href="/Home/OnlineAdmissionPrint" className="link link-hover text-sm">Print Admit Card</a></li>
                                <li><a href="#" className="link link-hover text-sm">Scholarships</a></li>
                                <li><a href="/Home/SchoolResult" className="link link-hover text-sm">Student Result</a></li>
                                <li><a href="/Home/FAQ" className="link link-hover text-sm">FAQs</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Social Media Icons */}
                    <div className="md:col-span-3">
                        <div className="footer-widget">
                            <h4 className="footer-widget-title text-lg font-bold mb-4">Follow Us</h4>
                            <div className="flex flex-wrap gap-3">
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaFacebook />
                                </a>
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaGooglePlus />
                                </a>
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaYoutube />
                                </a>
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaLinkedin />
                                </a>
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaApple />
                                </a>
                                <a href="#" className="btn btn-circle btn-sm btn-primary text-white">
                                    <FaRss />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Footer */}
                <div className="divider mt-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">© Copyright 2026. Designed & Developed by <a href="#" target="_blank" className="link link-primary">Mimona Akter</a></p>
                    </div>
                    <div>
                        <ul className="flex flex-wrap gap-4">
                            <li><a href="/" className="link link-hover text-sm">Home</a></li>
                            <li><a href="/Home/About" className="link link-hover text-sm">About Us</a></li>
                            <li><a href="/Home/AdmissionOnline" className="link link-hover text-sm">Admission</a></li>
                            <li><a href="/Home/GoverningBody" className="link link-hover text-sm">Administration</a></li>
                            <li><a href="/Home/PhotoCategoryGallery" className="link link-hover text-sm">Gallery</a></li>
                            <li><a href="/Home/Contact" className="link link-hover text-sm">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;