import React from 'react';
import { FaGraduationCap, FaBook, FaUsers, FaAward, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Welcome to St. Mary's</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Empowering young women through quality education since 1995
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* <button className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-none">
                            Explore Programs
                        </button>
                        <button className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-blue-600">
                            Schedule a Visit
                        </button> */}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Choose St. Mary's?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">
                                    <FaGraduationCap />
                                </div>
                                <h3 className="card-title text-xl mb-2">Quality Education</h3>
                                <p className="text-gray-600">Comprehensive curriculum designed to foster critical thinking and innovation</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">
                                    <FaUsers />
                                </div>
                                <h3 className="card-title text-xl mb-2">Expert Faculty</h3>
                                <p className="text-gray-600">Dedicated teachers committed to nurturing each student's potential</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">
                                    <FaAward />
                                </div>
                                <h3 className="card-title text-xl mb-2">Excellence</h3>
                                <p className="text-gray-600">Proven track record of academic achievements and success stories</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">
                                    <FaBook />
                                </div>
                                <h3 className="card-title text-xl mb-2">Resources</h3>
                                <p className="text-gray-600">State-of-the-art facilities and extensive learning materials</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-16 px-4 bg-blue-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Programs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-2xl text-blue-600 mb-4">Primary School</h3>
                                <p className="text-gray-600 mb-4">Building strong foundations for lifelong learning with child-centered approaches.</p>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Age-appropriate curriculum</li>
                                    <li>• Creative learning activities</li>
                                    <li>• Small class sizes</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-2xl text-blue-600 mb-4">High School</h3>
                                <p className="text-gray-600 mb-4">Comprehensive secondary education preparing students for higher studies.</p>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Science & Arts streams</li>
                                    <li>• Advanced technology integration</li>
                                    <li>• Extracurricular activities</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-2xl text-blue-600 mb-4">College</h3>
                                <p className="text-gray-600 mb-4">Higher secondary education with specialized subjects for career preparation.</p>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Specialized subject focus</li>
                                    <li>• Career counseling</li>
                                    <li>• University preparation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Achievements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">1500+</div>
                            <div className="text-lg">Students</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                            <div className="text-lg">Teachers</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                            <div className="text-lg">Success Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">28</div>
                            <div className="text-lg">Years of Excellence</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-blue-600">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="text-blue-600 mt-1">
                                        <FaMapMarkerAlt className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Address</h4>
                                        <p className="text-gray-600">Kaligonj - Gazipur, Bangladesh</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-blue-600 mt-1">
                                        <FaPhone className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Phone</h4>
                                        <p className="text-gray-600">+880 1234 567890</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-blue-600 mt-1">
                                        <FaEnvelope className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Email</h4>
                                        <p className="text-gray-600">info@stmarys.edu.bd</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-blue-600 mt-1">
                                        <FaClock className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Office Hours</h4>
                                        <p className="text-gray-600">Sunday - Thursday: 8:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600">Friday & Saturday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-blue-600">Send us a Message</h3>
                            <form className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your name" className="input input-bordered w-full" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Your email" className="input input-bordered w-full" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Message</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered h-32" placeholder="Your message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} St. Mary's Girls High School And College. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;