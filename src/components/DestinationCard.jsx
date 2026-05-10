import React, { useEffect, useState } from "react";
import { MapPin, Cloud, Sun, CloudRain, Thermometer, Heart } from "lucide-react";
import { useTrip } from "../context/TripContext";

/* ── City → Unsplash photo map ── */
const CITY_PHOTOS = {
  mumbai:     "photo-1529253355930-ddbe423a2ac7",
  delhi:      "photo-1587474260584-136574528ed5",
  "new delhi":"photo-1587474260584-136574528ed5",
  jaipur:     "photo-1477587458883-47145ed94245",
  goa:        "photo-1512343879784-a960bf40e7f2",
  varanasi:   "photo-1561361058-c24e8a6b3ef6",
  agra:       "photo-1548013146-72479768bada",
  kerala:     "photo-1593693397690-362cb9666fc2",
  kochi:      "photo-1593693397690-362cb9666fc2",
  shimla:     "photo-1626621341517-bbf3d9990a23",
  manali:     "photo-1626621341517-bbf3d9990a23",
  ladakh:     "photo-1568454537842-d933259bb258",
  leh:        "photo-1568454537842-d933259bb258",
  rajasthan:  "photo-1599661046289-e31897846e41",
  jodhpur:    "photo-1599661046289-e31897846e41",
  udaipur:    "photo-1599661046289-e31897846e41",
  darjeeling: "photo-1567336273898-ebbf9eb3c3bf",
  kolkata:    "photo-1558431382-27e303142255",
  chennai:    "photo-1582510003544-4d00b7f74220",
  bangalore:  "photo-1596176530529-78163a4f7af2",
  bengaluru:  "photo-1596176530529-78163a4f7af2",
  hyderabad:  "photo-1600095387548-b9c14afecf32",
  pune:       "photo-1558618666-fcd25c85cd64",
  amritsar:   "photo-1609946860441-a51ffed5a2bc",
  mysuru:     "photo-1570458436416-b8fcccfe883f",
  mysore:     "photo-1570458436416-b8fcccfe883f",
  rishikesh:  "photo-1589308078059-be1415eab4c3",
  pushkar:    "photo-1594804917591-e99e40af5c74",
  hampi:      "photo-1583419893456-38d7d6b4a424",
  srinagar:   "photo-1625482744878-49c2df1c71c5",
  ooty:       "photo-1571003123894-1f0594d2b5d9",
  gangtok:    "photo-1504391468736-60b44bcf13a9",
  shillong:   "photo-1608496601160-f86d19a44f9c",
};

const getCityPhoto = (place) => {
  if (!place) return "photo-1469854523086-cc02fe5d8800";
  const key = place.toLowerCase().trim();
  return CITY_PHOTOS[key] || null;
};

const getPhotoUrl = (place) => {
  const id = getCityPhoto(place);
  if (id) return `https://images.unsplash.com/${id}?w=800&h=320&fit=crop`;
  // Fallback: use Unsplash search via source
  return `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=320&fit=crop`;
};

const DestinationCard = ({ place }) => {
  const { setFavorites } = useTrip();
  const [weather, setWeather]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [saved,   setSaved]     = useState(false);

  useEffect(() => {
    if (!place) return;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 900));
        setWeather({
          temp: Math.floor(Math.random() * 18) + 18,
          condition: ["Sunny", "Partly Cloudy", "Rainy"][Math.floor(Math.random() * 3)]
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [place]);

  const handleSave = () => {
    setFavorites((prev) => {
      if (prev.find((f) => f.name === place)) return prev;
      return [...prev, { id: Date.now(), name: place, image: getPhotoUrl(place), saved: true }];
    });
    setSaved(true);
  };

  const WeatherIcon = () => {
    if (!weather) return null;
    if (weather.condition === "Sunny")        return <Sun className="h-7 w-7 text-amber-500" />;
    if (weather.condition === "Rainy")        return <CloudRain className="h-7 w-7 text-blue-500" />;
    return <Cloud className="h-7 w-7 text-slate-400" />;
  };

  if (!place) return null;

  return (
    <div className="cream-card grain-el overflow-hidden rounded-[24px]">
      {/* Banner — city-specific photo */}
      <div className="h-40 relative overflow-hidden mx-2 mt-2 rounded-[18px]">
        <img
          src={getPhotoUrl(place)}
          alt={place}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white drop-shadow-lg">
          <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-2xl font-black" style={{ fontFamily: "Playfair Display, serif" }}>
            {place}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--ink-muted)" }}>
              Destination
            </p>
            <p className="text-lg font-black" style={{ color: "var(--ink)", fontFamily: "Playfair Display, serif" }}>
              {place}
            </p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm transition-all ${
              saved ? "btn-ink" : "btn-sage"
            }`}
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            {saved ? "Saved!" : "Save"}
          </button>
        </div>

        {/* Weather */}
        <div
          className="rounded-2xl p-4 flex items-center justify-between grain-el"
          style={{
            backgroundColor: "var(--cream-dark)",
            border: "1.5px solid rgba(140,120,100,0.14)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)"
          }}
        >
          <div>
            <h4 className="font-black text-sm flex items-center gap-1.5 mb-1" style={{ color: "var(--ink-muted)" }}>
              <Thermometer className="h-4 w-4" /> Local Weather
            </h4>
            {loading ? (
              <p className="text-sm font-bold animate-pulse" style={{ color: "var(--ink-muted)" }}>
                Fetching forecast…
              </p>
            ) : weather ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black" style={{ color: "var(--ink)" }}>{weather.temp}°C</span>
                <span className="text-sm font-semibold" style={{ color: "var(--ink-muted)" }}>{weather.condition}</span>
              </div>
            ) : (
              <p className="text-sm" style={{ color: "var(--ink-muted)" }}>Unavailable</p>
            )}
          </div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center grain-el"
            style={{
              backgroundColor: "var(--cream-light)",
              boxShadow: "0 3px 10px rgba(100,80,60,0.1), inset 0 1px 0 rgba(255,255,255,0.8)"
            }}
          >
            <WeatherIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
