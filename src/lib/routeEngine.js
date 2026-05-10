// Heuristic Engine for Journey Generation

const MAJOR_INDIAN_CITIES = ["mumbai", "delhi", "bangalore", "bengaluru", "chennai", "kolkata", "hyderabad", "pune", "ahmedabad", "jaipur", "surat", "lucknow", "kanpur", "nagpur", "indore", "thane", "bhopal", "visakhapatnam", "pimpri-chinchwad", "patna", "vadodara", "ghaziabad", "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "kalyan-dombivli", "vasai-virar", "varanasi", "srinagar", "aurangabad", "dhanbad", "amritsar", "navi mumbai", "allahabad", "howrah", "ranchi", "gwalior", "jabalpur", "coimbatore", "vijayawada", "jodhpur", "madurai", "raipur", "kota", "guwahati", "chandigarh", "solapur", "hubli-dharwad", "bareilly", "moradabad", "mysore", "gurgaon", "aligarh", "jalandhar", "tiruchirappalli", "bhubaneswar", "salem", "mira-bhayandar", "warangal", "thiruvananthapuram", "guntur", "bhiwandi", "saharanpur", "gorakhpur", "bikaner", "amravati", "noida", "jamshedpur", "bhilai", "cuttack", "firozabad", "kochi", "nellore", "bhavnagar", "dehradun", "durgapur", "asansol", "roukela", "nanded", "kolhapur", "ajmer", "akola", "gulbarga", "jamnagar", "ujjain", "loni", "siliguri", "jhansi", "ulhasnagar", "jammu", "sangli-miraj & kupwad", "mangalore", "erode", "belgaum", "ambattur", "tirunelveli", "malegaon", "gaya", "jalgaon", "udaipur", "maheshtala"];
const INT_HUBS = ["tokyo", "london", "new york", "dubai", "paris", "singapore", "bangkok", "sydney", "toronto", "los angeles", "chicago", "san francisco", "amsterdam", "frankfurt", "hong kong", "seoul", "istanbul", "rome", "madrid", "barcelona", "kuala lumpur", "bali"];

// Helpers
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getCategory = (from, to) => {
  const f = from.toLowerCase();
  const t = to.toLowerCase();
  
  const isInt = INT_HUBS.some(hub => f.includes(hub) || t.includes(hub));
  if (isInt) return "INTERNATIONAL";
  
  const isDomFrom = MAJOR_INDIAN_CITIES.some(city => f.includes(city));
  const isDomTo = MAJOR_INDIAN_CITIES.some(city => t.includes(city));
  
  if (isDomFrom && isDomTo && f !== t) return "DOMESTIC";
  
  return "LOCAL";
};

// Generators
const generateInternational = () => {
  return [
    {
      id: 1, type: "Direct Flight", reachBy: `+1 Day 0${rand(6, 9)}:00 AM`, 
      duration: `~${rand(8, 14)}h 30m`, cost: rand(35000, 80000), modes: ["walk", "plane", "walk"]
    },
    {
      id: 2, type: "1-Stop Flight", reachBy: `+1 Day 0${rand(1, 5)}:00 PM`, 
      duration: `~${rand(15, 24)}h 15m`, cost: rand(25000, 45000), modes: ["walk", "plane", "walk", "plane", "walk"]
    }
  ];
};

const generateDomestic = () => {
  return [
    {
      id: 1, type: "Direct Flight", reachBy: `0${rand(1, 9)}:00 PM`, 
      duration: `~${rand(1, 3)}h ${rand(10, 50)}m`, cost: rand(3500, 9000), modes: ["walk", "plane", "walk"]
    },
    {
      id: 2, type: "Premium Train (AC)", reachBy: `+1 Day 0${rand(6, 11)}:00 AM`, 
      duration: `~${rand(12, 18)}h`, cost: rand(1500, 3500), modes: ["walk", "train", "walk"]
    },
    {
      id: 3, type: "Sleeper Bus", reachBy: `+1 Day 0${rand(7, 10)}:00 AM`, 
      duration: `~${rand(14, 20)}h`, cost: rand(800, 2000), modes: ["walk", "bus", "walk"]
    }
  ];
};

const generateLocal = () => {
  return [
    {
      id: 1, type: "Metro/Walk", reachBy: `In ~${rand(15, 45)} mins`, 
      duration: `~${rand(15, 45)} min`, cost: rand(10, 60), modes: ["walk", "metro", "walk"]
    },
    {
      id: 2, type: "Cab/Auto", reachBy: `In ~${rand(20, 60)} mins`, 
      duration: `~${rand(20, 60)} min`, cost: rand(150, 500), modes: ["walk", "bus", "walk"] // using bus icon for cab for now
    },
    {
      id: 3, type: "Local Bus", reachBy: `In ~${rand(40, 80)} mins`, 
      duration: `~${rand(40, 80)} min`, cost: rand(15, 30), modes: ["walk", "bus", "walk"]
    }
  ];
};

export const generateRoutes = (from, to) => {
  if (!from || !to) return [];
  const category = getCategory(from, to);
  
  if (category === "INTERNATIONAL") return generateInternational();
  if (category === "DOMESTIC") return generateDomestic();
  return generateLocal();
};
