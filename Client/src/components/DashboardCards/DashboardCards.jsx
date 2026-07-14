import {
  FaTruckMoving,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Vehicles",
    value: "154",
    change: "+12%",
    icon: <FaTruckMoving size={28} />,
    bg: "bg-blue-600",
  },
  {
    title: "Online",
    value: "132",
    change: "+5%",
    icon: <FaCheckCircle size={28} />,
    bg: "bg-green-600",
  },
  {
    title: "Offline",
    value: "22",
    change: "-2%",
    icon: <FaTimesCircle size={28} />,
    bg: "bg-red-600",
  },
  {
    title: "Alerts",
    value: "05",
    change: "+1",
    icon: <FaExclamationTriangle size={28} />,
    bg: "bg-orange-500",
  },
];

function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">{item.title}</p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {item.value}
              </h2>

              <p className="text-green-400 text-sm mt-2">
                {item.change} Today
              </p>
            </div>

            <div className={`${item.bg} p-4 rounded-xl text-white`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;