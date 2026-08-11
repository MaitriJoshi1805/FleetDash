import {
  MdDashboard,
  MdDirectionsCar,
  MdNotifications,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { FaTruckMoving, FaRoute, FaUserTie } from "react-icons/fa";
import { NavLink,useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";


const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard size={22} />,
  },
  {
    name: "Vehicles",
    path: "/vehicles",
    icon: <MdDirectionsCar size={22} />,
  },
  {
    name: "Drivers",
    path: "/drivers",
    icon: <FaUserTie size={20} />,
  },
  {
    name: "Trips",
    path: "/trips",
    icon: <FaRoute size={20} />,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: <MdNotifications size={22} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <MdSettings size={22} />,
  },
];

function Sidebar() {

    const navigate = useNavigate();
    const { theme } = useTheme();

    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      alert("Logged Out");
      navigate("/", { replace: true });
    };

  return (

    
    <aside
      className={`w-72 flex flex-col border-r ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}>

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
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
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

          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
          >
            <MdLogout size={20} />
            Logout
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;