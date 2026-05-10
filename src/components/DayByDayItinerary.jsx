import React, { useState } from "react";
import { useTrip } from "../context/TripContext";
import { MapPin, Plus, Trash2, CalendarPlus, Clock } from "lucide-react";

const SCHEMES = [
  { bg: "#eef6ed", dot: "#7bbf78", border: "#c2d9be" },
  { bg: "#eeeaf6", dot: "#9b8fd4", border: "#c8bee8" },
  { bg: "#f6f0ee", dot: "#d4916a", border: "#e8c9be" },
  { bg: "#eef2f6", dot: "#7a9abf", border: "#bed0e8" },
  { bg: "#f6f0ee", dot: "#d4b86a", border: "#e8dbbe" },
];

const DayByDayItinerary = () => {
  const { itinerary, addPlaceToDay, removePlaceFromDay, addDay } = useTrip();
  const [newPlaceInputs, setNewPlaceInputs] = useState({});

  const handleInputChange = (dayId, value) =>
    setNewPlaceInputs((prev) => ({ ...prev, [dayId]: value }));

  const handleAddPlace = (dayId) => {
    const value = newPlaceInputs[dayId];
    if (value?.trim()) {
      addPlaceToDay(dayId, value);
      setNewPlaceInputs((prev) => ({ ...prev, [dayId]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--ink-muted)" }}>
            Day by Day
          </p>
          <h2 className="text-2xl font-black" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
            Your Itinerary
          </h2>
        </div>
        <button
          onClick={addDay}
          className="btn-lavender flex items-center gap-2 px-4 py-2.5 text-sm"
        >
          <CalendarPlus className="h-4 w-4" /> Add Day
        </button>
      </div>

      {itinerary.map((day, dayIndex) => {
        const s = SCHEMES[dayIndex % SCHEMES.length];
        return (
          <div
            key={day.id}
            className="rounded-[20px] overflow-hidden grain-el"
            style={{
              backgroundColor: s.bg,
              border: `1.5px solid ${s.border}`,
              boxShadow: "0 4px 16px rgba(100,80,60,0.09), inset 0 1px 0 rgba(255,255,255,0.6)"
            }}
          >
            {/* Day header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: `1.5px solid ${s.border}` }}
            >
              <h3 className="text-base font-black" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
                {day.date}
              </h3>
              <span
                className="text-xs font-black px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: `1.5px solid ${s.border}`,
                  color: "var(--ink-muted)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)"
                }}
              >
                {day.places.length} place{day.places.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Places */}
            <div className="px-5 py-4 space-y-4">
              {day.places.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-xl mb-1">📍</p>
                  <p className="text-xs font-bold" style={{ color: "var(--ink-muted)" }}>No places yet</p>
                </div>
              ) : (
                <div
                  className="relative pl-6 space-y-4"
                  style={{ borderLeft: `2px solid ${s.border}` }}
                >
                  {day.places.map((place) => (
                    <div key={place.id} className="relative group">
                      <div
                        className="absolute -left-[25px] top-3 h-3.5 w-3.5 rounded-full ring-2"
                        style={{ backgroundColor: s.dot, ringColor: "white", boxShadow: `0 0 0 3px white, 0 0 0 5px ${s.dot}40` }}
                      />
                      <div
                        className="cream-card grain-el p-3.5 flex justify-between items-start gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-sm truncate" style={{ color: "var(--ink)" }}>
                            {place.name}
                          </h4>
                          {(place.time !== "TBD" || place.note) && (
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              {place.time !== "TBD" && (
                                <span
                                  className="flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5"
                                  style={{ backgroundColor: "var(--cream-dark)", color: "var(--ink-muted)" }}
                                >
                                  <Clock className="h-3 w-3" /> {place.time}
                                </span>
                              )}
                              {place.note && (
                                <span className="text-[11px]" style={{ color: "var(--ink-muted)" }}>{place.note}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removePlaceFromDay(day.id, place.id)}
                          className="h-7 w-7 rounded-xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:bg-red-50"
                          style={{ color: "#e55" }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add place input */}
              <div className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--ink-muted)" }} />
                  <input
                    placeholder="Add a place…"
                    value={newPlaceInputs[day.id] || ""}
                    onChange={(e) => handleInputChange(day.id, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddPlace(day.id)}
                    className="cream-input w-full h-11 pl-10 pr-4 text-sm"
                  />
                </div>
                <button
                  onClick={() => handleAddPlace(day.id)}
                  className="btn-sage h-11 w-11 flex items-center justify-center rounded-2xl flex-shrink-0"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayByDayItinerary;
