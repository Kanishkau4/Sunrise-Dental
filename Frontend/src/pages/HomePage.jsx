import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    name: "Kevin Martin",
    title: "Schedules that work for you",
    text: "\"Our visual designer lets you quickly an of drag and drop your own way to custom-apps for both keep desktop, mobile & also tab for report.\"",
    image: "https://i.pravatar.cc/100?img=11"
  },
  {
    name: "Sarah Jenkins",
    title: "Health screenings for seniors",
    text: "\"The staff here is absolutely incredible. They made sure I was comfortable throughout the entire procedure. Highly recommended!\"",
    image: "https://i.pravatar.cc/100?img=32"
  },
  {
    name: "Michael Chen",
    title: "Seniors stay independent",
    text: "\"I used to hate going to the dentist, but Sunrise Dental changed everything. Modern equipment and a very gentle approach.\"",
    image: "https://i.pravatar.cc/100?img=16"
  },
  {
    name: "Emily Rodriguez",
    title: "Exceptional care",
    text: "\"From the front desk to the dental chair, everyone is professional and kind. My teeth have never looked better.\"",
    image: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "David Smith",
    title: "Pain-free experience",
    text: "\"I had a root canal done and didn't feel a thing. The doctors here are true professionals who know what they're doing.\"",
    image: "https://i.pravatar.cc/100?img=8"
  },
  {
    name: "Jessica Taylor",
    title: "Great for kids",
    text: "\"My children actually look forward to their dental checkups now. The pediatric team is fantastic and so patient.\"",
    image: "https://i.pravatar.cc/100?img=9"
  }
];

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef(null);

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="antialiased text-gray-900 bg-[#fbfbfb]">
      <Loader onComplete={() => setHeroLoaded(true)} />
      {/* Navigation */}
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
            <a href="#" className="hover:opacity-80 font-medium">About</a>
            <a href="#" className="hover:opacity-80 font-medium">Services</a>
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

      {/* Hero Section */}
      <section className="relative h-[95vh] m-4 rounded-[2.5rem] overflow-hidden">
        <img src="./hero.jpeg" alt="Dental Care" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pb-20 mt-20">
          <h1 className="text-6xl md:text-8xl font-bold text-white max-w-3xl leading-tight flex flex-wrap items-center gap-x-3 md:gap-x-5 gap-y-2">
            <span className="overflow-hidden inline-block align-bottom pb-2 -mb-2">
              <span
                className={`inline-block transition-all duration-700 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[115%] opacity-0'}`}
                style={{ transitionDelay: '100ms', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                Seamless
              </span>
            </span>
            <div className="basis-full h-0 m-0"></div>
            <span className="overflow-hidden inline-block align-bottom pb-2 -mb-2">
              <span
                className={`inline-block transition-all duration-700 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[115%] opacity-0'}`}
                style={{ transitionDelay: '200ms', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                Dental
              </span>
            </span>
            <span className="overflow-hidden inline-block align-bottom pb-2 -mb-2">
              <span
                className={`inline-block transition-all duration-700 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[115%] opacity-0'}`}
                style={{ transitionDelay: '300ms', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <i className="ph-fill ph-tooth text-white inline-block -rotate-12"></i>
              </span>
            </span>
            <span className="overflow-hidden inline-block align-bottom pb-2 -mb-2">
              <span
                className={`inline-block transition-all duration-700 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[115%] opacity-0'}`}
                style={{ transitionDelay: '400ms', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                Care
              </span>
            </span>
          </h1>
          <p className="text-white/90 mt-6 max-w-md text-lg">
            Sunrise Dental Clinic provides friendly, professional dental care with a modern approach.
          </p>
          <div className="mt-10">
            <Link to="/login" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition">
              Book Appointment <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold mb-6 block border-b border-gray-300 pb-2 inline-block">[about us]</span>
            <h2 className="text-5xl font-semibold leading-tight mb-6">A Simple Way to Save on Dental Care</h2>
            <p className="text-gray-600 mb-8 max-w-md">Our team of skilled and experienced dental professionals strives to create comfortable and welcoming environment for each and every patient. We offer a wide range of services.</p>
            <a href="#" className="inline-flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition">
              Book Appointment <i className="ph ph-arrow-right text-white"></i>
            </a>
          </div>

          {/* Right Images Grid */}
          <div className="w-full lg:w-1/2 relative h-[500px]">
            <img src="https://plus.unsplash.com/premium_photo-1681966962522-546f370bc98e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVudGlzdHxlbnwwfHwwfHx8MA%3D%3D" className="absolute top-0 right-0 w-64 h-80 object-cover rounded-3xl" alt="Patient" />
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80" className="absolute top-24 left-0 w-56 h-56 object-cover rounded-3xl" alt="Tools" />
            <img src="https://plus.unsplash.com/premium_photo-1677174625625-fb6f183af447?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute bottom-0 left-20 w-72 h-48 object-cover rounded-3xl z-10" alt="Smile" />

            {/* Stat Badge */}
            <div className="absolute -bottom-10 right-10 bg-white p-6 rounded-3xl shadow-xl max-w-[200px] z-20">
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-sm text-gray-600">Client satisfaction with our service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-5xl font-semibold max-w-md">Services We Provide Are Listed Below</h2>
          <div className="max-w-xs text-right">
            <p className="text-gray-600 text-sm mb-6">The blocks & components you need to build a professional website are based drivers.</p>
            <a href="#" className="inline-flex items-center gap-3 bg-brand-dark text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition text-sm">
              Book Appointment <i className="ph ph-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* Decorative text middle vertical */}
          <div className="hidden lg:block absolute left-1/3 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs tracking-widest font-semibold uppercase text-gray-400 z-10">OUR SERVICES</div>

          {/* Card 1 */}
          <div className="bg-brand-yellow rounded-[2rem] p-10 flex flex-col justify-between h-[380px] relative">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-black/5">
                <i className="ph-light ph-tooth text-2xl"></i>
              </div>
              <i className="ph-light ph-plus text-xl text-black/30"></i>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Cavity Protection</h3>
              <p className="text-sm text-black/70 mb-6">As we move into this new era of technology, we tend to look at the future with confidence and pride, which is why our theme.</p>
              <a href="#" className="font-semibold flex items-center gap-2 hover:opacity-70 transition">Read More <i className="ph ph-arrow-right"></i></a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-brand-purple rounded-[2rem] p-10 flex flex-col justify-between h-[380px] relative lg:col-start-3">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-black/5">
                <i className="ph-light ph-cavity text-2xl"></i>
              </div>
              <i className="ph-light ph-plus text-xl text-black/30"></i>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Root Canal Treatment</h3>
              <p className="text-sm text-black/70 mb-6">In the new era of technology we look in the future with certainty and pride, that's why our theme looks so good.</p>
              <a href="#" className="font-semibold flex items-center gap-2 hover:opacity-70 transition">Read More <i className="ph ph-arrow-right"></i></a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-brand-blue rounded-[2rem] p-10 flex flex-col justify-between h-[380px] relative">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-black/5">
                <i className="ph-light ph-first-aid text-2xl"></i>
              </div>
              <i className="ph-light ph-plus text-xl text-black/30"></i>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Oral Surgery</h3>
              <p className="text-sm text-black/70 mb-6">In the new era of technology we look in the future with certainty and pride, that's why our theme looks so good.</p>
              <a href="#" className="font-semibold flex items-center gap-2 hover:opacity-70 transition">Read More <i className="ph ph-arrow-right"></i></a>
            </div>
          </div>

          {/* Card 4 (Video Image) */}
          <div className="rounded-[2rem] h-[380px] relative overflow-hidden group lg:col-start-3">
            <img src="https://plus.unsplash.com/premium_photo-1677178715264-305b9a0fe32b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Video" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/50 transition">
                <i className="ph-fill ph-play text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section className="m-4 bg-brand-green rounded-[3rem] p-8 md:p-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold mb-6 block border-b border-gray-300 pb-2 inline-block">[our works]</span>
              <p className="text-gray-700 mb-8 mt-12 text-lg">Our team of skilled and experienced dental professionals strives to create comfortable and welcoming environment for each.</p>
              <a href="#" className="inline-flex items-center gap-3 bg-brand-dark text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition">
                Book Appointment <i className="ph ph-arrow-right text-white"></i>
              </a>
            </div>

            <div className="flex items-center gap-4 mt-16">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-brand-green" alt="User 1" />
                <img src="https://i.pravatar.cc/100?img=5" className="w-12 h-12 rounded-full border-2 border-brand-green" alt="User 2" />
                <img src="https://i.pravatar.cc/100?img=9" className="w-12 h-12 rounded-full border-2 border-brand-green" alt="User 3" />
              </div>
              <p className="font-semibold text-sm leading-tight">10K+ happy<br />member</p>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <h2 className="text-5xl font-semibold mb-12">Services We Provide Are Listed Below</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80" alt="Straightening" className="w-full h-80 object-cover rounded-[2rem] mb-6" />
                <h4 className="text-xl font-semibold mb-2">Teeth Straightening</h4>
                <p className="text-gray-600 text-sm">Improve your smile with cleaning.</p>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80" alt="Implant" className="w-full h-80 object-cover rounded-[2rem] mb-6" />
                <h4 className="text-xl font-semibold mb-2">Dental Implant</h4>
                <p className="text-gray-600 text-sm">Improve your smile with cleaning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="m-4 bg-brand-purple rounded-[3rem] p-8 md:p-16 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-5xl font-semibold mb-4">What Our Clients Say</h2>
              <p className="text-gray-700 max-w-sm">Team carefully evaluates your results to provide actionable insights for improving your health & lifespan.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={scrollLeft} className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-sm"><i className="ph ph-arrow-left"></i></button>
              <button onClick={scrollRight} className="w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition shadow-sm"><i className="ph ph-arrow-right"></i></button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testimonials.map((t, i) => (
              <div key={i} className="snap-start flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <img src={t.image} className="w-12 h-12 rounded-full mb-6" alt={t.name} />
                  <h4 className="text-lg font-semibold mb-4">{t.title}</h4>
                  <p className="text-gray-600 text-sm mb-8 leading-relaxed">{t.text}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{t.name}</span>
                  <div className="flex text-yellow-400 gap-1 text-sm">
                    <i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i><i className="ph-fill ph-star"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-semibold mb-12">Latest Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Insight 1 */}
          <div className="bg-brand-light rounded-[2rem] p-6 h-[400px] flex flex-col justify-between border border-gray-100 hover:shadow-lg transition">
            <div className="bg-gray-100 self-start px-4 py-2 rounded-full text-xs font-medium text-gray-500 mb-4">July 9, 2026</div>
            <div className="flex-grow flex items-center justify-center text-center px-4">
              <h3 className="text-3xl font-medium leading-tight">The Importance of Regular Checkups</h3>
            </div>
            <p className="text-xs text-gray-500 text-center px-4">Regular dental visits are essential for maintaining healthy teeth and gums. Discover why scheduling a checkup every six months can prevent future complications.</p>
          </div>

          {/* Insight 2 (Image Background) */}
          <div className="relative rounded-[2rem] p-6 h-[400px] flex flex-col justify-between overflow-hidden group">
            <img src="https://plus.unsplash.com/premium_photo-1661434856831-76779e04e8bc?q=80&w=1138&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" alt="Insight Background" />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative bg-white/20 backdrop-blur-sm self-start px-4 py-2 rounded-full text-xs font-medium text-white mb-4">July 20, 2026</div>
            <div className="relative flex-grow flex items-center justify-center text-center px-4">
              <h3 className="text-3xl font-medium leading-tight text-white">New Technology In Modern Dentistry</h3>
            </div>
            <p className="relative text-xs text-white/80 text-center px-4">From 3D digital imaging to painless laser treatments, modern technology is transforming the dental landscape to make procedures quicker and more comfortable.</p>
          </div>

          {/* Insight 3 */}
          <div className="bg-brand-light rounded-[2rem] p-6 h-[400px] flex flex-col justify-between border border-gray-100 hover:shadow-lg transition">
            <div className="bg-gray-100 self-start px-4 py-2 rounded-full text-xs font-medium text-gray-500 mb-4">August 2, 2026</div>
            <div className="flex-grow flex items-center justify-center text-center px-4">
              <h3 className="text-3xl font-medium leading-tight">Choosing The Best Toothbrush For You</h3>
            </div>
            <p className="text-xs text-gray-500 text-center px-4">Electric or manual? Soft or medium bristles? We break down the science of daily dental hygiene to help you select the ideal tools for a bright smile.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white pt-24 px-8 pb-8 rounded-t-[3rem] mt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 relative z-10">

          <div className="w-full lg:w-1/3">
            <h3 className="text-3xl font-medium mb-8 max-w-xs">Offerings From Sunrise Dental</h3>
            <div className="flex border-b border-white/20 pb-4">
              <input type="email" placeholder="Your Email" className="bg-transparent outline-none flex-grow text-white placeholder:text-gray-500" />
              <button><i className="ph ph-arrow-right text-xl"></i></button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 flex flex-wrap justify-between gap-8">
            <div className="flex flex-col gap-4 text-gray-400 text-sm">
              <a href="#" className="text-white font-medium mb-2">Home</a>
              <a href="#" className="hover:text-white transition">Why our network</a>
              <a href="#" className="hover:text-white transition">Charging solutions</a>
              <a href="#" className="hover:text-white transition">Technology</a>
              <a href="#" className="hover:text-white transition">Contact Us</a>
            </div>

            <div className="flex flex-col gap-4 text-gray-400 text-sm">
              <a href="#" className="text-white font-medium mb-2">Our Mission</a>
              <a href="#" className="hover:text-white transition">Careers</a>
              <a href="#" className="hover:text-white transition">Blog</a>
              <a href="#" className="hover:text-white transition">Services</a>
              <a href="#" className="hover:text-white transition">Press releases</a>
            </div>

            <div className="flex flex-col gap-4 text-gray-400 text-sm">
              <a href="#" className="text-white font-medium mb-2">Facebook</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Youtube</a>
            </div>
          </div>
        </div>

        {/* Giant Background Text */}
        <div className="mt-24 text-center">
          <h1 className="text-[13vw] font-bold text-white/5 leading-none tracking-tighter select-none">
            Sunrise Dental
          </h1>
        </div>
      </footer>
    </div>
  );
}

class Spring {
  constructor(tension, friction, initialValue) {
    this.tension = tension;
    this.friction = friction;
    this.target = initialValue;
    this.value = initialValue;
    this.velocity = 0;
  }
  update(dt) {
    const safeDt = Math.min(dt, 0.05);
    const force = -this.tension * (this.value - this.target) - this.friction * this.velocity;
    this.velocity += force * safeDt;
    this.value += this.velocity * safeDt;
    return this.value;
  }
}

function Loader({ onComplete }) {
  const [wordmarkY, setWordmarkY] = useState(16);
  const [fillScale, setFillScale] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let wmSpring = new Spring(200, 22, 16);
    wmSpring.target = 0;
    let lastTime = performance.now();
    let animationFrameId;

    function animateLoader(time) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const y = wmSpring.update(dt);
      setWordmarkY(y);

      animationFrameId = requestAnimationFrame(animateLoader);
    }
    animationFrameId = requestAnimationFrame(animateLoader);

    const fillTimeout = setTimeout(() => {
      setFillScale(1);
    }, 120);

    const MIN_VISIBLE_MS = 1400;
    const MAX_VISIBLE_MS = 2600;
    let loadReady = false;

    function completeLoad() {
      if (loadReady) return;
      loadReady = true;
      setExiting(true);
      onComplete();
    }

    const forceLoad = setTimeout(completeLoad, MAX_VISIBLE_MS);

    if (document.readyState === 'complete') {
      setTimeout(() => {
        clearTimeout(forceLoad);
        completeLoad();
      }, MIN_VISIBLE_MS);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          clearTimeout(forceLoad);
          completeLoad();
        }, MIN_VISIBLE_MS);
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fillTimeout);
      clearTimeout(forceLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(() => setMounted(false), 850);
      return () => clearTimeout(t);
    }
  }, [exiting]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[#0f2f63] text-white flex flex-col items-center justify-center gap-8 transition-transform duration-[850ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] ${exiting ? '-translate-y-[105%]' : 'translate-y-0'}`}
    >
      <div
        className="flex items-center gap-2 text-2xl font-medium uppercase tracking-[0.2em]"
        style={{
          transform: `translateY(${wordmarkY}px)`,
          opacity: Math.max(0, 1 - (Math.abs(wordmarkY) / 16))
        }}
      >
        <i className="ph-fill ph-tooth"></i>
        <span>Sunrise Dental</span>
      </div>
      <div className="w-40 h-[1px] rounded-full bg-white/20 overflow-hidden">
        <div
          className="w-full h-full bg-white origin-left transition-transform duration-[1280ms] ease-[cubic-bezier(0.645,0.045,0.355,1)]"
          style={{ transform: `scaleX(${fillScale})` }}
        ></div>
      </div>
    </div>
  );
}
