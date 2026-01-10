import React, { useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaQuestionCircle, FaFileAlt, FaHeadset } from 'react-icons/fa';

const ContactUs = () => {
  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBJavNFx9hoyhmOk8q1ijE_eZUR_BEosj8&libraries=places&callback=initMap';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize map function
    window.initMap = function() {
      const latitude = 24.07769324;
      const longitude = 90.20985167;
      const address = "St. Marys Girls High School And College";
      
      const myLatLng = { lat: latitude, lng: longitude };
      const map = new window.google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: myLatLng,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }]
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9c9c9c" }]
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [{ visibility: "on" }]
          }
        ]
      });
      
      new window.google.maps.Marker({
        position: myLatLng,
        map: map,
        title: address,
        animation: window.google.maps.Animation.DROP
      });
    };

    return () => {
      document.body.removeChild(script);
      delete window.initMap;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-sm">
          <a href="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</a>
          <span className="text-gray-500">/</span>
          <span className="text-gray-700 font-medium">Contact</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Google Map */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div id="map-canvas" className="w-full h-[542px]"></div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact With Us</h2>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-gray-700">
                    Call <span className="font-bold text-blue-600">0171062308</span>. Available time 
                    <span className="font-bold text-blue-600"> 10:00 AM</span> to 
                    <span className="font-bold text-blue-600"> 5:00 PM</span>. Call Us for any query.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* School Name */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">St. Marys Girls High School And College</h3>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">Gazipur, Bangladesh</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">0171062308</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaEnvelope className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600 lowercase">binachristina143@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Still have questions?</h2>
            <p className="text-gray-600 text-lg">We're here to help you with any questions you might have</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Help Center */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaHeadset className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Help Center</h3>
              <p className="text-gray-600 mb-4">
                Call <span className="font-bold text-blue-600">0171062308</span>. Available time 
                <span className="font-bold text-blue-600"> 10:00 AM</span> to 
                <span className="font-bold text-blue-600"> 5:00 PM</span>. Call Us for any query.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors">
                Get Help
              </button>
            </div>

            {/* FAQ */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaQuestionCircle className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">FAQ's</h3>
              <p className="text-gray-600 mb-4">
                Here you will find out most frequently asked questions about our Institution. So, any query please try this out.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors">
                View FAQ
              </button>
            </div>

            {/* Technical Documents */}
            <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaFileAlt className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Technical Documents</h3>
              <p className="text-gray-600 mb-4">
                Here you will find documents related to our institution. Feel free to see our information.
              </p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors">
                View Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
