import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", vehicles: 90 },
  { day: "Tue", vehicles: 105 },
  { day: "Wed", vehicles: 98 },
  { day: "Thu", vehicles: 120 },
  { day: "Fri", vehicles: 115 },
  { day: "Sat", vehicles: 125 },
  { day: "Sun", vehicles: 130 },
];

function FleetChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-5 h-[450px]">

      <h2 className="text-xl font-bold text-white mb-6">
        Fleet Activity
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />

          <XAxis dataKey="day" stroke="#94a3b8" />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="vehicles"
            stroke="#3b82f6"
            strokeWidth={4}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default FleetChart;