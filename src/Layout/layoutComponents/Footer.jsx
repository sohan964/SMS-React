import React from 'react';
import { FaFacebook, FaTwitter, FaGooglePlus, FaYoutube, FaLinkedin, FaInstagram, FaApple, FaRss } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 mt-8">
  <div className="max-w-7xl mx-auto px-4 py-10">

    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

      {/* CONTACT */}
      <div className="md:col-span-3">
        <h4 className="text-white font-semibold mb-3">Contact Us</h4>
        <p className="text-sm text-slate-400">
          Phone: 0171062308 <br />
          Email: binachristina143@gmail.com
        </p>
      </div>

      {/* RESOURCES */}
      <div className="md:col-span-2">
        <h4 className="text-white font-semibold mb-3">Resources</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">Governing Body</a></li>
          <li><a href="#" className="hover:text-white transition">Teacher Info</a></li>
          <li><a href="#" className="hover:text-white transition">Staff Info</a></li>
          <li><a href="#" className="hover:text-white transition">Jobs</a></li>
        </ul>
      </div>

      {/* LINKS */}
      <div className="md:col-span-2">
        <h4 className="text-white font-semibold mb-3">Useful Links</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="https://moedu.gov.bd/" className="hover:text-white transition">Ministry</a></li>
          <li><a href="http://www.nubd.info/" className="hover:text-white transition">National University</a></li>
          <li><a href="https://dhakaeducationboard.gov.bd/" className="hover:text-white transition">Education Board</a></li>
        </ul>
      </div>

      {/* STUDY */}
      <div className="md:col-span-2">
        <h4 className="text-white font-semibold mb-3">Study</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition">Apply Now</a></li>
          <li><a href="#" className="hover:text-white transition">Instructions</a></li>
          <li><a href="#" className="hover:text-white transition">Results</a></li>
        </ul>
      </div>

      {/* SOCIAL */}
      <div className="md:col-span-3">
        <h4 className="text-white font-semibold mb-3">Follow Us</h4>

        <div className="flex gap-3 flex-wrap">
          {[FaFacebook, FaTwitter, FaYoutube, FaLinkedin, FaInstagram].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-gradient-to-r from-blue-500 to-indigo-500 transition"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

    </div>

    {/* BOTTOM */}
    <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

      <p className="text-sm text-slate-400 text-center md:text-left">
        © 2026. Designed & Developed by{" "}
        <span className="text-blue-400">Mimona Akter</span>
      </p>

      <div className="flex flex-wrap gap-4 text-sm">
        <a href="/" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">About</a>
        <a href="#" className="hover:text-white transition">Admission</a>
        <a href="#" className="hover:text-white transition">Gallery</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </div>
     </div>
    </div>
</footer>
    );
};

export default Footer;