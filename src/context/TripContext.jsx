import React, { createContext, useContext, useState, useMemo } from "react";
import { convertToUSD } from "../lib/currencyUtils";

const TripContext = createContext();

export const useTrip = () => {
  return useContext(TripContext);
};

export const TripProvider = ({ children }) => {
  // Destination data. Mocking coordinates for the map view.
  const [destination, setDestination] = useState({
    name: "Paris",
    lat: 48.8566,
    lng: 2.3522
  });

  const [budget, setBudget] = useState(2000);


  // Day-by-Day Itinerary structure
  const [itinerary, setItinerary] = useState([
    {
      id: "day-1",
      dayNumber: 1,
      date: "Day 1",
      places: [
        { id: "p1", name: "Eiffel Tower", time: "10:00 AM", note: "Booked tickets online.", lat: 48.8584, lng: 2.2945 },
        { id: "p2", name: "Louvre Museum", time: "02:00 PM", note: "Mona Lisa visit.", lat: 48.8606, lng: 2.3376 },
      ]
    },
    {
      id: "day-2",
      dayNumber: 2,
      date: "Day 2",
      places: [
        { id: "p3", name: "Notre-Dame Cathedral", time: "09:30 AM", note: "Check out the architecture.", lat: 48.8529, lng: 2.3500 },
      ]
    }
  ]);

  const [packingList, setPackingList] = useState([]);
  const [packingItems, setPackingItems] = useState([
    // DOCUMENTS
    { id: "d1", label: "Passport / ID", category: "Documents", checked: false },
    { id: "d2", label: "Flight / Train Tickets", category: "Documents", checked: false },
    { id: "d3", label: "Hotel Bookings", category: "Documents", checked: false },
    { id: "d4", label: "Travel Insurance", category: "Documents", checked: false },
    // ESSENTIALS
    { id: "e1", label: "Phone Charger & Powerbank", category: "Essentials", checked: false },
    { id: "e2", label: "Universal Adapter", category: "Essentials", checked: false },
    { id: "e3", label: "First Aid Kit", category: "Essentials", checked: false },
    { id: "e4", label: "Water Bottle", category: "Essentials", checked: false },
  ]);

  const togglePackingItem = (id) => {
    setPackingItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addPackingItem = ({ label, category }) => {
    setPackingItems(prev => [
      ...prev,
      { id: Date.now().toString(), label, category, checked: false }
    ]);
  };

  const deletePackingItem = (id) => {
    setPackingItems(prev => prev.filter(item => item.id !== id));
  };
  const [currency, setCurrency] = useState("INR");
  const [favorites, setFavorites] = useState([]);
  
  const [gallery, setGallery] = useState([
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
      caption: "Amazing view of the mountains!"
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop",
      caption: "Loved this spot."
    }
  ]);

  const updatePhotoCaption = (id, newCaption) => {
    setGallery(prev => prev.map(photo => 
      photo.id === id ? { ...photo, caption: newCaption } : photo
    ));
  };

  const [bookings, setBookings] = useState([]);
  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const expenses = useMemo(() => {
    let exp = [];
    
    bookings?.forEach((b, i) => {
       const usdPrice = convertToUSD(b.price || 0, currency);
       exp.push({
         id: `booking-${i}`,
         description: b._type === "hotel" ? "Hotel" : "Transport",
         amount: usdPrice
       });
    });

    let itineraryCost = 0;
    itinerary?.forEach(day => {
       day?.places?.forEach(place => {
         itineraryCost += convertToUSD(1500, currency); // Approx 1500 per place
       });
    });

    if (itineraryCost > 0) {
      exp.push({
        id: "itinerary-est",
        description: "Activities (Est.)",
        amount: itineraryCost
      });
    }

    if (exp.length === 0) {
      exp = [
        { id: 1, description: "Flight (Mock)", amount: 800 },
        { id: 2, description: "Hotel (Mock)", amount: 600 }
      ];
    }
    return exp;
  }, [bookings, itinerary, currency]);

  const totalExpense = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]);

  // Mock function to add a place to a specific day with slightly randomized coordinates
  const addPlaceToDay = (dayId, placeName) => {
    // Generate slight offset from center for map demo
    const randomOffset = () => (Math.random() - 0.5) * 0.05;
    const newPlace = {
      id: Date.now().toString(),
      name: placeName,
      time: "TBD",
      note: "",
      lat: destination.lat + randomOffset(),
      lng: destination.lng + randomOffset()
    };

    setItinerary(prev => prev.map(day => {
      if (day.id === dayId) {
        return { ...day, places: [...day.places, newPlace] };
      }
      return day;
    }));
  };

  const removePlaceFromDay = (dayId, placeId) => {
    setItinerary(prev => prev.map(day => {
      if (day.id === dayId) {
        return { ...day, places: day.places.filter(p => p.id !== placeId) };
      }
      return day;
    }));
  };

  const addDay = () => {
    setItinerary(prev => [
      ...prev,
      {
        id: `day-${Date.now()}`,
        dayNumber: prev.length + 1,
        date: `Day ${prev.length + 1}`,
        places: []
      }
    ]);
  };
  // For backward compatibility
  const [activities, setActivities] = useState([]);

  const value = {
    destination,
    setDestination,
    budget,
    setBudget,
    expenses,
    activities,
    setActivities,
    itinerary,
    setItinerary,
    addPlaceToDay,
    removePlaceFromDay,
    addDay,
    packingList,
    setPackingList,
    favorites,
    setFavorites,
    gallery,
    setGallery,
    updatePhotoCaption,
    totalExpense,
    packingItems,
    togglePackingItem,
    addPackingItem,
    deletePackingItem,
    currency,
    setCurrency,
    bookings,
    addBooking
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
