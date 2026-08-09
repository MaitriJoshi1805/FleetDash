import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
    </div>
  );
}

export default FleetChart;