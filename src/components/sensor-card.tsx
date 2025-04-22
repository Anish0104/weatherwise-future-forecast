
import { motion } from "framer-motion";
import { 
  RainfallIcon, 
  MoistureIcon, 
  HumidityIcon, 
  PressureIcon 
} from "./ui/icons";

interface SensorCardProps {
  type: "rainfall" | "moisture" | "humidity" | "pressure";
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  delay?: number;
}

// Icon mapping based on sensor type
const iconMap = {
  rainfall: RainfallIcon,
  moisture: MoistureIcon,
  humidity: HumidityIcon,
  pressure: PressureIcon,
};

// Color mapping based on sensor type
const colorMap = {
  rainfall: "from-blue-400/20 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-700/10",
  moisture: "from-green-400/20 to-green-600/10 dark:from-green-500/20 dark:to-green-700/10",
  humidity: "from-purple-400/20 to-purple-600/10 dark:from-purple-500/20 dark:to-purple-700/10",
  pressure: "from-amber-400/20 to-amber-600/10 dark:from-amber-500/20 dark:to-amber-700/10",
};

// Title mapping
const titleMap = {
  rainfall: "Rainfall",
  moisture: "Soil Moisture",
  humidity: "Humidity",
  pressure: "Pressure",
};

export function SensorCard({
  type,
  value,
  unit,
  trend,
  lastUpdated,
  delay = 0,
}: SensorCardProps) {
  // Get the appropriate icon component
  const Icon = iconMap[type];
  
  // Format the last updated time
  const formattedTime = new Date(lastUpdated).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Trend icon and color
  const trendIcon = {
    up: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-green-500"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    ),
    down: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-red-500"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),
    stable: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M5 12h14" />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`sensor-card glow-effect bg-gradient-to-br ${colorMap[type]}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary/10 mr-3">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-lg">{titleMap[type]}</h3>
          </div>
          <div className="flex items-center">
            {trendIcon[trend]}
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-end">
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-lg ml-1 mb-1 text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className="mt-auto pt-4 text-xs text-muted-foreground">
          Last updated: {formattedTime}
        </div>
      </div>
    </motion.div>
  );
}
