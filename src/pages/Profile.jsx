import React from "react";
import { Navigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { User, Mail, Calendar, MapPin, Bookmark } from "lucide-react";
import Footer from "../components/Footer";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("travel_current_user") || "null");
  const { favorites } = useTrip(); // Assuming favorites contains saved trips

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cream)" }}>
      <main className="flex-1 container mx-auto px-4 py-20 max-w-4xl">
        
        {/* Header / Account Details */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8 p-10 rounded-[3rem] grain-el"
            style={{ 
              backgroundColor: "var(--cream-light)",
              border: "1.5px solid rgba(140,120,100,0.18)",
              boxShadow: "0 20px 48px rgba(100,80,60,0.12)"
            }}>
            <div className="w-32 h-32 rounded-[2.5rem] bg-ink flex items-center justify-center text-4xl font-black text-cream grain-el shadow-xl shadow-ink/20">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl font-black tracking-tight" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
                  {currentUser.name}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1 opacity-60">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-bold">{currentUser.email}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="px-5 py-2 rounded-2xl bg-sage/10 text-sage text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Joined May 2024
                </div>
                <div className="px-5 py-2 rounded-2xl bg-lavender/10 text-lavender text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Explorer Level
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Saved Trips Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 px-2">
            <Bookmark className="w-6 h-6" style={{ color: "var(--sage)" }} />
            <h2 className="text-2xl font-black" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
              Your Saved Trips
            </h2>
          </div>

          {favorites.length === 0 ? (
            <div className="p-16 rounded-[3rem] border-2 border-dashed border-sage/20 text-center space-y-4">
              <p className="text-lg font-bold opacity-40">No trips saved yet.</p>
              <button 
                onClick={() => window.location.href = "/"}
                className="btn-sage px-8 py-3 text-sm font-black"
              >
                Start Planning
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((trip) => (
                <div 
                  key={trip.id} 
                  className="group relative p-6 rounded-[2.5rem] grain-el transition-all hover:scale-[1.02] cursor-pointer"
                  style={{ 
                    backgroundColor: "var(--cream-light)",
                    border: "1.5px solid rgba(140,120,100,0.15)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.04)"
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-sage/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-sage" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-ink/5 rounded-full opacity-50">
                      Saved
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-2" style={{ color: "var(--ink)" }}>{trip.name}</h3>
                  <p className="text-sm font-medium opacity-60 line-clamp-2">Exploring the beautiful streets and culture of {trip.name}.</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
