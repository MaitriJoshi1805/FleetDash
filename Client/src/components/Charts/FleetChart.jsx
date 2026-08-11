import { useEffect, useState } from "react";
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
import { useTheme } from "../../context/ThemeContext";

function FleetChart({ initialChartData }) {
  const { theme } = useTheme();

  const fallbackData = [
    { day: "Mon", trips: 32 },
    { day: "Tue", trips: 45 },
    { day: "Wed", trips: 38 },
    { day: "Thu", trips: 52 },
    { day: "Fri", trips: 48 },
    { day: "Sat", trips: 61 },
    { day: "Sun", trips: 29 },
  ];

  const [chartData, setChartData] = useState(
    initialChartData && initialChartData.length > 0
      ? initialChartData
      : fallbackData
  );

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        if (initialChartData && initialChartData.length > 0) {
          setChartData(initialChartData);
          return;
        }

        const res = await getDashboardStatsApi();

        console.log("Dashboard API Response:", res.data);

        if (
          res.data &&
          res.data.chartData &&
          res.data.chartData.length > 0
        ) {
          const apiData = res.data.chartData;

          // Convert API data to the format required by the chart
          const formattedData = apiData.map((item) => ({
            day: item.day,
            trips:
              item.trips ??
              item.vehicles ??
              item.activeVehicles ??
              0,
          }));

          setChartData(formattedData);
        } else {
          setChartData(fallbackData);
        }
      } catch (error) {
        console.error(
          "Error fetching fleet chart data:",
          error
        );

        setChartData(fallbackData);
      }
    };

    fetchChartData();
  }, [initialChartData]);

  return (
    <div
      className={`rounded-2xl p-6 border ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-gray-300"
      }`}
    >
      {/* Heading */}
      <h2
        className={`text-2xl font-bold mb-2 ${
          theme === "dark"
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        Fleet Activity Dynamics
      </h2>

      {/* Subtitle */}
      <p
        className={`mb-6 ${
          theme === "dark"
            ? "text-slate-400"
            : "text-gray-500"
        }`}
      >
        Weekly active vehicle deployment pattern
      </p>

      {/* Chart */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="5 5"
              stroke={
                theme === "dark"
                  ? "#334155"
                  : "#d1d5db"
              }
            />

            <XAxis
              dataKey="day"
              stroke={
                theme === "dark"
                  ? "#94a3b8"
                  : "#475569"
              }
            />

            <YAxis
              stroke={
                theme === "dark"
                  ? "#94a3b8"
                  : "#475569"
              }
              domain={[0, 100]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor:
                  theme === "dark"
                    ? "#1e293b"
                    : "#ffffff",
                borderRadius: "10px",
                border:
                  theme === "dark"
                    ? "1px solid #334155"
                    : "1px solid #d1d5db",
                color:
                  theme === "dark"
                    ? "#ffffff"
                    : "#000000",
              }}
            />

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
    </div>
  );
}

export default FleetChart;