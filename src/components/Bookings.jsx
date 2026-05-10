import React from "react";
import { useTrip } from "../context/TripContext";
import { formatCurrency, convertFromUSD } from "../lib/currencyUtils";
import { SectionHeader } from "./ui/SectionHeader";
import { GlassCard } from "./ui/GlassCard";

export default function Bookings() {
  const { bookings, currency } = useTrip();

  if (!bookings || bookings.length === 0) {
    return null;
  }

  const typeConfig = {
    flight:{ icon:"✈️", color:"#1a3a78", label:"Flight" },
    bus:   { icon:"🚌", color:"#7d4a1a", label:"Bus" },
    train: { icon:"🚂", color:"#4a1a7d", label:"Train" },
    metro: { icon:"🚇", color:"#1a6a7d", label:"Metro" },
    hotel: { icon:"🏨", color:"#6a7d1a", label:"Hotel" },
  };

  return (
    <div className="w-full">
      <SectionHeader 
        title="Your Bookings" 
        subtitle="All your secured reservations and tickets." 
        align="left" 
      />
      <div className="mt-8 space-y-4">
        {bookings.map((booking, idx) => {
          const cfg = typeConfig[booking._type] || { icon:"🎟️", color:"#333", label:"Ticket" };
          return (
            <GlassCard key={idx} className="p-5 flex items-center justify-between grain-el">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm" style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}>
                  {cfg.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-white" style={{ backgroundColor: cfg.color }}>
                      {cfg.label}
                    </span>
                    <span className="font-black text-sm text-gray-900">
                      {booking.airline || booking.operator || booking.name || booking.line || booking.route}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-bold text-gray-600 text-xs">
                    <span>{booking.dep || booking.checkIn}</span>
                    <span>→</span>
                    <span>{booking.arr || booking.checkOut}</span>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                    {booking.cls || booking.type || booking.rating || "General"} · {booking.dur}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-teal-600">
                  ₹{Number(booking.price || 0).toLocaleString()}
                </div>
                <div className="text-[10px] uppercase font-bold text-green-600 tracking-widest mt-1">
                  Confirmed
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
