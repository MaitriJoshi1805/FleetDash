import {
  MdDashboard,
  MdDirectionsCar,
  MdNotifications,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { FaTruckMoving, FaRoute } from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    icon: <MdDashboard size={22} />,
    active: true,
  },
  {
    name: "Vehicles",
    icon: <MdDirectionsCar size={22} />,
  },
  {
    name: "Trips",
    icon: <FaRoute size={20} />,
  },
  {
    name: "Alerts",
    icon: <MdNotifications size={22} />,
  },
  {
    name: "Settings",
    icon: <MdSettings size={22} />,
  },
];

function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 text-white flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800">
        <div className="flex items-center gap-3">
          <FaTruckMoving className="text-4xl text-blue-500" />

          <div>
            <h1 className="text-2xl font-bold">
              FleetDash
            </h1>

            <p className="text-xs text-slate-400">
              Fleet Monitoring
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-5 py-8 space-y-3">

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
            ${
              item.active
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}

            <span className="font-medium">
              {item.name}
            </span>
          </button>
        ))}

      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800 p-5">

        <div className="bg-slate-800 rounded-xl p-4">

          <h3 className="font-semibold">
            Admin
          </h3>

          <p className="text-sm text-slate-400">
            Fleet Manager
          </p>

          <button className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition">
            <MdLogout size={20} />
            Logout
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;