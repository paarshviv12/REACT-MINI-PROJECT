import React from "react";
import { Check, Plus, Minus, Search, Mic } from "lucide-react";

const ChecklistMockup = () => {
  return (
    <div className="w-[320px] sm:w-[380px] h-[650px] bg-white rounded-[40px] shadow-2xl border-[8px] border-white/80 overflow-hidden flex flex-col relative mx-auto transform transition-all hover:-translate-y-2 hover:shadow-3xl font-sans">
      
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex items-center justify-between border-b">
        <button className="text-muted-foreground font-semibold">&lt;</button>
        <div className="text-center">
          <h2 className="font-bold text-lg leading-tight">Clothing</h2>
          <p className="text-xs text-muted-foreground">Individual list</p>
        </div>
        <button className="text-muted-foreground">
          <span className="text-xl">⚙️</span>
        </button>
      </div>

      {/* Progress */}
      <div className="px-6 py-4 flex items-center gap-3">
        <span className="text-sm font-bold text-pink-500">28%</span>
        <div className="flex-1 h-2 bg-pink-100 rounded-full overflow-hidden">
          <div className="h-full bg-pink-500 w-[28%] rounded-full" />
        </div>
      </div>

      {/* List Items */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-5">
        {[
          { name: "Sweater", checked: false, count: "1x" },
          { name: "T-Shirt", checked: false, count: "4x" },
          { name: "Tank Top", checked: false, count: "1x" },
          { name: "Top", checked: false, count: "1x" },
          { name: "Underwear", checked: false, count: "10x" },
          { name: "Bikini", checked: true, count: "4x", controls: true },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <button className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${item.checked ? 'bg-pink-100 border-pink-500 text-pink-500' : 'border-gray-300'}`}>
                {item.checked && <Check className="h-3 w-3" />}
              </button>
              <span className={`text-[15px] ${item.checked ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{item.name}</span>
            </div>
            
            {item.controls ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <button className="hover:text-foreground"><Minus className="h-3 w-3" /></button>
                <span className="text-sm font-medium w-4 text-center text-foreground">{item.count}</span>
                <button className="hover:text-foreground"><Plus className="h-3 w-3" /></button>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground font-medium">{item.count}</span>
            )}
          </div>
        ))}
      </div>

      {/* Fake Keyboard/Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-100 border-t rounded-b-[32px] overflow-hidden">
        <div className="p-3 bg-white">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Add item.." 
              className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-200 text-sm focus:outline-none"
              readOnly
            />
            <button className="absolute right-1 top-1 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center">
              <span className="text-lg font-bold leading-none">&gt;</span>
            </button>
          </div>
        </div>
        
        {/* Keyboard mockup */}
        <div className="bg-[#D1D5DB] px-1 pb-6 pt-2">
          <div className="flex justify-center gap-1 mb-2 px-1">
            {['Q','W','E','R','T','Y','U','I','O','P'].map(k => (
              <div key={k} className="bg-white rounded w-full aspect-[2/3] flex items-center justify-center text-sm font-medium shadow-sm">{k}</div>
            ))}
          </div>
          <div className="flex justify-center gap-1 mb-2 px-4">
            {['A','S','D','F','G','H','J','K','L'].map(k => (
              <div key={k} className="bg-white rounded w-full aspect-[2/3] flex items-center justify-center text-sm font-medium shadow-sm">{k}</div>
            ))}
          </div>
          <div className="flex justify-center gap-1 mb-2 px-1 relative">
            <div className="bg-[#AEB3BC] rounded w-10 flex items-center justify-center shadow-sm">⬆️</div>
            {['Z','X','C','V','B','N','M'].map(k => (
              <div key={k} className="bg-white rounded flex-1 aspect-[2/3] flex items-center justify-center text-sm font-medium shadow-sm">{k}</div>
            ))}
            <div className="bg-[#AEB3BC] rounded w-10 flex items-center justify-center shadow-sm">⌫</div>
          </div>
          <div className="flex justify-center gap-1 px-1 h-10">
            <div className="bg-[#AEB3BC] rounded w-12 flex items-center justify-center shadow-sm text-xs">123</div>
            <div className="bg-[#AEB3BC] rounded w-10 flex items-center justify-center shadow-sm">😊</div>
            <div className="bg-white rounded flex-1 flex items-center justify-center shadow-sm text-sm">space</div>
            <div className="bg-blue-500 text-white rounded w-16 flex items-center justify-center shadow-sm text-sm font-medium">go</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistMockup;
