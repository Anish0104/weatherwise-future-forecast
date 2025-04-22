
// Mock data for development

// Current sensor data
export const mockSensorData = {
  rainfall: {
    value: 2.5,
    unit: "mm",
    trend: "up", // up, down, stable
    lastUpdated: new Date().toISOString(),
  },
  moisture: {
    value: 68,
    unit: "%",
    trend: "stable",
    lastUpdated: new Date().toISOString(),
  },
  humidity: {
    value: 85,
    unit: "%",
    trend: "up",
    lastUpdated: new Date().toISOString(),
  },
  pressure: {
    value: 1012,
    unit: "hPa",
    trend: "down",
    lastUpdated: new Date().toISOString(),
  }
};

// Generate hourly prediction data
const generateHourlyData = (
  startValue: number,
  variance: number,
  hours: number
) => {
  const data = [];
  let currentValue = startValue;

  for (let i = 0; i < hours; i++) {
    const time = new Date();
    time.setHours(time.getHours() + i);
    
    // Add some randomness to the value
    currentValue += (Math.random() * variance * 2) - variance;
    
    // Ensure value stays reasonable
    currentValue = Math.max(0, currentValue);
    
    data.push({
      time: time.toISOString(),
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return data;
};

// Prediction data for each parameter
export const mockPredictionData = {
  rainfall: generateHourlyData(2.5, 0.5, 24),
  moisture: generateHourlyData(68, 3, 24),
  humidity: generateHourlyData(85, 5, 24),
  pressure: generateHourlyData(1012, 2, 24),
};

// Weather regions in India for the map
export const indiaRegions = [
  { 
    name: "Delhi",
    position: [28.6139, 77.2090],
    current: "Partly Cloudy",
    rainfall: 0,
    humidity: 65,
  },
  { 
    name: "Mumbai",
    position: [19.0760, 72.8777], 
    current: "Thunderstorm",
    rainfall: 15,
    humidity: 90,
  },
  { 
    name: "Chennai",
    position: [13.0827, 80.2707], 
    current: "Clear",
    rainfall: 0,
    humidity: 78,
  },
  { 
    name: "Kolkata",
    position: [22.5726, 88.3639], 
    current: "Heavy Rain",
    rainfall: 25,
    humidity: 92,
  },
  { 
    name: "Bangalore",
    position: [12.9716, 77.5946], 
    current: "Moderate Rain",
    rainfall: 8,
    humidity: 82,
  },
  { 
    name: "Hyderabad",
    position: [17.3850, 78.4867], 
    current: "Light Rain",
    rainfall: 3,
    humidity: 70,
  }
];

// Array of historical weather events
export const weatherEvents = [
  {
    id: 1,
    type: "Heavy Rainfall",
    date: "2023-06-15",
    location: "Mumbai",
    intensity: "Severe",
    description: "Mumbai experienced severe flooding due to 235mm rainfall in 24 hours"
  },
  {
    id: 2,
    type: "Cyclone",
    date: "2023-05-04",
    location: "Odisha Coast",
    intensity: "High",
    description: "Cyclone Mocha caused significant damage with wind speeds up to 150 km/h"
  },
  {
    id: 3,
    type: "Heat Wave",
    date: "2023-04-10",
    location: "Rajasthan",
    intensity: "Extreme",
    description: "Temperatures reached 48°C, breaking 10-year record"
  }
];
