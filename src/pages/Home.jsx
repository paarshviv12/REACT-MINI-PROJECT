import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import {
  PlaneTakeoff, Globe2, Loader2,
  User, CheckSquare, CalendarDays, CircleDollarSign, BookImage,
  MapPin, Calendar, Wallet, ChevronRight, Play
} from "lucide-react";
import ProfileMockup    from "../components/mockups/ProfileMockup";
import ChecklistMockup  from "../components/mockups/ChecklistMockup";
import PlannerMockup    from "../components/mockups/PlannerMockup";
import BudgetMockup     from "../components/mockups/BudgetMockup";
import JournalMockup    from "../components/mockups/JournalMockup";

import { useTheme } from "../context/ThemeContext";
import { convertToUSD, CURRENCY_CONFIG } from "../lib/currencyUtils";

const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Jaipur", "Goa",
  "Udaipur", "Agra", "Kolkata", "Chennai",
  "Hyderabad", "Pune", "Kochi", "Manali", "Shimla",
  "Rishikesh", "Darjeeling", "Amritsar", "Jodhpur", "Ooty",
  "Hampi", "Srinagar", "Leh", "Gangtok", "Mysuru",
  "Pushkar", "Coimbatore", "Shillong", "Bhubaneswar", "Vizag",
];

// Ribbon string: city names separated by  ·  (middle dot + spaces)
const ribbonText = CITIES.join("  ·  ") + "  ·  ";
const CAROUSEL_IMAGES = [
  { url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=520&fit=crop",  label: "Agra" },
  { url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=520&fit=crop",  label: "Jaipur" },
  { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=520&fit=crop",  label: "Goa" },
  { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=520&fit=crop",  label: "Rajasthan" },
  { url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=520&fit=crop",  label: "Shimla" },
  { url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&h=520&fit=crop",  label: "Kerala" },
  { url: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&h=520&fit=crop",  label: "Ladakh" },
];

const n = CAROUSEL_IMAGES.length;

const PhotoCarousel = () => {
  const [center, setCenter] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCenter(c => (c + 1) % n), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = (center - 1 + n) % n;
  const next = (center + 1) % n;

  return (
    <section className="py-12 overflow-hidden bg-black text-white">
      <div className="relative flex items-center justify-center gap-5 px-4">
        <div
          onClick={() => setCenter(prev)}
          className="relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
          style={{ width: "28vw", maxWidth: 300, height: 200, opacity: 0.5, filter: "blur(1.5px) brightness(0.7)", transform: "scale(0.88)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}
        >
          <img src={CAROUSEL_IMAGES[prev].url} alt={CAROUSEL_IMAGES[prev].label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-3 left-3 text-sm font-black" style={{ color: "var(--cream-light)" }}>{CAROUSEL_IMAGES[prev].label}</span>
        </div>

        <div
          className="relative flex-shrink-0 rounded-3xl overflow-hidden z-10"
          style={{ width: "44vw", maxWidth: 480, height: 300, transform: "scale(1)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}
        >
          <img src={CAROUSEL_IMAGES[center].url} alt={CAROUSEL_IMAGES[center].label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute bottom-5 left-5 text-xl font-black text-white">{CAROUSEL_IMAGES[center].label}</span>
          <div className="absolute bottom-5 right-5 flex gap-1.5">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setCenter(i)} className="rounded-full transition-all duration-300" style={{ width: i === center ? 16 : 6, height: 6, backgroundColor: i === center ? "white" : "rgba(255,255,255,0.4)" }} />
            ))}
          </div>
        </div>

        <div
          onClick={() => setCenter(next)}
          className="relative flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
          style={{ width: "28vw", maxWidth: 300, height: 200, opacity: 0.5, filter: "blur(1.5px) brightness(0.7)", transform: "scale(0.88)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}
        >
          <img src={CAROUSEL_IMAGES[next].url} alt={CAROUSEL_IMAGES[next].label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-3 left-3 text-sm font-black" style={{ color: "var(--cream-light)" }}>{CAROUSEL_IMAGES[next].label}</span>
        </div>
      </div>
    </section>
  );
};

const FEATURES = [
  { id: "profile",   name: "Profile",   icon: User,            mockup: ProfileMockup   },
  { id: "checklist", name: "Checklist", icon: CheckSquare,     mockup: ChecklistMockup },
  { id: "planner",   name: "Planner",   icon: CalendarDays,    mockup: PlannerMockup   },
  { id: "budget",    name: "Budget",    icon: CircleDollarSign, mockup: BudgetMockup   },
  { id: "journal",   name: "Journal",   icon: BookImage,       mockup: JournalMockup   },
];

const generateItinerary = (placeName, days) => {
  const activities = [
    { name: "Explore Downtown", note: "Walk around the main square and see local sights." },
    { name: "City Museum Visit", note: "Discover the history and culture of the region." },
    { name: "Main Landmark / Temple", note: "A must-visit iconic spot." },
    { name: "Nature Park / Beach", note: "Relax and enjoy the outdoors." },
    { name: "Famous Local Market", note: "Shop for souvenirs and try street food." },
    { name: "Scenic Viewpoint", note: "Great spot for photos at sunset." },
    { name: "Historical Monument", note: "Learn about the heritage." },
    { name: "Local Cuisine Tasting", note: "Try the best local dishes at a popular restaurant." }
  ];

  const it = [];
  for (let i = 1; i <= days; i++) {
    const placesForDay = [];
    // pick 2 places per day
    for(let j=0; j<2; j++) {
      const g = activities[(i*2 + j) % activities.length];
      placesForDay.push({
        id: `day${i}-p${j}`,
        name: `${g.name} in ${placeName}`,
        time: j === 0 ? "10:00 AM" : "03:00 PM",
        note: g.note,
        lat: 20.5937 + (Math.random() - 0.5)*0.05,
        lng: 78.9629 + (Math.random() - 0.5)*0.05
      });
    }
    it.push({
      id: `day-${i}`,
      dayNumber: i,
      date: `Day ${i}`,
      places: placesForDay
    });
  }
  return it;
};

const Home = () => {
  const { isDark } = useTheme();
  const { setDestination, setBudget, setItinerary, currency } = useTrip();
  const navigate = useNavigate();
  
  const [destValue, setDestValue] = useState("");
  const [daysValue, setDaysValue] = useState("3");
  const [budgetValue, setBudgetValue] = useState("2000");
  
  const [isSearching, setIsSearching] = useState(false);
  const [activeFeature, setActiveFeature] = useState("planner");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!destValue) return;
    setIsSearching(true);
    
    // Update trip details
    const parsedDays = parseInt(daysValue) || 3;
    const parsedBudgetLocal = parseFloat(budgetValue) || 2000;
    const parsedBudgetUSD = convertToUSD(parsedBudgetLocal, currency);
    
    setBudget(parsedBudgetUSD);
    
    try {
      const res  = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destValue)}&format=json&limit=1`);
      const data = await res.json();
      const lat  = data?.[0] ? parseFloat(data[0].lat) : 20.5937;
      const lng  = data?.[0] ? parseFloat(data[0].lon) : 78.9629;
      
      setDestination({ name: destValue, lat, lng });
      setItinerary(generateItinerary(destValue, parsedDays));
      navigate("/planner");
    } catch {
      setDestination({ name: destValue, lat: 20.5937, lng: 78.9629 });
      setItinerary(generateItinerary(destValue, parsedDays));
      navigate("/planner");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      
      {/* ── HERO 1 (Matches Image) ─────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-visible">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=1600&h=900&fit=crop" alt="Hero" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-between items-center h-full pt-20">
          <div className="max-w-2xl">
            <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] mb-6 drop-shadow-lg text-white" style={{ fontFamily: "Arial, sans-serif" }}>
              WONDERFUL<br />
              <span className="text-white">INDONESIA</span>
            </h1>
            <p className="text-sm md:text-base font-medium max-w-md text-gray-200 drop-shadow-md">
              Raja Ampat is an archipelago located in West Papua Province, Indonesia. Consisting of four main islands—Waigeo, Misool, Salawati, and Batanta—and hundreds of smaller islands. Raja Ampat is known as one of the world's paradises for nature lovers and divers.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 pr-4 text-gray-300 font-bold text-lg hidden md:flex">
            <span className="text-white">01</span>
            <span>02</span>
            <span className="flex items-center gap-2">03 <div className="w-8 h-0.5 bg-white"></div></span>
            <span>04</span>
            <span>05</span>
          </div>
        </div>
        
        {/* ── Search / Filter Bar (Like Image) ── */}
        <div ref={dropdownRef} className="relative z-20 w-full max-w-4xl mx-auto mt-12 bg-white rounded-lg flex flex-col md:flex-row text-black font-bold text-sm tracking-widest overflow-visible mb-12 shadow-2xl">
          <form onSubmit={handleSearch} className="flex flex-1 flex-col md:flex-row w-full relative">
            <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-4 relative group cursor-pointer">
              <span className="opacity-50 mr-2 uppercase text-xs">Destination:</span>
              <input 
                type="text" 
                placeholder="Where to?" 
                className="w-full outline-none font-bold text-black uppercase bg-transparent"
                value={destValue}
                onChange={(e) => {
                  setDestValue(e.target.value);
                  if(e.target.value) setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
            </div>
            
            {showDropdown && (
              <div className="absolute top-[110%] left-0 w-full md:w-[60%] bg-white rounded-lg shadow-xl p-4 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                <div className="mb-4">
                  <label className="block text-xs uppercase text-gray-500 mb-1">Trip Duration (Days)</label>
                  <input 
                    type="number" 
                    min="1" 
                    className="w-full border border-gray-300 rounded p-2 outline-none focus:border-blue-500" 
                    value={daysValue}
                    onChange={(e) => setDaysValue(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-xs uppercase text-gray-500 mb-1">Budget ({CURRENCY_CONFIG[currency]?.symbol || "$"})</label>
                  <input 
                    type="number" 
                    min="100" 
                    className="w-full border border-gray-300 rounded p-2 outline-none focus:border-blue-500" 
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-5 flex items-center justify-center gap-2 bg-[#6b9cb3] hover:bg-[#5a869a] text-white transition-colors disabled:opacity-70 whitespace-nowrap"
            >
              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : "CHOOSE YOUR TRAVEL"}
            </button>
          </form>
        </div>
      </section>



      {/* ── SECOND HERO SECTION ─────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center bg-black overflow-hidden py-20 px-4">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1554481923-a691d7c99f5c?w=1600&h=900&fit=crop" alt="Temple" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1] mb-6">
              TRAVEL AND<br/>ENJOY THE<br/>BEAUTY OF<br/>NATURE
            </h2>
            <p className="text-sm text-gray-300 max-w-md leading-relaxed">
              Bali is an Indonesian island located in Southeast Asia, known for its stunning natural beauty, vibrant culture, and rich history. It is often referred to as the "Island of the Gods" due to its many temples and spiritual significance.
            </p>
          </div>

          <div className="flex flex-col gap-6 relative">
             <div className="relative w-full md:w-3/4 ml-auto rounded-xl overflow-hidden aspect-video border border-white/20 shadow-2xl group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop" alt="Video 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </div>

             <div className="relative w-full md:w-3/4 mr-auto md:-ml-8 -mt-12 rounded-xl overflow-hidden aspect-video border border-white/20 shadow-2xl z-10 group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop" alt="Video 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </div>
          </div>
        </div>
      </section>

      {/* KEEP EXISTING CAROUSEL & MOCKUPS BELOW SO NO FUNCTIONALITY IS LOST */}
      <div className="bg-black py-12 text-white">
        <div className="text-center mb-8">
           <h3 className="text-3xl font-bold">More Destinations</h3>
        </div>
        <PhotoCarousel />
      </div>

      <section className="relative z-10 bg-black border-y border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 justify-center items-center">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${isActive ? "bg-white text-black" : "bg-[#111] text-gray-400 hover:text-white"}`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{feature.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 flex-1 bg-black text-white">
        <div className="container mx-auto flex justify-center">
          {FEATURES.map((feature) => {
            if (feature.id !== activeFeature) return null;
            const MockupComponent = feature.mockup;
            return (
              <div key={feature.id} className="animate-in fade-in slide-in-from-bottom-6 duration-500 w-full flex justify-center">
                <MockupComponent />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── City ribbon ──────────────────────── */}
      <div className="border-b border-white/10 py-3 overflow-hidden ticker-container bg-[#1c1c1c]">
        <div className="ticker-wrap">
          <span className="ticker-inner text-white/80 text-sm font-black tracking-widest uppercase select-none">
            <span>{ribbonText}{ribbonText}</span>
          </span>
        </div>
      </div>

      {/* ── Ready, Set Go CTA ── */}
      <section className="py-20 px-4 bg-[#232323] relative overflow-hidden border-b border-white/5">
        <div className="container mx-auto text-center max-w-2xl relative z-10">
          <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter text-white" style={{ fontFamily: "Playfair Display, serif" }}>
            Ready, Set <span style={{ color: "#ffff00" }}>Go</span>
          </h2>
          <p className="text-lg font-medium mb-12 text-white/60">
            Join thousands of travelers planning their perfect escapes with PLOINK.
          </p>
          <button 
            onClick={() => navigate("/login")}
            className="px-12 py-5 text-xl font-black rounded-xl grain-el hover:scale-105 transition-all shadow-2xl"
            style={{ 
              backgroundColor: "#ffff00", 
              color: "#000000"
            }}
          >
            Get Started
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
