import React from "react";
import { Plus, Minus, Search, Menu, Play, MapPin } from "lucide-react";

const PlannerMockup = () => {
  return (
    <div className="w-[320px] sm:w-[380px] h-[650px] bg-background rounded-[40px] shadow-2xl border-[8px] border-white/80 overflow-hidden flex flex-col relative mx-auto transform transition-all hover:-translate-y-2 hover:shadow-3xl">
      
      {/* Map Header */}
      <div className="h-[280px] relative">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop" 
          alt="Map" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlays */}
        <div className="absolute top-8 left-6 right-6 flex justify-between items-start">
          <button className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-md">
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="text-center drop-shadow-md">
            <h3 className="text-white font-bold text-lg">Adventure in Thailand</h3>
            <p className="text-white/80 text-xs">01 Sep 2024 - 23 Sep 2024</p>
          </div>
          
          <button className="px-3 py-1.5 bg-teal-500 rounded-full flex items-center gap-1 text-white shadow-md text-xs font-semibold">
            <Play className="h-3 w-3 fill-white" /> View
          </button>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="flex-1 bg-white -mt-16 rounded-t-3xl relative z-10 flex flex-col overflow-hidden shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        
        {/* Header Summary */}
        <div className="p-6 pb-2 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-[3px] border-teal-500 flex items-center justify-center text-teal-600 font-bold">
              12/22
            </div>
            <div className="leading-tight">
              <p className="font-bold">Nights</p>
              <p className="font-bold">planned</p>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-full p-1">
            <button className="px-4 py-1.5 bg-white rounded-full shadow-sm text-sm font-semibold text-teal-600">Route</button>
            <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground">Bookings</button>
          </div>
        </div>

        {/* Route List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          
          {[
            { id: 1, name: "Chiang Mai", dates: "Sun 01 Sep - Wed 04 Sep", nights: 3, icon: "train", travel: "3h 0m" },
            { id: 2, name: "Pai District", dates: "Wed 04 Sep - Mon 09 Sep", nights: 5, icon: "plane", travel: "Plane" },
            { id: 3, name: "Bangkok", dates: "Mon 09 Sep - Thu 12 Sep", nights: 3, icon: "distance", travel: "684 km", travelColor: "text-pink-500" },
          ].map((dest, i) => (
            <div key={i} className="relative pl-8">
              {/* Timeline line */}
              {i < 2 && <div className="absolute left-3 top-6 bottom-[-30px] w-px bg-gray-200" />}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-teal-500 flex items-center justify-center text-[10px] font-bold text-teal-600 bg-white z-10">
                {dest.id}
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{dest.name}</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{dest.dates}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="hover:text-teal-600"><Minus className="h-4 w-4" /></button>
                  <div className="text-center min-w-[1.5rem]">
                    <span className="font-bold text-lg leading-none">{dest.nights}</span>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">nights</p>
                  </div>
                  <button className="hover:text-teal-600"><Plus className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Transit info */}
              <div className="mt-3 flex justify-center">
                <span className={`text-[10px] font-bold flex items-center gap-1 ${dest.travelColor || 'text-pink-500'}`}>
                  {dest.icon === 'plane' ? '✈️' : dest.icon === 'train' ? '🚆' : '➕'} {dest.travel}
                </span>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      
      {/* Floating Add Action */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white rounded-2xl shadow-lg border p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-muted-foreground">
            ✕
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-foreground">
            <MapPin className="h-4 w-4 text-teal-600" /> Add new destination
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerMockup;
