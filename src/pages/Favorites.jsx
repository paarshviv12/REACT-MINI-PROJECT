import React from "react";
import { useTrip } from "../context/TripContext";
import { Card, CardContent } from "../components/ui/card";
import { MapPin, Heart } from "lucide-react";

const Favorites = () => {
  const { favorites } = useTrip();
  
  // Using Array.filter() as requested
  const savedPlaces = favorites.filter(place => place.saved);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-destructive" />
        <h1 className="text-4xl font-bold">Favorite Places</h1>
      </div>
      
      {savedPlaces.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">You haven't saved any favorite places yet.</p>
          <p className="mt-2">Go to the planner and save a destination to see it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPlaces.map(place => (
            <Card key={place.id} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden bg-muted">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur rounded-full p-2 text-destructive shadow-sm">
                  <Heart className="h-5 w-5 fill-current" />
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> {place.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
