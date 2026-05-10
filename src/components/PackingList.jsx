import React, { useState, useMemo } from "react";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Luggage, 
  Plus,
  Zap,
  CloudRain,
  Sun,
  Thermometer,
  RotateCcw
} from "lucide-react";
import { useTrip } from "../context/TripContext";
import { cn } from "../lib/utils";
import { GlassCard } from "./ui/GlassCard";
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatedContainer, AnimatedItem } from "./ui/AnimatedContainer";

export default function PackingList() {
  const { destination, packingItems, togglePackingItem, addPackingItem } = useTrip();
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addPackingItem({ label: newItem, category: "Custom" });
    setNewItem("");
  };

  const completionRate = packingItems.length > 0 ? Math.round((packingItems.filter(i => i.checked).length / packingItems.length) * 100) : 0;

  const categories = useMemo(() => {
    const cats = Array.from(new Set(packingItems.map(i => i.category)));
    return cats.length > 0 ? cats : ["Essentials", "Electronics", "Clothing", "Toiletries", "Custom"];
  }, [packingItems]);

  // Mock weather for demonstration since we don't have AI backend
  const mockWeather = {
    temp: "24°C",
    condition: "Sunny and clear",
    warnings: null
  };

  return (
    <AnimatedContainer className="max-w-4xl mx-auto space-y-12 pb-20 w-full px-4">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <SectionHeader 
          title={`${destination.name || 'Trip'} Preparation`} 
          subtitle="A high-fidelity checklist engineered for your expedition." 
          align="left" 
          badge="Smart Assistant Active" 
        />
        <GlassCard className="px-8 py-6 text-right w-full md:w-auto" gradient>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Readiness Score</p>
          <p className="text-4xl font-black text-teal-600">{completionRate}%</p>
        </GlassCard>
      </header>

      {/* Atmospheric Insights */}
      <AnimatedItem>
        <GlassCard className="p-8 relative overflow-hidden group border-teal-100 bg-teal-50/30" gradient>
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sun size={120} className="text-teal-600" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="h-20 w-20 rounded-[2rem] bg-white flex flex-col items-center justify-center shadow-sm">
              <Thermometer className="h-6 w-6 text-teal-500" />
              <span className="text-xs font-black text-gray-900 mt-1">{mockWeather.temp}</span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h3 className="text-xl font-bold text-gray-900">Atmospheric Analysis</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                Current historical forecast for {destination.name || 'your destination'} indicates {mockWeather.condition}. Pack light, breathable clothing and sun protection.
              </p>
            </div>
          </div>
        </GlassCard>
      </AnimatedItem>

      <AnimatedItem>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documents Input */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">Add to Documents</label>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const val = e.target.elements.docInput.value;
                if (!val.trim()) return;
                addPackingItem({ label: val, category: "Documents" });
                e.target.reset();
              }} 
              className="flex gap-2"
            >
              <input 
                name="docInput"
                type="text" 
                placeholder="Passport, Visa..." 
                className="flex-1 h-14 bg-white border border-gray-200 rounded-xl px-6 text-sm font-bold focus:outline-none focus:border-teal-500 transition-all" 
              />
              <button type="submit" className="h-14 w-14 rounded-xl bg-teal-500 flex items-center justify-center text-white hover:bg-teal-600 shadow-lg shadow-teal-500/10 transition-colors">
                <Plus className="h-6 w-6" />
              </button>
            </form>
          </div>

          {/* Essentials Input */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">Add to Essentials</label>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const val = e.target.elements.essInput.value;
                if (!val.trim()) return;
                addPackingItem({ label: val, category: "Essentials" });
                e.target.reset();
              }} 
              className="flex gap-2"
            >
              <input 
                name="essInput"
                type="text" 
                placeholder="Charger, Meds..." 
                className="flex-1 h-14 bg-white border border-gray-200 rounded-xl px-6 text-sm font-bold focus:outline-none focus:border-sage transition-all" 
              />
              <button type="submit" className="h-14 w-14 rounded-xl bg-sage flex items-center justify-center text-white hover:bg-sage-dark shadow-lg shadow-sage/10 transition-colors">
                <Plus className="h-6 w-6" />
              </button>
            </form>
          </div>
        </div>
      </AnimatedItem>

      <div className="space-y-16">
        {["Documents", "Essentials"].map((cat) => {
          const catItems = packingItems.filter(i => i.category === cat);
          return (
            <AnimatedItem key={cat} className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                  <div className="h-1 w-8 bg-teal-500/30 rounded-full" />
                  <h4 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">{cat}</h4>
                </div>
                {/* Category specific add button placeholder if needed */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catItems.map((item) => (
                  <GlassCard 
                    key={item.id} 
                    className={cn(
                      "p-5 flex items-center justify-between group transition-all duration-300", 
                      item.checked ? "bg-gray-50/50 opacity-60" : "bg-white hover:border-teal-200 shadow-sm"
                    )} 
                  >
                    <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => togglePackingItem(item.id)}>
                      <div className={cn(
                        "h-6 w-6 rounded-lg flex items-center justify-center transition-all border-2", 
                        item.checked 
                          ? "bg-teal-500 border-teal-500 text-white" 
                          : "border-gray-200 text-transparent"
                      )}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className={cn(
                        "text-sm font-bold transition-all", 
                        item.checked ? "text-gray-400 line-through" : "text-gray-700"
                      )}>
                        {item.label}
                      </span>
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); deletePackingItem(item.id); }}
                      className="p-2 text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <RotateCcw className="h-3.5 w-3.5 rotate-45" />
                    </button>
                  </GlassCard>
                ))}
              </div>
            </AnimatedItem>
          );
        })}
      </div>
    </AnimatedContainer>
  );
}
