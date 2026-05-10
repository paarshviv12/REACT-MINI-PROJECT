import React from "react";
import { Camera, Calendar } from "lucide-react";

const JournalMockup = () => {
  return (
    <div className="w-[320px] sm:w-[380px] h-[650px] bg-white rounded-[40px] shadow-2xl border-[8px] border-white/80 overflow-hidden flex flex-col relative mx-auto transform transition-all hover:-translate-y-2 hover:shadow-3xl font-sans">
      
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex items-center justify-between border-b">
        <button className="text-muted-foreground"><span className="text-xl">✕</span></button>
        <h2 className="font-bold text-lg">New journal</h2>
        <button className="text-teal-600 font-bold">Publish</button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        
        {/* Photo Selection */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 flex-shrink-0 text-muted-foreground hover:bg-gray-200 cursor-pointer transition-colors">
            <Camera className="h-6 w-6" />
          </div>
          
          {[
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=200&fit=crop"
          ].map((url, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border">
              <img src={url} alt={`Selection ${i}`} className="w-full h-full object-cover" />
              <button className="absolute top-1 right-1 w-5 h-5 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-[10px] font-bold">✕</button>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-start border-b border-gray-100 pb-2">
            <input 
              type="text" 
              placeholder="Title" 
              className="text-xl font-bold bg-transparent focus:outline-none w-full placeholder:text-gray-300"
              value="Day 3-5: Koh Phangan"
              readOnly
            />
            <button className="flex items-center gap-1.5 text-xs font-semibold bg-gray-100 px-3 py-1.5 rounded-full text-muted-foreground whitespace-nowrap">
              <Calendar className="h-3 w-3" /> Date
            </button>
          </div>
          
          <textarea 
            placeholder="What did you do in Koh Phangan?"
            className="w-full h-40 bg-transparent focus:outline-none resize-none text-muted-foreground leading-relaxed"
            readOnly
            value="Spent the day beach-hopping—started at Kelingking Beach, that famous cliff view is even better in real life. The water at Crystal Bay was unreal, perfect for a quick swim and snorkel. Ended the day watching the sunset at Broken Beach, the whole place felt like a dream! \n\n12 - 16 Sep '24"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="p-6 border-t bg-gray-50 flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Not ready to publish yet?</span>
        <button className="font-bold text-teal-600">Save as draft</button>
      </div>

    </div>
  );
};

export default JournalMockup;
