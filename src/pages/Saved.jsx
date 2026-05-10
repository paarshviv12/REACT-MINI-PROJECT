import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Heart, Trash2, PlaneTakeoff } from "lucide-react";
import { useTrip } from "../context/TripContext";

const Saved = () => {
  const { favorites, setFavorites, destination } = useTrip();
  const currentUser = JSON.parse(localStorage.getItem("travel_current_user") || "null");

  const removeFromSaved = (id) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <div className="container mx-auto px-4 py-12 max-w-3xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: "var(--sage)" }}>
            Your Collection
          </p>
          <h1 className="text-4xl font-black" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
            Saved Trips 🌍
          </h1>
          {currentUser && (
            <p className="text-sm font-medium mt-2" style={{ color: "var(--ink-muted)" }}>
              Welcome back, {currentUser.name.split(" ")[0]}. Here are your saved destinations.
            </p>
          )}
        </div>

        {/* Active trip */}
        {destination?.name && (
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "var(--ink-muted)" }}>
              Current Active Trip
            </p>
            <div className="cream-card grain-el p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl" style={{ backgroundColor: "var(--sage-light)" }}>
                  ✈️
                </div>
                <div>
                  <h3 className="font-black text-lg" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
                    {destination.name}
                  </h3>
                  <p className="text-xs font-semibold" style={{ color: "var(--ink-muted)" }}>
                    {destination.lat?.toFixed(4)}, {destination.lng?.toFixed(4)}
                  </p>
                </div>
              </div>
              <Link to="/planner" className="btn-sage px-5 py-2.5 text-sm flex items-center gap-2">
                <PlaneTakeoff className="h-4 w-4" /> View Plan
              </Link>
            </div>
          </div>
        )}

        {/* Saved favorites */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "var(--ink-muted)" }}>
            Saved Destinations ({favorites.length})
          </p>

          {favorites.length === 0 ? (
            <div className="cream-card grain-el p-12 text-center">
              <p className="text-5xl mb-4">📍</p>
              <h3 className="font-black text-xl mb-2" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
                Nothing saved yet
              </h3>
              <p className="text-sm font-medium mb-6" style={{ color: "var(--ink-muted)" }}>
                Search for a destination and tap "Save" to add it here.
              </p>
              <Link to="/" className="btn-sage px-6 py-3 text-sm inline-flex items-center gap-2">
                🌍 Explore Destinations
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((fav) => (
                <div key={fav.id} className="cream-card grain-el overflow-hidden flex items-stretch">
                  {fav.image && (
                    <div className="w-28 h-24 flex-shrink-0 overflow-hidden" style={{ borderRadius: "20px 0 0 20px" }}>
                      <img src={fav.image} alt={fav.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center justify-between flex-1 px-5 gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <MapPin className="h-4 w-4" style={{ color: "var(--sage)" }}/>
                        <h3 className="font-black text-base" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
                          {fav.name}
                        </h3>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: "var(--ink-muted)" }}>Saved destination</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/planner`} onClick={() => { }} className="btn-sage px-3 py-1.5 text-xs flex items-center gap-1">
                        <PlaneTakeoff className="h-3.5 w-3.5" /> Plan
                      </Link>
                      <button onClick={() => removeFromSaved(fav.id)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-red-50 transition-colors"
                        style={{ color: "#c0392b" }}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
