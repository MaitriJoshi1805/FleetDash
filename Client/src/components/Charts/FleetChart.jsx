import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function FleetChart() {
  const fleetData = [
    {
      day: "Mon",
      vehicles: 42,
    },
    {
      day: "Tue",
      vehicles: 58,
    },
    {
      day: "Wed",
      vehicles: 35,
    },
    {
      day: "Thu",
      vehicles: 67,
    },
    {
      day: "Fri",
      vehicles: 82,
    },
    {
      day: "Sat",
      vehicles: 51,
    },
    {
      day: "Sun",
      vehicles: 29,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full">
      
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Fleet Activity Dynamics
        </h2>

        <p className="text-slate-400 text-lg mt-2">
          Weekly active vehicle deployment pattern
        </p>
      </div>

      {/* ================= CHART ================= */}

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={fleetData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#334155"
              vertical={true}
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#94a3b8",
                fontSize: 16,
              }}
              axisLine={{
                stroke: "#64748b",
              }}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fill: "#94a3b8",
                fontSize: 16,
              }}
              axisLine={{
                stroke: "#64748b",
              }}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(59,130,246,0.08)",
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#ffffff",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: "600",
              }}
              formatter={(value) => [
                `${value} vehicles`,
                "Active Vehicles",
              ]}
            />

            <Bar
              dataKey="vehicles"
              fill="#3b82f6"
              radius={[7, 7, 0, 0]}
              barSize={100}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FleetChart;