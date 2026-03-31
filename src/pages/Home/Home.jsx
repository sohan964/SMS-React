import React from 'react';
import {
  FaGraduationCap,
  FaBook,
  FaUsers,
  FaAward,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section
        className="relative h-screen flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('https://content.jdmagicbox.com/comp/ghazipur/i4/9999px548.x548.171002105045.b9i4/catalogue/st-mary-s-convent-school-tulsipur-kacheri-ghazipur-convent-schools-HiAus28vjP.jpg')" }}
      >
        {/* LIGHT OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            St. Mary's School & College
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Building future leaders with knowledge, discipline, and innovation.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition">
              Explore Programs
            </button>

            <a href='/contact-us' className="border border-white px-6 py-3 rounded-lg text-lg hover:bg-white hover:text-black transition">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 px-4 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6">Welcome to Our Institution</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          We provide a balanced education system combining academic excellence,
          moral values, and extracurricular activities to prepare students for the future.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

          {[
            { icon: <FaGraduationCap />, title: "Quality Education" },
            { icon: <FaUsers />, title: "Expert Teachers" },
            { icon: <FaAward />, title: "Achievements" },
            { icon: <FaBook />, title: "Library & Labs" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition"
            >
              <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          ))}

        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {["Primary", "High School", "College"].map((title, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-3">
                {title}
              </h3>
              <p className="text-gray-600">
                High-quality education designed for student success.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {["1500+ Students", "100+ Teachers", "95% Success", "28 Years"].map((item, i) => (
            <div key={i} className="text-2xl font-bold">{item}</div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <p><FaMapMarkerAlt /> Kaligonj, Gazipur</p>
            <p><FaPhone /> +880123456789</p>
            <p><FaEnvelope /> info@school.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Send Message</h3>
            <input className="input input-bordered w-full mb-2" placeholder="Name" />
            <input className="input input-bordered w-full mb-2" placeholder="Email" />
            <textarea className="textarea textarea-bordered w-full mb-2" placeholder="Message"></textarea>
            <button className="btn btn-primary w-full">Send</button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;