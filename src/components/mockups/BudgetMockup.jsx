import React from "react";
import { Check, X, Grid, ToggleRight } from "lucide-react";

const BudgetMockup = () => {
  return (
    <div className="w-[320px] sm:w-[380px] h-[650px] bg-white rounded-[40px] shadow-2xl border-[8px] border-white/80 overflow-hidden flex flex-col relative mx-auto transform transition-all hover:-translate-y-2 hover:shadow-3xl font-sans">
      
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex items-center justify-between border-b relative z-10 bg-white">
        <button className="text-muted-foreground"><X className="h-5 w-5"/></button>
        <h2 className="font-bold text-lg">New expense</h2>
        <button className="text-yellow-500 font-bold">Save</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Amount Input */}
        <div className="px-6 py-8 border-b border-gray-100 flex justify-between items-center">
          <div>
            <div className="flex items-start gap-2">
              <span className="text-3xl font-bold">€</span>
              <span className="text-5xl font-extrabold tracking-tight">12</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold">EUR ∨</span>
              <span>= € 12,00</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Grid className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wide">Category</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-6 py-4 space-y-6">
          
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <span className="text-muted-foreground text-xl">📝</span>
            <input type="text" value="Dinner" className="flex-1 bg-transparent focus:outline-none font-medium" readOnly/>
          </div>
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-gray-700">Status</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-teal-500">Paid</span>
              <ToggleRight className="h-6 w-6 text-teal-500" />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xl">👥</span>
              <span className="font-medium text-gray-700">Split the bill</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">Everyone 1x</span>
              <span className="text-lg">›</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xl">📅</span>
              <span className="font-medium text-gray-700">Date</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-sm text-teal-600 font-medium">19 Sep 2024</span>
              <span className="text-lg">›</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Fake Keyboard */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#D1D5DB] px-1 pb-6 pt-2 z-20">
        {/* Autocomplete bar */}
        <div className="flex justify-between px-4 mb-2 text-sm font-medium border-b border-gray-300 pb-2">
          <span>I</span>
          <span>The</span>
          <span>I'm</span>
        </div>
        
        <div className="flex justify-center gap-1 mb-2 px-1">
          {['q','w','e','r','t','y','u','i','o','p'].map(k => (
            <div key={k} className="bg-white rounded w-full aspect-[2/3] flex items-center justify-center text-lg shadow-sm">{k}</div>
          ))}
        </div>
        <div className="flex justify-center gap-1 mb-2 px-4">
          {['a','s','d','f','g','h','j','k','l'].map(k => (
            <div key={k} className="bg-white rounded w-full aspect-[2/3] flex items-center justify-center text-lg shadow-sm">{k}</div>
          ))}
        </div>
        <div className="flex justify-center gap-1 mb-2 px-1 relative">
          <div className="bg-[#AEB3BC] rounded w-10 flex items-center justify-center shadow-sm">⇧</div>
          {['z','x','c','v','b','n','m'].map(k => (
            <div key={k} className="bg-white rounded flex-1 aspect-[2/3] flex items-center justify-center text-lg shadow-sm">{k}</div>
          ))}
          <div className="bg-[#AEB3BC] rounded w-10 flex items-center justify-center shadow-sm">⌫</div>
        </div>
        <div className="flex justify-center gap-1 px-1 h-10">
          <div className="bg-[#AEB3BC] rounded w-12 flex items-center justify-center shadow-sm text-xs font-bold">123</div>
          <div className="bg-[#AEB3BC] rounded w-10 flex items-center justify-center shadow-sm">😊</div>
          <div className="bg-white rounded flex-1 flex items-center justify-center shadow-sm text-sm font-medium">space</div>
          <div className="bg-blue-500 text-white rounded w-16 flex items-center justify-center shadow-sm text-sm font-bold">done</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetMockup;
