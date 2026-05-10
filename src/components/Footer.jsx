import React from "react";
import { Link } from "react-router-dom";


import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className="grain-black w-full" style={{ fontFamily: "DM Sans, sans-serif" }}>

      {/* ── Main footer content ──────────────── */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white" style={{ fontFamily: "Playfair Display, serif" }}>
              PLOINK
            </h3>
            <p className="text-white/50 text-sm font-medium leading-relaxed max-w-xs">
              Your personal travel companion for exploring India and beyond. Plan, budget, and dream.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Navigate</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "Planner", path: "/planner" },
                { label: "Journal", path: "/journal" },
                { label: "Login", path: "/login" },
              ].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="text-white/60 hover:text-white text-sm font-semibold transition-colors duration-200 w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Mantra</h4>
            <blockquote className="text-white/70 text-sm font-medium italic leading-relaxed border-l-2 border-white/20 pl-4">
              "The world is a book, and those who do not travel read only one page."
              <footer className="text-white/35 text-xs font-bold mt-2 not-italic">— Saint Augustine</footer>
            </blockquote>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/30 text-xs font-semibold">
            © {new Date().getFullYear()} PLOINK Planner. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-bold tracking-widest uppercase">
            Made with ♥ in India
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
