import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Dr. Priya Sharma', role: 'Chief Dental Officer', img: 'https://i.pravatar.cc/200?img=47' },
  { name: 'Dr. Rajan Mehta', role: 'Oral Surgeon', img: 'https://i.pravatar.cc/200?img=68' },
  { name: 'Dr. Anita Rao', role: 'Cosmetic Dentist', img: 'https://i.pravatar.cc/200?img=49' },
  { name: 'Dr. Vikram Singh', role: 'Orthodontist', img: 'https://i.pravatar.cc/200?img=12' },
];

const stats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '10K+', label: 'Happy Patients' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '20+', label: 'Expert Specialists' },
];

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="antialiased text-gray-900 bg-[#fbfbfb]">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 px-6 transition-all duration-350 ${scrolled ? 'py-4 bg-transparent' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className={`text-2xl font-bold flex items-center gap-2 drop-shadow-md transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            <i className={`ph-fill ph-tooth inline-block -rotate-12 transition-colors duration-300 ${scrolled ? 'text-brand-dark' : 'text-white'}`}></i> Sunrise Dental
          </Link>

          <div className={`hidden md:flex items-center gap-8 px-8 py-3 rounded-full text-sm border transition-all duration-300 ${scrolled
            ? 'bg-white/40 backdrop-blur-md border-gray-200/50 text-gray-900 shadow-sm'
            : 'bg-white/20 backdrop-blur-md border-white/30 text-white'
            }`}>
            <Link to="/" className="hover:opacity-80 font-medium">Home</Link>
            <Link to="/about" className="font-semibold opacity-100">About</Link>
            <Link to="/services" className="hover:opacity-80 font-medium">Services</Link>
            <Link to="/login" className="hover:opacity-80 font-medium">Staff Login</Link>
          </div>

          <a href="#" className={`px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition shadow-lg ${scrolled
            ? 'bg-brand-dark text-white hover:bg-gray-800'
            : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}>
            <i className="ph ph-phone"></i> Call Now
          </a>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-[70vh] m-4 rounded-[2.5rem] overflow-hidden">
        <img src="https://plus.unsplash.com/premium_photo-1682097288491-7e926a30cd0b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="About Us" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pb-10">
          <span className="uppercase tracking-widest text-xs text-white/70 font-semibold mb-4 block">[about us]</span>
          <h1 className="text-6xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
            Caring For<br />Your Smile
          </h1>
          <p className="text-white/90 mt-6 max-w-md text-lg">
            Founded in 2010, Sunrise Dental has been a trusted name in modern dental care. We combine advanced technology with a compassionate team to deliver results that last a lifetime.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-5xl font-bold mb-2">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <span className="uppercase tracking-widest text-xs text-gray-400 font-semibold mb-6 block border-b border-gray-200 pb-2 inline-block">[our story]</span>
            <h2 className="text-5xl font-semibold leading-tight mb-6">A Practice Built on Trust</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sunrise Dental was founded with a single mission: to make high-quality dental care accessible, comfortable, and fear-free. We started as a small family clinic and have grown into a multi-specialty center trusted by thousands.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every member of our team shares a passion for patient well-being. From your first visit to ongoing care, we are committed to building a relationship you can rely on for years to come.
            </p>
            <Link to="/services" className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition">
              Explore Our Services <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
              alt="Our clinic"
              className="w-full h-[480px] object-cover rounded-[3rem]"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[#f5f5f5] rounded-[3rem] mx-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <span className="uppercase tracking-widest text-xs text-gray-400 font-semibold mb-6 block">[our values]</span>
          <h2 className="text-5xl font-semibold mb-16 max-w-lg">What Guides Everything We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'ph-heart', title: 'Patient First', desc: 'Every decision we make is centred around your comfort and health. We listen before we treat.' },
              { icon: 'ph-shield-check', title: 'Clinical Excellence', desc: 'Our team pursues the highest standards in dentistry through continuous education and cutting-edge equipment.' },
              { icon: 'ph-hand-heart', title: 'Compassionate Care', desc: 'We understand dental anxiety and create a calming, welcoming environment for every patient.' },
            ].map((v) => (
              <div key={v.title} className="bg-white p-10 rounded-[2rem]">
                <div className="w-14 h-14 bg-[#0f2f63]/10 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`ph ${v.icon} text-[#0f2f63] text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="uppercase tracking-widest text-xs text-gray-400 font-semibold mb-6 block">[our team]</span>
          <h2 className="text-5xl font-semibold mb-16">Meet The Experts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="group">
                <div className="overflow-hidden rounded-[2rem] mb-4">
                  <img src={m.img} alt={m.name} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <h4 className="font-semibold">{m.name}</h4>
                <p className="text-gray-500 text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="m-4 bg-[#0f2f63] text-white rounded-[3rem] p-16 text-center mb-12">
        <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-white/70 mb-10 max-w-md mx-auto">Book your first appointment today and experience dentistry the way it should be — gentle, modern, and patient-focused.</p>
        <Link to="/" className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
          Back to Home <i className="ph ph-arrow-right"></i>
        </Link>
      </section>

      <footer className="py-8 px-6 text-center text-xs text-gray-400">
        © 2026 Sunrise Dental. All rights reserved.
      </footer>
    </div>
  );
}
