
import { useState } from "react";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SensorCard } from "@/components/sensor-card";
import { ForecastChart } from "@/components/forecast-chart";
import { mockSensorData, mockPredictionData } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { IndiaMap } from "@/components/india-map";

// Mumbai region data for map demo
const mumbaiRegion = [
  {
    name: "Mumbai",
    position: [19.076, 72.8777] as [number, number],
    current: "Scattered Clouds",
    rainfall: 12.2,
    humidity: 81,
    moisture: 39,
    pressure: 1012,
  }
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState<"rainfall" | "moisture" | "humidity" | "pressure">("rainfall");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const parameterUnits = {
    rainfall: "mm",
    moisture: "%",
    humidity: "%",
    pressure: "hPa",
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-background to-primary/10">
        <Sidebar isOpen={sidebarOpen} />
        <div 
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-[240px]' : 'ml-0'}`}
        >
          <Header isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="container mx-auto px-4 py-6">
            <div className="grid gap-6">
              {/* Sensor Cards Section */}
              <section style={{ "--delay": 1 } as React.CSSProperties} className="dashboard-section">
                <h2 className="text-2xl font-bold mb-4">Live Sensor Data</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SensorCard
                    type="rainfall"
                    value={mockSensorData.rainfall.value}
                    unit={mockSensorData.rainfall.unit}
                    trend={mockSensorData.rainfall.trend as any}
                    lastUpdated={mockSensorData.rainfall.lastUpdated}
                    delay={0}
                  />
                  <SensorCard
                    type="moisture"
                    value={mockSensorData.moisture.value}
                    unit={mockSensorData.moisture.unit}
                    trend={mockSensorData.moisture.trend as any}
                    lastUpdated={mockSensorData.moisture.lastUpdated}
                    delay={1}
                  />
                  <SensorCard
                    type="humidity"
                    value={mockSensorData.humidity.value}
                    unit={mockSensorData.humidity.unit}
                    trend={mockSensorData.humidity.trend as any}
                    lastUpdated={mockSensorData.humidity.lastUpdated}
                    delay={2}
                  />
                  <SensorCard
                    type="pressure"
                    value={mockSensorData.pressure.value}
                    unit={mockSensorData.pressure.unit}
                    trend={mockSensorData.pressure.trend as any}
                    lastUpdated={mockSensorData.pressure.lastUpdated}
                    delay={3}
                  />
                </div>
              </section>

              {/* Forecast Chart Section */}
              <section style={{ "--delay": 3 } as React.CSSProperties} className="dashboard-section">
                <div className="bg-card p-6 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Hourly Forecast</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(["rainfall", "moisture", "humidity", "pressure"] as const).map((param) => (
                      <button
                        key={param}
                        onClick={() => setSelectedParameter(param)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedParameter === param
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {param.charAt(0).toUpperCase() + param.slice(1)}
                      </button>
                    ))}
                  </div>
                  <ForecastChart 
                    data={mockPredictionData[selectedParameter]}
                    parameter={selectedParameter}
                    unit={parameterUnits[selectedParameter]}
                  />
                </div>
              </section>

              {/* Map Section (Mumbai) */}
              <section style={{ "--delay": 5 } as React.CSSProperties} className="dashboard-section">
                <div className="bg-card p-6 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Mumbai Weather Map</h2>
                  <p className="mb-4 text-muted-foreground">
                    Interactive map showing live sensor conditions in Mumbai.
                  </p>
                  <div className="h-[400px] w-full">
                    <IndiaMap 
                      regions={mumbaiRegion}
                      center={[19.076, 72.8777]}
                      zoom={11}
                    />
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="mt-8 text-center text-sm text-muted-foreground">
                <p>WeatherWise: Real-Time Forecasting System</p>
                <p className="mt-1">© {new Date().getFullYear()} - Final Year Project</p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
