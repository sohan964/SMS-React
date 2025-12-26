import React from 'react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">St. Mary's Girls High School And College</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Excellence in Education, Empowering Young Women
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg">Kaligonj, Gazipur, Bangladesh</span>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Mission</h2>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            At St. Mary's Girls High School And College, we are committed to providing quality education that empowers young women to become confident, compassionate, and capable leaders. We strive to create an inclusive learning environment that fosters academic excellence, critical thinking, and moral values.
                        </p>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-16 px-4 bg-blue-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our History</h2>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Established with a vision to transform girls' education in Bangladesh, St. Mary's Girls High School And College has been a beacon of knowledge and empowerment in Kaligonj, Gazipur for decades. Our institution has grown from a humble beginning to a renowned educational center that has shaped countless young minds.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">📚</div>
                                <h3 className="card-title text-xl mb-2">Academic Excellence</h3>
                                <p className="text-gray-600">Committed to highest standards of teaching and learning</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">🌟</div>
                                <h3 className="card-title text-xl mb-2">Character Development</h3>
                                <p className="text-gray-600">Nurturing integrity, discipline, and moral values</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">🤝</div>
                                <h3 className="card-title text-xl mb-2">Community Service</h3>
                                <p className="text-gray-600">Encouraging social responsibility and civic engagement</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">💡</div>
                                <h3 className="card-title text-xl mb-2">Innovation</h3>
                                <p className="text-gray-600">Embracing new educational methods and technologies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="py-16 px-4 bg-blue-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Facilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-blue-600 mb-2">🏫 Modern Classrooms</h3>
                                <p className="text-gray-600">Well-equipped, spacious classrooms with modern teaching aids</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-blue-600 mb-2">🔬 Science Laboratories</h3>
                                <p className="text-gray-600">State-of-the-art labs for practical learning in sciences</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-blue-600 mb-2">📖 Library</h3>
                                <p className="text-gray-600">Extensive collection of books, journals, and digital resources</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-blue-600 mb-2">💻 Computer Lab</h3>
                                <p className="text-gray-600">Modern computing facilities for digital literacy</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-blue-600 mb-2">🏃 Sports Facilities</h3>
                                <p className="text-gray-600">Grounds and equipment for various sports and physical activities</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title text-xl text-blue-600 mb-2">🎭 Cultural Spaces</h3>
                                <p className="text-gray-600">Areas for cultural activities, arts, and performances</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">🏆</div>
                                <h3 className="card-title text-lg mb-2">Academic Excellence</h3>
                                <p className="text-gray-600">Consistently outstanding results in board examinations</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">🎓</div>
                                <h3 className="card-title text-lg mb-2">University Admissions</h3>
                                <p className="text-gray-600">High placement rates in prestigious universities</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">🏅</div>
                                <h3 className="card-title text-lg mb-2">Sports & Competitions</h3>
                                <p className="text-gray-600">Excellence in inter-school sports and academic competitions</p>
                            </div>
                        </div>
                        <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body text-center">
                                <div className="text-4xl text-blue-600 mb-4">🌟</div>
                                <h3 className="card-title text-lg mb-2">Community Impact</h3>
                                <p className="text-gray-600">Recognized for contributions to community development</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-16 px-4 bg-blue-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Leadership</h2>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Under the guidance of dedicated administrators and experienced educators, St. Mary's Girls High School And College continues to uphold its tradition of excellence while embracing innovation in education. Our leadership team is committed to creating an environment where every student can thrive academically, socially, and personally.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Contact Us</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="card bg-white shadow-lg">
                            <div className="card-body">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl text-blue-600 mb-2">📍</div>
                                        <h3 className="font-semibold text-lg mb-2">Address</h3>
                                        <p className="text-gray-600">St. Mary's Girls High School And College<br />Kaligonj, Gazipur<br />Bangladesh</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl text-blue-600 mb-2">📧</div>
                                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                                        <p className="text-gray-600">info@stmarysgazipur.edu.bd</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl text-blue-600 mb-2">📞</div>
                                        <h3 className="font-semibold text-lg mb-2">Phone</h3>
                                        <p className="text-gray-600">+880 XXXX-XXXXXX</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;