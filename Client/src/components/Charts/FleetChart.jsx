import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";


function FleetChart() {
  const { theme } = useTheme();

  const [data, setData] = useState([
  { day: "Mon", trips: 32 },
  { day: "Tue", trips: 45 },
  { day: "Wed", trips: 38 },
  { day: "Thu", trips: 52 },
  { day: "Fri", trips: 48 },
  { day: "Sat", trips: 61 },
  { day: "Sun", trips: 29 },
]);


  return (
    <div
      className={`rounded-2xl p-6 border ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-gray-300"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Weekly Trips
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="5 5"
            stroke={theme === "dark" ? "#334155" : "#d1d5db"}
          />

          <XAxis
            dataKey="day"
            stroke={theme === "dark" ? "#94a3b8" : "#475569"}
          />

          <YAxis
            stroke={theme === "dark" ? "#94a3b8" : "#475569"}
            domain={[0, 100]}
          />

          <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            borderRadius: "10px",
            border: "none",
          }}/>

          <Bar
            dataKey="trips"
            fill="#3b82f6"
            radius={[10, 10, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FleetChart;