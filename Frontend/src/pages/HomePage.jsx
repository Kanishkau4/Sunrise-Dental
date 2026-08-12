import { Link } from 'react-router-dom';

/**
 * Public marketing homepage - adapted from the uploaded design mockup.
 * This is what a visitor/patient sees before logging in. The actual staff system
 * (login, register appointment, search, billing) lives behind /login.
 */
export default function HomePage() {
  return (
    <div className="text-gray-900 overflow-x-hidden">
      {/* HERO SECTION */}
      <header className="max-w-[1440px] mx-auto p-4 pt-4">
        <div className="relative w-full h-[85vh] rounded-[2rem] overflow-hidden flex flex-col">
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000"
            alt="Smiling patient at Sunrise Dental Clinic"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />

          {/* Navbar */}
          <nav className="relative z-10 flex justify-between items-center p-4 mx-6 mt-6 bg-white/95 backdrop-blur-md rounded-full shadow-sm">
            <div className="font-bold text-xl ml-4 tracking-tight">Sunrise Dental</div>
            <ul className="hidden md:flex gap-2 text-sm font-medium text-gray-600">
              <li className="text-black bg-gray-100 px-5 py-2 rounded-full cursor-pointer">Home</li>
              <li className="px-5 py-2 hover:text-black cursor-pointer">About</li>
              <li className="px-5 py-2 hover:text-black cursor-pointer">Services</li>
              <li className="px-5 py-2 hover:text-black cursor-pointer">Our Dentists</li>
              <li className="px-5 py-2 hover:text-black cursor-pointer">Contact</li>
            </ul>
            <Link
              to="/login"
              className="bg-black text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-gray-800 transition"
            >
              Staff Login
            </Link>
          </nav>

          {/* Hero Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center p-12 md:p-24 max-w-2xl text-white mt-8">
            <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Seamless<br />Dental Care
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-md">
              Sunrise Dental Clinic in Colombo provides friendly, professional dental
              care with a modern, computerized appointment system - no more lost
              records or long waits.
            </p>
            <Link
              to="/login"
              className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 w-max font-semibold text-sm hover:bg-gray-800 transition"
            >
              Staff Portal
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section className="max-w-[1200px] mx-auto py-24 px-6 relative">
        <div className="text-center mb-16 relative">
          <div className="inline-block border border-gray-300 rounded-full px-6 py-1.5 mb-8">
            <span className="text-xs font-semibold text-gray-500 tracking-[0.2em] uppercase">[about us]</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 tracking-tight">A Trusted Name<br />in Dental Care</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
            Our team of skilled and experienced dental professionals strives to create a
            comfortable and welcoming environment for every patient. From routine
            checkups to root canal treatment, we offer a full range of dental services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 rounded-3xl overflow-hidden h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover"
              alt="Dental clinic interior"
            />
          </div>
          <div className="md:col-span-4 flex flex-col gap-6 justify-center">
            <div className="rounded-[2rem] overflow-hidden h-[180px]">
              <img
                src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover"
                alt="Dental checkup"
              />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-between h-[360px]">
            <div className="rounded-3xl overflow-hidden h-[220px] mb-6">
              <img
                src="https://images.unsplash.com/photo-1598256989800-fea5f00e9987?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover"
                alt="Dental treatment"
              />
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">98%</h3>
              <p className="text-gray-500 text-sm">Patient satisfaction with our service</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-[1200px] mx-auto py-24 px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-5xl font-bold max-w-lg leading-tight tracking-tight">
            Services We Provide
          </h2>
          <p className="text-gray-500 max-w-xs text-sm">
            From general checkups to specialised procedures, our dentists are here for
            every stage of your dental health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <ServiceCard
            bg="bg-brand-yellow"
            icon="🦷"
            title="General Checkup"
            desc="Routine dental examinations to catch problems early and keep your smile healthy."
          />
          <ServiceCard
            bg="bg-brand-purple"
            icon="✨"
            title="Scaling & Polishing"
            desc="Professional cleaning that removes plaque and tartar buildup for a brighter smile."
          />
          <ServiceCard
            bg="bg-brand-blue"
            icon="🩺"
            title="Root Canal Treatment"
            desc="Gentle, effective treatment for infected tooth pulp, performed by experienced dentists."
          />
          <div className="rounded-3xl overflow-hidden min-h-[320px] relative group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              alt="Dental extraction service"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end p-6">
              <h3 className="text-white text-xl font-bold">Tooth Extraction</h3>
            </div>
          </div>
        </div>
      </section>

      {/* OUR DENTISTS SECTION */}
      <section className="max-w-[1440px] mx-auto p-4 mb-24">
        <div className="bg-brand-green rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-5/12 z-10">
            <div className="flex items-center gap-4 mb-16">
              <span className="text-xs font-semibold tracking-widest text-gray-800">[our dentists]</span>
              <div className="h-[1px] w-16 bg-gray-400" />
            </div>
            <p className="text-gray-700 mb-10 max-w-sm text-sm leading-relaxed">
              Our dentists bring years of experience across general dentistry,
              orthodontics, and oral surgery - all under one roof in Colombo.
            </p>
          </div>

          <div className="w-full lg:w-7/12 z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
              Meet Our Dental Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="rounded-3xl overflow-hidden h-[300px] mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Dr. Nimal Perera"
                  />
                </div>
                <h4 className="font-bold text-lg mb-2">Dr. Nimal Perera</h4>
                <p className="text-gray-600 text-sm">General Dentistry</p>
              </div>
              <div>
                <div className="rounded-3xl overflow-hidden h-[300px] mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover"
                    alt="Dr. Anusha Fernando"
                  />
                </div>
                <h4 className="font-bold text-lg mb-2">Dr. Anusha Fernando</h4>
                <p className="text-gray-600 text-sm">Orthodontics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-[1440px] mx-auto p-4 mb-4">
        <div className="bg-black rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
          <div className="flex flex-col md:flex-row justify-between gap-16 relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Visit Us at<br />Sunrise Dental Clinic
              </h2>
              <p className="text-white/70 text-sm max-w-sm">
                Colombo, Sri Lanka<br />
                Staff members can access the appointment system via the Staff Login link above.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm text-white/70">
              <ul className="space-y-3">
                <li className="text-white font-medium mb-2">Clinic</li>
                <li className="hover:text-white transition cursor-pointer">About Us</li>
                <li className="hover:text-white transition cursor-pointer">Services</li>
                <li className="hover:text-white transition cursor-pointer">Our Dentists</li>
              </ul>
              <ul className="space-y-3">
                <li className="text-white font-medium mb-2">Staff</li>
                <li>
                  <Link to="/login" className="hover:text-white transition">Staff Login</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20">
            <h1 className="text-[12vw] font-bold leading-none tracking-tighter text-white/5 text-center uppercase select-none">
              Sunrise Dental
            </h1>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ bg, icon, title, desc }) {
  return (
    <div className={`${bg} p-8 rounded-3xl flex flex-col justify-between min-h-[320px]`}>
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 border border-black/10 rounded-full flex items-center justify-center text-xl bg-white/50">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
