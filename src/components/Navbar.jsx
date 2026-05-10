import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, Map, Image as ImageIcon, LogIn, LogOut, Settings, Bookmark, User, Sun, Moon, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { isDark, toggle } = useTheme();
  const currentUser = JSON.parse(localStorage.getItem("travel_current_user") || "null");

  const [dropOpen,     setDropOpen]     = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dropRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) { setDropOpen(false); setSettingsOpen(false); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("travel_current_user");
    setDropOpen(false);
    navigate("/login");
  };

  const links = [
    { name: "Home",    path: "/",        icon: Compass },
    { name: "Planner", path: "/planner", icon: Map },
    { name: "Journal", path: "/journal", icon: ImageIcon },
  ];

  const initials = currentUser
    ? currentUser.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()
    : null;

  return (
    <nav
      className="sticky top-0 z-[999] w-full grain-el"
      style={{
        backgroundColor: "var(--cream-light)",
        borderBottom: "1.5px solid rgba(140,120,100,0.18)",
        boxShadow: "0 2px 12px rgba(100,80,60,0.08)"
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center grain-el"
            style={{ backgroundColor:"var(--ink)", boxShadow:"0 4px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
            <Compass className="w-5 h-5 text-white"/>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block font-black text-2xl tracking-tighter" style={{ fontFamily:"Playfair Display,serif", color:"var(--ink)" }}>
              PLOINK
            </span>
            {/* Blinking Eyes */}
            <div className="flex gap-1 items-center">
              {[0, 1].map((i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full relative overflow-hidden flex items-center justify-center grain-el" 
                  style={{ backgroundColor: isDark ? "#ffffff" : "var(--ink)" }}>
                  {/* Eye Lid (The part that moves) */}
                  <div className="absolute inset-0 z-10 animate-blink eye-lid" 
                    style={{ 
                      backgroundColor: isDark ? "#000000" : "var(--cream)",
                      transformOrigin: "top" 
                    }} />
                  {/* Pupil */}
                  <div className="w-1.5 h-1.5 bg-black rounded-full z-0" 
                    style={{ backgroundColor: isDark ? "#000000" : "#000000" }} />
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
                  isActive ? "btn-sage text-[#1c2e1c]" : "hover:bg-black/5"
                )}
                style={!isActive ? { color:"var(--ink-muted)" } : {}}
              >
                <Icon className="h-4 w-4"/>
                <span className="hidden sm:inline">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Auth / Profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {currentUser ? (
            <div className="relative inline-block" ref={dropRef}>
              {/* Profile avatar — rounded square */}
              <button
                onClick={() => { setDropOpen(d=>!d); setSettingsOpen(false); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black grain-el transition-all hover:scale-105 profile-avatar"
                style={{
                  backgroundColor: "var(--ink)",
                  color: "var(--cream)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)"
                }}
              >
                {initials}
              </button>
              {/* Dropdown — GitHub Style Alignment */}
              {dropOpen && (
                <div
                  className="absolute right-0 top-14 w-64 rounded-2xl overflow-hidden grain-el z-[1000] origin-top-right animate-in fade-in zoom-in duration-200"
                  style={{
                    backgroundColor: isDark ? "var(--cream-light)" : "#ffffff",
                    border: "1.5px solid rgba(140,120,100,0.22)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.22)"
                  }}
                >
                  {/* User Account Header */}
                  <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(140,120,100,0.12)" }}>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-50" style={{ color: "var(--ink)" }}>Signed in as</p>
                    <p className="font-black text-base truncate" style={{ color: "var(--ink)" }}>{currentUser.name}</p>
                    <p className="text-xs font-medium truncate opacity-60" style={{ color: "var(--ink-muted)" }}>{currentUser.email}</p>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <Link to="/profile" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full transition-all hover:bg-black/5"
                      style={{ color: "var(--ink)" }}>
                      <User className="h-4 w-4" style={{ color: "var(--sage)" }} />
                      Your Profile
                    </Link>
                    
                    <Link to="/saved" onClick={() => setDropOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full transition-all hover:bg-black/5"
                      style={{ color: "var(--ink)" }}>
                      <Bookmark className="h-4 w-4" style={{ color: "var(--lavender)" }} />
                      Your Saved Trips
                    </Link>

                    <div className="h-px mx-2 my-1" style={{ backgroundColor: "rgba(140,120,100,0.12)" }} />

                    <button
                      onClick={() => setSettingsOpen(s => !s)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold w-full transition-all hover:bg-black/5"
                      style={{ color: "var(--ink)" }}
                    >
                      <Settings className="h-4 w-4 opacity-60" />
                      Settings
                      <ChevronDown className={cn("h-3.5 w-3.5 ml-auto transition-transform duration-300", settingsOpen && "rotate-180")} />
                    </button>

                    {settingsOpen && (
                      <div className="mx-2 mb-2 p-3 rounded-xl space-y-3" style={{ backgroundColor: "rgba(0,0,0,0.03)", border: "1.5px solid rgba(140,120,100,0.08)" }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Theme</span>
                          <div className="flex items-center gap-1 p-1 rounded-lg bg-black/5">
                            <button onClick={() => isDark && toggle()} className={cn("px-2 py-1 rounded-md transition-all text-[10px] font-black", !isDark ? "bg-white shadow-sm text-black" : "opacity-40 text-current")}>
                              LIGHT
                            </button>
                            <button onClick={() => !isDark && toggle()} className={cn("px-2 py-1 rounded-md transition-all text-[10px] font-black", isDark ? "bg-white shadow-sm text-black" : "opacity-40 text-current")}>
                              DARK
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="h-px mx-2 my-1" style={{ backgroundColor: "rgba(140,120,100,0.12)" }} />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black w-full text-red-500 transition-all hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold btn-ink">
              <LogIn className="w-3.5 h-3.5"/>
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
