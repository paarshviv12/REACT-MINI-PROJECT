import React, { useState } from "react";
import { X, ArrowLeftRight, Calendar, Clock, Plane, Bus, Train, Zap, ChevronRight } from "lucide-react";
import { useTrip } from "../context/TripContext";

/* ── Realistic mock data ──────────────────── */
const FLIGHTS = [
  { id:1, airline:"IndiGo",      code:"6E", num:"6E-203",  dep:"06:15", arr:"08:30", dur:"2h 15m", price:5840,  stops:"Non-stop", seats:12, cls:"Economy",   amenities:["USB Charging","Meal ₹250"] },
  { id:2, airline:"Air India",   code:"AI", num:"AI-101",  dep:"08:00", arr:"10:20", dur:"2h 20m", price:7250,  stops:"Non-stop", seats:4,  cls:"Economy",   amenities:["Meal Included","WiFi","Extra Legroom"] },
  { id:3, airline:"SpiceJet",    code:"SG", num:"SG-172",  dep:"10:30", arr:"12:55", dur:"2h 25m", price:4890,  stops:"Non-stop", seats:18, cls:"Economy",   amenities:["USB Charging"] },
  { id:4, airline:"Vistara",     code:"UK", num:"UK-965",  dep:"14:00", arr:"16:15", dur:"2h 15m", price:12400, stops:"Non-stop", seats:6,  cls:"Business",  amenities:["Meal Included","Priority Boarding","Extra Legroom","Lounge Access"] },
  { id:5, airline:"Akasa Air",   code:"QP", num:"QP-1102", dep:"17:30", arr:"19:45", dur:"2h 15m", price:5100,  stops:"Non-stop", seats:21, cls:"Economy",   amenities:["Meal ₹220"] },
  { id:6, airline:"Air India",   code:"AI", num:"AI-505",  dep:"21:00", arr:"23:30", dur:"2h 30m", price:6800,  stops:"Non-stop", seats:3,  cls:"Economy",   amenities:["Meal Included","WiFi"] },
];

const BUSES = [
  { id:1, operator:"Neeta Tours",      type:"AC Volvo Sleeper",    dep:"21:30", arr:"04:30", dur:"7h 00m", price:1850, seats:8,  rating:"4.5", amenities:["AC","USB","Blanket","Water Bottle"] },
  { id:2, operator:"Orange Travels",   type:"AC Multi-Axle Volvo", dep:"22:00", arr:"05:00", dur:"7h 00m", price:2200, seats:14, rating:"4.2", amenities:["AC","USB"] },
  { id:3, operator:"VRL Travels",      type:"AC Sleeper (2+1)",    dep:"20:00", arr:"03:00", dur:"7h 00m", price:1450, seats:22, rating:"3.9", amenities:["Charging Point"] },
  { id:4, operator:"Paulo Travels",    type:"AC Multi-Axle Volvo", dep:"22:30", arr:"05:30", dur:"7h 00m", price:2600, seats:5,  rating:"4.7", amenities:["AC","WiFi","USB","Meal Stop","Blanket"] },
  { id:5, operator:"Zingbus",          type:"AC Volvo Seater",     dep:"19:30", arr:"02:30", dur:"7h 00m", price:1150, seats:30, rating:"4.4", amenities:["AC","USB","Water"] },
  { id:6, operator:"IntrCity SmartBus",type:"AC Volvo Sleeper",    dep:"23:00", arr:"06:00", dur:"7h 00m", price:1950, seats:18, rating:"4.6", amenities:["AC","WiFi","GPS"] },
];

const TRAINS = [
  { id:1, name:"Tejas Express",       num:"22119", dep:"05:50", arr:"14:40", dur:"8h 50m", price:2850, cls:"EC", avail:12, platform:12, type:"Superfast" },
  { id:2, name:"Mandovi Express",     num:"10103", dep:"07:10", arr:"21:45", dur:"14h 35m", price:1650, cls:"3A", avail:45, platform:7,  type:"Express" },
  { id:3, name:"Vande Bharat Exp",    num:"22229", dep:"05:25", arr:"13:10", dur:"7h 45m", price:3450, cls:"EC", avail:8,  platform:9,  type:"Premium" },
  { id:4, name:"Konkan Kanya Exp",    num:"20111", dep:"23:05", arr:"10:45", dur:"11h 40m", price:1280, cls:"3A", avail:28, platform:3,  type:"Superfast" },
  { id:5, name:"Mangaluru Exp",       num:"12133", dep:"22:02", arr:"07:10", dur:"9h 08m", price:1150, cls:"3A", avail:15, platform:5,  type:"Express" },
  { id:6, name:"Jan Shatabdi Exp",    num:"12051", dep:"05:10", arr:"14:30", dur:"9h 20m", price:985,  cls:"CC", avail:156,platform:11, type:"Superfast" },
];

const METROS = [
  { id:1, line:"Blue Line",    from:"Dwarka Sec-21",       to:"Noida Sec-62",     dep:"06:00", arr:"07:02", dur:"62 min",  price:60,  freq:"4 min",  firstLast:"05:45 – 23:55" },
  { id:2, line:"Yellow Line",  from:"HUDA City Centre",    to:"Samaypur Badli",   dep:"06:10", arr:"07:15", dur:"65 min",  price:60,  freq:"3 min",  firstLast:"05:30 – 23:30" },
  { id:3, line:"Red Line",     from:"Rithala",             to:"Shaheed Sthal",    dep:"06:05", arr:"06:50", dur:"45 min",  price:50,  freq:"5 min",  firstLast:"05:45 – 23:15" },
  { id:4, line:"Green Line",   from:"Brigadier Hoshiyar Singh",to:"Inderlok",     dep:"06:15", arr:"06:53", dur:"38 min",  price:40,  freq:"6 min",  firstLast:"06:00 – 22:30" },
  { id:5, line:"Violet Line",  from:"Kashmere Gate",       to:"Raja Nahar Singh", dep:"06:20", arr:"07:25", dur:"65 min",  price:60,  freq:"5 min",  firstLast:"05:50 – 23:30" },
  { id:6, line:"Pink Line",    from:"Majlis Park",         to:"Shiv Vihar",       dep:"06:30", arr:"07:35", dur:"65 min",  price:60,  freq:"5 min",  firstLast:"06:00 – 23:00" },
];

const HOTELS = [
  { id:1, name:"Taj Mahal Palace",   rating:"5 Star", checkIn:"14:00", checkOut:"12:00", dur:"1 Night", price:15000, amenities:["Pool", "Spa"] },
  { id:2, name:"Novotel",            rating:"4 Star", checkIn:"14:00", checkOut:"12:00", dur:"1 Night", price:8000,  amenities:["Breakfast", "Gym"] },
  { id:3, name:"Holiday Inn",        rating:"3 Star", checkIn:"14:00", checkOut:"12:00", dur:"1 Night", price:4500,  amenities:["WiFi", "Breakfast"] },
  { id:4, name:"Backpacker Hostel",  rating:"Hostel", checkIn:"13:00", checkOut:"11:00", dur:"1 Night", price:800,   amenities:["WiFi", "Locker"] },
];

const MODES = [
  { id:"all",    label:"All",    icon:"🗺️" },
  { id:"flight", label:"Flights",icon:"✈️" },
  { id:"bus",    label:"Bus",    icon:"🚌" },
  { id:"train",  label:"Train",  icon:"🚂" },
  { id:"metro",  label:"Metro",  icon:"🚇" },
  { id:"hotel",  label:"Hotel",  icon:"🏨" },
];

export default function JourneyPlannerModal({ isOpen, onClose }) {
  const { destination, addBooking } = useTrip();
  const [from, setFrom]     = useState("Mumbai");
  const [to, setTo]         = useState(destination?.name || "Goa");
  const [date, setDate]     = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime]     = useState(new Date().toTimeString().slice(0,5));
  const [step, setStep]     = useState("search"); // search | results
  const [mode, setMode]     = useState("all");

  if (!isOpen) return null;

  const swap = () => { setFrom(to); setTo(from); };

  const allResults = [
    ...(mode === "all" || mode === "flight" ? FLIGHTS.map(f=>({...f,_type:"flight"})) : []),
    ...(mode === "all" || mode === "bus"    ? BUSES.map(b=>({...b,_type:"bus"}))     : []),
    ...(mode === "all" || mode === "train"  ? TRAINS.map(t=>({...t,_type:"train"}))  : []),
    ...(mode === "all" || mode === "metro"  ? METROS.map(m=>({...m,_type:"metro"}))  : []),
    ...(mode === "all" || mode === "hotel"  ? HOTELS.map(t=>({...t,_type:"hotel"}))  : []),
  ];

  const isMumbaiToGoa = (from.toLowerCase().includes("mumbai") && to.toLowerCase().includes("goa")) || 
                        (from.toLowerCase().includes("goa") && to.toLowerCase().includes("mumbai"));

  let displayResults = allResults;

  if (isMumbaiToGoa) {
    displayResults = allResults.map(r => {
      if (r._type === "flight") return { ...r, price: r.price + Math.floor(Math.random() * 2000) };
      if (r._type === "bus") return { ...r, operator: r.operator === "Neeta Tours" ? "Paulo Travels" : r.operator, price: 1800 + Math.floor(Math.random() * 800) };
      if (r._type === "train") return { ...r, name: r.name === "Tejas Express" ? "Tejas Express" : r.name, price: 1600 + Math.floor(Math.random() * 600) };
      return r;
    });
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center" style={{backgroundColor:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)"}}>
      <div
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-hidden flex flex-col grain-el"
        style={{
          backgroundColor:"var(--cream-light)",
          borderRadius:"28px 28px 0 0",
          boxShadow:"0 -8px 48px rgba(0,0,0,0.3)",
          ...(window.innerWidth >= 640 && { borderRadius:"28px" })
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{background:"linear-gradient(135deg,#2a7d4f,#1a5c38)", borderRadius:"28px 28px 0 0"}}>
          {step==="results" && (
            <button onClick={()=>setStep("search")} className="text-white/80 hover:text-white">
              <ChevronRight className="h-5 w-5 rotate-180"/>
            </button>
          )}
          {step==="search" && <div className="w-6"/>}
          <h2 className="text-lg font-black text-white" style={{fontFamily:"Playfair Display,serif"}}>Plan Journey</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor:"rgba(255,255,255,0.15)"}}>
            <X className="h-4 w-4 text-white"/>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {step === "search" ? (
            <div className="p-6 space-y-5">
              <div className="cream-card p-5 relative">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{color:"var(--sage)"}}>From</p>
                    <input value={from} onChange={e=>setFrom(e.target.value)} className="cream-input w-full h-11 px-4 text-sm font-bold" placeholder="Origin" />
                  </div>
                  <div className="h-px" style={{backgroundColor:"rgba(140,120,100,0.15)"}}/>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{color:"var(--ink-muted)"}}>To</p>
                    <input value={to} onChange={e=>setTo(e.target.value)} className="cream-input w-full h-11 px-4 text-sm font-bold" placeholder="Destination" />
                  </div>
                </div>
                <button onClick={swap} className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"linear-gradient(135deg,#2a7d4f,#1a5c38)"}}>
                  <ArrowLeftRight className="h-4 w-4 text-white"/>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2">Date</p>
                  <div className="cream-card p-3 flex items-center gap-3"><Calendar className="h-4 w-4"/><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-transparent text-sm font-bold outline-none flex-1" /></div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-2">Time</p>
                  <div className="cream-card p-3 flex items-center gap-3"><Clock className="h-4 w-4"/><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="bg-transparent text-sm font-bold outline-none flex-1" /></div>
                </div>
              </div>
              <button onClick={()=>setStep("results")} className="w-full h-14 rounded-2xl text-white font-black text-base" style={{background:"linear-gradient(135deg,#1a3a78,#2a5cc8)"}}>🔍 Search</button>
            </div>
          ) : (
            <div className="pb-6">
              <div className="px-6 py-4" style={{backgroundColor:"var(--cream-dark)"}}>
                <div className="text-sm font-black">{from} → {to}</div>
                <p className="text-[10px] font-semibold">{new Date(date).toLocaleDateString()} · {time}</p>
              </div>
              <div className="flex gap-2 overflow-x-auto px-6 py-3">
                {MODES.map(m=>(
                  <button key={m.id} onClick={()=>setMode(m.id)} className="px-4 py-2 rounded-full text-xs font-black transition-all" style={mode===m.id ? {background:"linear-gradient(135deg,#2a7d4f,#1a5c38)", color:"white"} : {backgroundColor:"var(--cream-dark)", color:"var(--ink-muted)"}}>
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
              <div className="px-6 space-y-4">
                {displayResults.map((r,i)=><ResultCard key={i} data={r} addBooking={addBooking} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ data, addBooking }) {
  const [booked, setBooked] = useState(false);
  const typeConfig = {
    flight:{ icon:"✈️", color:"#1a3a78", label:"Flight" },
    bus:   { icon:"🚌", color:"#7d4a1a", label:"Bus" },
    train: { icon:"🚂", color:"#4a1a7d", label:"Train" },
    metro: { icon:"🚇", color:"#1a6a7d", label:"Metro" },
    hotel: { icon:"🏨", color:"#6a7d1a", label:"Hotel" },
  };
  const cfg = typeConfig[data._type];
  
  const handleBook = () => {
    setBooked(true);
    if (addBooking) {
      addBooking(data);
    }
  };

  return (
    <div className="cream-card p-5 grain-el">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-white" style={{backgroundColor:cfg.color}}>{cfg.label}</span>
            <span className="font-black text-sm">{data.airline || data.operator || data.name || data.line || data.route}</span>
          </div>
          <div className="flex items-center gap-3 mb-2 font-black">
            <span>{data.dep || data.checkIn}</span>
            <div className="flex-1 h-px bg-black/10"></div>
            <span className="text-[10px]">{data.dur}</span>
            <div className="flex-1 h-px bg-black/10"></div>
            <span>{data.arr || data.checkOut}</span>
          </div>
          <div className="text-[10px] font-bold text-black/50">₹{data.price.toLocaleString()} · {data.cls || data.type || data.rating || "General"}</div>
        </div>
        <button onClick={handleBook} disabled={booked} className="ml-4 px-4 py-2 rounded-xl text-xs font-black text-white" style={{background: booked ? "#9eb89a" : "linear-gradient(135deg,#1a3a78,#2a5cc8)"}}>
          {booked ? "Booked" : "Book"}
        </button>
      </div>
    </div>
  );
}
