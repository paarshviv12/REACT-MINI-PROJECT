import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import DestinationCard      from "../components/DestinationCard";
import BudgetTracker        from "../components/BudgetTracker";
import PackingList          from "../components/PackingList";
import DayByDayItinerary    from "../components/DayByDayItinerary";
import InteractiveMap       from "../components/InteractiveMap";
import JourneyPlannerModal  from "../components/JourneyPlannerModal";
import Bookings             from "../components/Bookings";
import { Map as MapIcon, Navigation2, ChevronLeft, ChevronRight } from "lucide-react";

const Planner = () => {
  const { destination, itinerary } = useTrip();
  const [isMapOpen,   setIsMapOpen]   = useState(true);
  const [journeyOpen, setJourneyOpen] = useState(false);

  if (!destination) return <Navigate to="/" />;

  return (
    <>
      <JourneyPlannerModal isOpen={journeyOpen} onClose={() => setJourneyOpen(false)} />

      <div
        className="relative flex flex-col lg:flex-row min-h-screen grain-bg"
        style={{ backgroundColor: "var(--cream)" }}
      >
        {/* ── Left Pane ── */}
        <div
          className={`transition-all duration-500 ease-in-out flex-shrink-0 py-6 ${
            isMapOpen ? "w-full lg:w-[50%]" : "w-full lg:w-[calc(100%-36px)]"
          }`}
        >
          <div
            className={`p-6 space-y-10 mx-auto transition-all duration-300 ${
              isMapOpen ? "max-w-2xl" : "max-w-4xl"
            }`}
          >
            {/* Header */}
            <header className="space-y-3 pt-2">
              <div>
                <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--sage)" }}>
                  Trip Overview
                </p>
                <h1
                  className="text-3xl font-black leading-tight"
                  style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}
                >
                  ✈️ {destination.name || destination}
                </h1>
              </div>

              {/* Plan Your Journey button */}
              <button
                onClick={() => setJourneyOpen(true)}
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-sm group transition-all duration-200 grain-el"
                style={{
                  background: "linear-gradient(135deg, #2a7d4f 0%, #1a5c38 100%)",
                  boxShadow: "0 6px 20px rgba(42,125,79,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Navigation2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-base leading-tight">Plan Your Journey</p>
                    <p className="text-white/70 text-xs font-semibold">Flights · Trains · Buses · Metro · Trams</p>
                  </div>
                </div>
                <span className="text-white font-black text-2xl leading-none group-hover:translate-x-1 transition-transform">
                  ›
                </span>
              </button>
            </header>

            <section><DestinationCard place={destination.name || destination} /></section>
            <section><DayByDayItinerary /></section>
            <section className="py-6"><Bookings /></section>
            <section className="py-6"><BudgetTracker /></section>
            <section className="pb-10"><PackingList /></section>
          </div>
        </div>

        {/* ── Divider with Toggle Button ── */}
        <div
          className="hidden lg:flex flex-col items-center justify-center sticky top-16 h-[calc(100vh-4rem)] z-[50] flex-shrink-0 border-l border-r"
          style={{ 
            width: "36px", 
            backgroundColor: "var(--cream-light)",
            borderColor: "rgba(140,120,100,0.18)",
          }}
        >
          <button
            onClick={() => setIsMapOpen(!isMapOpen)}
            title={isMapOpen ? "Hide Map" : "Show Map"}
            className="flex flex-col items-center gap-3 py-6 grain-el transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "var(--cream)",
              borderRadius: "18px",
              border: "1.5px solid rgba(140,120,100,0.25)",
              boxShadow: "0 4px 12px rgba(100,80,60,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
              color: "var(--ink)",
              cursor: "pointer",
              zIndex: 10
            }}
          >
            <MapIcon className="h-4 w-4" />
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: "var(--ink-muted)"
              }}
            >
              {isMapOpen ? "Hide Map" : "Show Map"}
            </span>
            {isMapOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* ── Right Pane: Map ── */}
        <div
          className={`sticky top-16 h-[calc(100vh-4rem)] transition-all duration-500 ease-in-out z-40 flex-1 ${
            isMapOpen ? "opacity-100 visible" : "opacity-0 invisible !flex-none !w-0"
          }`}
        >
          <div className="h-full w-full p-3 relative">


            <div
              className="w-full h-full rounded-[24px] overflow-hidden"
              style={{ boxShadow: "0 8px 32px rgba(100,80,60,0.15)" }}
            >
              <InteractiveMap
                center={{ lat: destination.lat || 20.5937, lng: destination.lng || 78.9629 }}
                destinationName={destination.name || destination}
                itinerary={itinerary}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planner;
