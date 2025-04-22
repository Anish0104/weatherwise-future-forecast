
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

interface DataPoint {
  time: string;
  value: number;
}

interface ForecastChartProps {
  data: DataPoint[];
  parameter: "rainfall" | "moisture" | "humidity" | "pressure";
  unit: string;
}

const colorMap = {
  rainfall: "#1EAEDB",
  moisture: "#4ADE80",
  humidity: "#9b87f5",
  pressure: "#F59E0B",
};

const nameMap = {
  rainfall: "Rainfall",
  moisture: "Soil Moisture",
  humidity: "Humidity",
  pressure: "Atmospheric Pressure",
};

export function ForecastChart({
  data,
  parameter,
  unit,
}: ForecastChartProps) {
  const [opacity, setOpacity] = useState(1);

  // Format the time for display on the chart
  const formattedData = data.map((point) => ({
    ...point,
    formattedTime: new Date(point.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="formattedTime"
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            unit={unit}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
          />
          <Legend
            onMouseEnter={() => setOpacity(0.5)}
            onMouseLeave={() => setOpacity(1)}
          />
          <Line
            type="monotone"
            dataKey="value"
            name={`${nameMap[parameter]} (${unit})`}
            stroke={colorMap[parameter]}
            strokeWidth={3}
            dot={{ r: 2, strokeWidth: 2 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            opacity={opacity}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
