import { useEffect, useState } from "react";
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
import { getDashboardStatsApi } from "../../services/api";

function FleetChart({ initialChartData }) {
  const [chartData, setChartData] = useState(initialChartData || []);

  useEffect(() => {
    if (initialChartData && initialChartData.length > 0) {
      setChartData(initialChartData);
    } else {
      getDashboardStatsApi()
        .then((res) => {
          if (res.data && res.data.chartData) {
            setChartData(res.data.chartData);
          }
        })
        .catch((err) => console.error("Error fetching fleet chart data:", err));
    }
  }, [initialChartData]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-5 h-[450px] flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">
          Fleet Activity Dynamics
        </h2>
        <p className="text-xs text-slate-400">Weekly active vehicle deployment pattern</p>
      </div>

      <div className="w-full h-[340px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="vehicles"
              stroke="#3b82f6"
              strokeWidth={4}
              dot={{ fill: "#3b82f6", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
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