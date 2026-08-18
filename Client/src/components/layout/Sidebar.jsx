import {
  MdDashboard,
  MdDirectionsCar,
  MdNotifications,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import {
  FaTruckMoving,
  FaRoute,
  FaUserTie,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";
import { useSettings } from "../../context/SettingsContext";

function Sidebar() {
  const navigate = useNavigate();

  const { theme } = useTheme();

  const { settings, t } = useSettings();

  const menuItems = [
    {
      name: t("dashboard"),
      path: "/dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      name: t("vehicles"),
      path: "/vehicles",
      icon: <MdDirectionsCar size={22} />,
    },
    {
      name: t("drivers"),
      path: "/drivers",
      icon: <FaUserTie size={20} />,
    },
    {
      name: t("trips"),
      path: "/trips",
      icon: <FaRoute size={20} />,
    },
    {
      name: t("alerts"),
      path: "/alerts",
      icon: <MdNotifications size={22} />,
    },
    {
      name: t("settings"),
      path: "/settings",
      icon: <MdSettings size={22} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/", {
      replace: true,
    });
  };

  return (
    <aside
      className={`w-72 flex flex-col border-r min-h-screen ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      {/* ================= LOGO ================= */}

      <div
        className={`h-20 flex items-center justify-center border-b ${
          theme === "dark"
            ? "border-slate-800"
            : "border-gray-300"
        }`}
      >
        <div className="flex items-center gap-3">

          <FaTruckMoving className="text-4xl text-blue-500" />

          <div>

            <h1 className="text-2xl font-bold">
              {t("fleetDash")}
            </h1>

            <p className="text-xs text-slate-400">
              {t("fleetMonitoring")}
            </p>

          </div>
        </div>
      </div>

      {/* ================= MENU ================= */}

      <nav className="flex-1 px-5 py-8 space-y-3">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 shadow-lg text-white"
                  : theme === "dark"
                  ? "hover:bg-slate-800"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {item.icon}

            <span>
              {item.name}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* ================= USER ================= */}

      <div
        className={`border-t p-5 ${
          theme === "dark"
            ? "border-slate-800"
            : "border-gray-300"
        }`}
      >

        <div
          className={`rounded-xl p-4 ${
            theme === "dark"
              ? "bg-slate-800"
              : "bg-gray-100"
          }`}
        >

          <h3 className="font-semibold">
            {settings.profile.name || t("admin")}
          </h3>

          <p className="text-sm text-slate-400">
            {t("fleetManager")}
          </p>

          <button
            onClick={handleLogout}
            type="button"
            className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition text-white"
          >
            <MdLogout size={20} />

            {t("logout")}
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;