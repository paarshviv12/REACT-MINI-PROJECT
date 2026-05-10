import React, { useState, useRef } from "react";
import { useTrip } from "../context/TripContext";
import { Image as ImageIcon, UploadCloud, X, Edit3 } from "lucide-react";

const Journal = () => {
  const { gallery, setGallery, updatePhotoCaption } = useTrip();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [editingCaption, setEditingCaption] = useState(false);
  const [captionText, setCaptionText] = useState("");
  const fileInputRef = useRef(null);

  const processFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: `photo-${Date.now()}-${Math.random()}`,
          url: e.target.result,
          caption: "New memory..."
        };
        setGallery(prev => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const openPhoto = (photo) => {
    setSelectedPhoto(photo);
    setCaptionText(photo.caption);
    setEditingCaption(false);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
    setEditingCaption(false);
  };

  const handleSaveCaption = () => {
    if (selectedPhoto) {
      updatePhotoCaption(selectedPhoto.id, captionText);
      setSelectedPhoto({ ...selectedPhoto, caption: captionText });
      setEditingCaption(false);
    }
  };

  return (
    <div className="min-h-screen grain-bg pt-8 pb-20" style={{ backgroundColor: "var(--cream)" }}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <ImageIcon className="h-8 w-8 text-teal-600" />
        <h1 className="text-4xl font-bold text-gray-900">Trip Journal</h1>
      </div>
      
      <p className="text-gray-600 mb-8 text-lg">
        Drag and drop your photos below to add them to your travel memories!
      </p>

      {/* Drag & Drop Upload Zone */}
      <div 
        className={`w-full p-10 rounded-3xl border-4 border-dashed transition-all duration-300 mb-12 flex flex-col items-center justify-center cursor-pointer ${
          isDragging 
            ? 'border-teal-500 bg-teal-50 scale-[1.02]' 
            : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <UploadCloud className={`h-10 w-10 ${isDragging ? 'text-teal-500' : 'text-gray-400'}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Drop your photos here</h3>
        <p className="text-sm text-gray-500">or click to browse from your device</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileInputChange} 
          className="hidden" 
          accept="image/*" 
          multiple 
        />
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
        {gallery.map((photo, index) => {
          const isLarge = index === 0 || index === 3;
          return (
            <div 
              key={photo.id} 
              className={`relative overflow-hidden rounded-2xl group shadow-sm bg-gray-100 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Grid Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm line-clamp-2">{photo.caption}</p>
              </div>

              {/* View Button Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" onClick={() => openPhoto(photo)}>
                <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/20 hover:scale-105 transition-transform">
                  View Photo
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/40 p-2 rounded-full transition-colors"
            onClick={closePhoto}
          >
            <X className="h-8 w-8" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center gap-6">
            <div className="relative w-full max-h-[75vh] flex justify-center">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Caption Area */}
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
              {editingCaption ? (
                <div className="flex flex-col gap-3">
                  <textarea 
                    value={captionText}
                    onChange={(e) => setCaptionText(e.target.value)}
                    className="w-full bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none min-h-[80px]"
                    placeholder="Write a caption for this memory..."
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setEditingCaption(false)}
                      className="px-4 py-2 rounded-xl text-white/70 hover:bg-white/10 text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveCaption}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold transition-colors shadow-lg"
                    >
                      Save Caption
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                    "{selectedPhoto.caption}"
                  </p>
                  <button 
                    onClick={() => setEditingCaption(true)}
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors bg-white/5 px-4 py-2 rounded-full hover:bg-white/10"
                  >
                    <Edit3 className="h-4 w-4" /> Edit Caption
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Journal;
