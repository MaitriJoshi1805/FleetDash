import { FaTruck, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const activities = [
  {
    id: 1,
    icon: <FaTruck className="text-blue-500" />,
    text: "Truck GJ05AB1234 started trip",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-green-500" />,
    text: "Driver SP completed delivery",
    time: "8 min ago",
  },
  {
    id: 3,
    icon: <FaExclamationTriangle className="text-yellow-500" />,
    text: "Fuel level low - Truck GJ05XY5678",
    time: "15 min ago",
  },
  {
    id: 4,
    icon: <FaTruck className="text-blue-500" />,
    text: "Truck GJ05CD9012 entered Surat",
    time: "25 min ago",
  },
];

function LiveActivity() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-5">
        Live Activity
      </h2>

      <div className="space-y-4">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-slate-800 pb-3"
          >
            <div className="flex items-center gap-3">
              {item.icon}

              <div>
                <p>{item.text}</p>
                <p className="text-xs text-slate-400">
                  {item.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveActivity;