import React from "react";
import { Search, Bell, Upload, MapPin } from "lucide-react";
import { Button } from "../ui/button";

const ProfileMockup = () => {
  return (
    <div className="w-[320px] sm:w-[380px] h-[650px] bg-background rounded-[40px] shadow-2xl border-[8px] border-white/80 overflow-hidden flex flex-col relative mx-auto transform transition-all hover:-translate-y-2 hover:shadow-3xl">
      {/* Map Header Area */}
      <div className="h-64 bg-teal-100 relative overflow-hidden flex-shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop" 
          alt="World Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        {/* Fake Map Pins */}
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-sm" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-sm" />
        <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-sm" />
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-sm" />
        
        {/* Floating Header Actions */}
        <div className="absolute top-6 right-6 flex gap-2">
          <button className="h-10 w-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <Search className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Profile Info Area */}
      <div className="bg-background flex-1 -mt-10 rounded-t-3xl relative z-10 px-6 pt-4 pb-6 flex flex-col">
        {/* Avatar */}
        <div className="flex justify-between items-end mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden -mt-12 bg-muted relative shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 pb-2 text-center">
            <div>
              <p className="font-bold text-lg">360</p>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Followers</p>
            </div>
            <div>
              <p className="font-bold text-lg">28</p>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Following</p>
            </div>
            <div>
              <p className="font-bold text-lg">12</p>
              <p className="text-[10px] text-muted-foreground uppercase font-semibold">Countries</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold">Lara Levine</h2>
            <p className="text-sm text-muted-foreground">@laralevine</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 w-9 border border-muted-foreground/20 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
              <Upload className="h-4 w-4" />
            </button>
            <Button size="sm" variant="outline" className="rounded-full border-teal-500 text-teal-600 hover:bg-teal-50">
              Follow
            </Button>
          </div>
        </div>

        <p className="text-sm mt-3 mb-6 leading-relaxed">
          Passionate explorer navigating the world one destination at a time. Creating unforgettable memories on the go. 🌍✈️
        </p>

        {/* Tabs */}
        <div className="flex border-b mb-6 relative">
          <div className="flex-1 pb-3 text-center text-sm font-semibold text-teal-600 border-b-2 border-teal-500 flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" /> Trips
          </div>
          <div className="flex-1 pb-3 text-center text-sm font-semibold text-muted-foreground flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" /> Places
          </div>
        </div>

        {/* Upcoming Trips */}
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-center mb-1">Upcoming trips</h3>
          <p className="text-xs text-muted-foreground text-center mb-4">3 trips</p>

          <div className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&h=300&fit=crop" 
              alt="Trip" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h4 className="text-white font-bold text-lg">Bali, Indonesia</h4>
            </div>
            <div className="absolute top-3 left-3 bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <span>🕒 13 days until departure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMockup;
