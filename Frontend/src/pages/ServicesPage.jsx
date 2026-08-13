import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: 'ph-tooth',
    title: 'Cavity Protection',
    color: 'bg-brand-yellow',
    desc: 'Comprehensive cavity detection and prevention plans tailored to your dental health, including sealants, fluoride treatments, and dietary guidance.',
    detail: ['Digital X-rays', 'Fluoride Treatment', 'Fissure Sealants', 'Diet Counselling'],
  },
  {
    icon: 'ph-first-aid',
    title: 'Oral Surgery',
    color: 'bg-brand-blue',
    desc: 'Safe and precise surgical procedures performed by experienced oral surgeons using the latest techniques to minimise discomfort and recovery time.',
    detail: ['Wisdom Tooth Removal', 'Dental Implants', 'Bone Grafting', 'Biopsy'],
  },
  {
    icon: 'ph-sparkle',
    title: 'Teeth Whitening',
    color: 'bg-brand-purple',
    desc: 'Professional in-chair and take-home whitening systems that are safe, effective, and deliver noticeably brighter results in just one session.',
    detail: ['In-Chair Whitening', 'Custom Trays', 'Stain Removal', 'Sensitivity-Free Options'],
  },
  {
    icon: 'ph-align-center-horizontal',
    title: 'Orthodontics',
    color: 'bg-brand-green',
    desc: 'From traditional braces to clear aligners, our orthodontic team creates beautiful, healthy smiles for children, teenagers, and adults.',
    detail: ['Clear Aligners', 'Metal Braces', 'Ceramic Braces', 'Retainers'],
  },
  {
    icon: 'ph-shield-check',
    title: 'Root Canal',
    color: 'bg-[#FFF0F0]',
    desc: 'Pain-free root canal therapy using rotary instruments and apex locators to save infected teeth efficiently with minimal discomfort.',
    detail: ['Single-Visit RCT', 'Retreatment', 'Post & Core Buildup', 'Crown Restoration'],
  },
  {
    icon: 'ph-smiley',
    title: 'Cosmetic Dentistry',
    color: 'bg-[#F0F4FF]',
    desc: 'Transform your smile with veneers, bonding, and smile makeovers designed to enhance your natural features and boost your confidence.',
    detail: ['Porcelain Veneers', 'Composite Bonding', 'Smile Makeover', 'Gum Contouring'],
  },
];

export default function ServicesPage() {
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
            <Link to="/about" className="hover:opacity-80 font-medium">About</Link>
            <Link to="/services" className="font-semibold opacity-100">Services</Link>
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

      {/* Hero */}
      <section className="relative h-[70vh] m-4 rounded-[2.5rem] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop" alt="Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pb-10">
          <span className="uppercase tracking-widest text-xs text-white/70 font-semibold mb-4 block">[our services]</span>
          <h1 className="text-6xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
            Complete<br />Dental Care
          </h1>
          <p className="text-white/90 mt-6 max-w-md text-lg">
            From routine checkups to full-mouth restorations, we offer a comprehensive range of dental services under one roof.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-5xl font-semibold max-w-md">Services We Provide</h2>
            <p className="text-gray-500 text-sm max-w-xs text-right">Our clinic is equipped with the latest dental technology and staffed by a team of compassionate specialists.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className={`${s.color} rounded-[2rem] p-10 flex flex-col gap-8 hover:shadow-lg transition duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-black/5">
                    <i className={`ph ${s.icon} text-2xl`}></i>
                  </div>
                  <i className="ph-light ph-plus text-xl text-black/30"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-black/60 mb-6 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.detail.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-black/70">
                        <i className="ph-fill ph-check-circle text-black/40 text-base"></i>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 m-4 bg-[#0f2f63] text-white rounded-[3rem] mb-12">
        <div className="max-w-7xl mx-auto">
          <span className="uppercase tracking-widest text-xs text-white/50 font-semibold mb-6 block">[why us]</span>
          <div className="flex flex-col lg:flex-row justify-between gap-16">
            <h2 className="text-5xl font-bold max-w-sm leading-tight">Why Patients Choose Sunrise Dental</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-2/3">
              {[
                { icon: 'ph-clock', title: 'Flexible Hours', desc: 'We offer early morning, evening and weekend appointments to fit your schedule.' },
                { icon: 'ph-currency-circle-dollar', title: 'Transparent Pricing', desc: 'No hidden costs. We discuss all treatment options and costs upfront before starting.' },
                { icon: 'ph-first-aid-kit', title: 'Emergency Care', desc: 'Dental emergencies don\'t keep office hours. Same-day appointments available for urgent cases.' },
                { icon: 'ph-device-tablet-camera', title: 'Modern Technology', desc: 'Digital X-rays, 3D scans, and laser dentistry for precise, comfortable treatments.' },
              ].map((w) => (
                <div key={w.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`ph ${w.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{w.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">Book Your Appointment</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">Get in touch with our friendly team today and take the first step towards a healthier, brighter smile.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition">
            <i className="ph ph-phone"></i> Call Now
          </Link>
          <Link to="/about" className="inline-flex items-center gap-3 bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
            Learn About Us <i className="ph ph-arrow-right"></i>
          </Link>
        </div>
      </section>

      <footer className="py-8 px-6 text-center text-xs text-gray-400">
        © 2026 Sunrise Dental. All rights reserved.
      </footer>
    </div>
  );
}
