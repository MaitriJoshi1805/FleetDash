import { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";
import { useSettings } from "../../context/SettingsContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { settings, t } = useSettings();

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [search, setSearch] = useState("");

  const notifications = [
    {
      id: 1,
      title: "Overspeed Alert",
      message: "TRUCK-104 exceeded 80 km/h",
      time: "Recently",
      type: "Critical",
    },
    {
      id: 2,
      title: "Low Fuel Alert",
      message: "Vehicle GJ05XY5678 has low fuel",
      time: "15 min ago",
      type: "Warning",
    },
    {
      id: 3,
      title: "Geofence Alert",
      message: "Vehicle exited the assigned geofence",
      time: "25 min ago",
      type: "Warning",
    },
  ];

  const menuItems = [
    {
      name: t("dashboard"),
      path: "/dashboard",
      keywords: "dashboard डैशबोर्ड ડેશબોર્ડ",
    },
    {
      name: t("vehicles"),
      path: "/vehicles",
      keywords: "vehicles vehicle वाहन વાહન",
    },
    {
      name: t("drivers"),
      path: "/drivers",
      keywords: "drivers driver ड्राइवर ડ્રાઇવર",
    },
    {
      name: t("trips"),
      path: "/trips",
      keywords: "trips trip यात्रा ટ્રિપ",
    },
    {
      name: t("alerts"),
      path: "/alerts",
      keywords: "alerts alert अलर्ट એલર્ટ",
    },
    {
      name: t("settings"),
      path: "/settings",
      keywords: "settings setting सेटिंग્સ સેટિંગ્સ",
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    `${item.name} ${item.keywords}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev);
    setShowNotifications(false);
  };

  const handleViewAllAlerts = () => {
    setShowNotifications(false);
    navigate("/alerts");
  };

  const handleProfile = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  const handleSettings = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
  };

  return (
    <header
      className={`h-20 px-8 flex items-center justify-between border-b relative z-[1000] ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      {/* ================= LEFT ================= */}

      <div>
        <h1 className="text-3xl font-bold">
          {t("fleetDashboard")}
        </h1>

        <p
          className={
            theme === "dark"
              ? "text-sm text-slate-400"
              : "text-sm text-gray-600"
          }
        >
          {t("monitorFleet")}
        </p>
      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex items-center gap-5">

        {/* ================= SEARCH ================= */}

        <div className="relative">

          <div
            className={`flex items-center rounded-xl px-4 py-2 ${
              theme === "dark"
                ? "bg-slate-800"
                : "bg-gray-100 border border-gray-300"
            }`}
          >
            <FaSearch className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder={t("search")}
              className={`ml-2 bg-transparent outline-none w-44 ${
                theme === "dark"
                  ? "text-white placeholder:text-slate-500"
                  : "text-gray-900 placeholder:text-gray-500"
              }`}
            />
          </div>

          {search && filteredItems.length > 0 && (
            <div
              className={`absolute top-12 left-0 w-64 rounded-xl shadow-2xl border z-[10000] overflow-hidden ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-gray-300"
              }`}
            >
              {filteredItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => {
                    setSearch("");
                    navigate(item.path);
                  }}
                  className={`w-full text-left px-4 py-3 ${
                    theme === "dark"
                      ? "hover:bg-slate-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= NOTIFICATION ================= */}

        <div className="relative z-[9999]">

          <button
            type="button"
            onClick={handleNotificationClick}
            className={`relative p-3 rounded-xl cursor-pointer transition ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <FaBell
              className={`text-lg pointer-events-none ${
                theme === "dark"
                  ? "text-white"
                  : "text-gray-800"
              }`}
            />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center pointer-events-none">
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
            <div
              className={`absolute right-0 top-14 w-96 rounded-xl shadow-2xl border overflow-hidden z-[10000] ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">

                <h3 className="font-bold">
                  {t("notifications")}
                </h3>

                <span className="text-xs text-slate-400">
                  {notifications.length} alerts
                </span>

              </div>

              <div className="max-h-80 overflow-y-auto">

                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={handleViewAllAlerts}
                    className={`px-4 py-4 border-b cursor-pointer ${
                      theme === "dark"
                        ? "border-slate-800 hover:bg-slate-800"
                        : "border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex gap-3">

                      <div
                        className={`p-2 rounded-lg ${
                          notification.type === "Critical"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-amber-500/20 text-amber-500"
                        }`}
                      >
                        <FaExclamationTriangle />
                      </div>

                      <div className="flex-1">

                        <p className="font-semibold text-sm">
                          {notification.title}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {notification.message}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {notification.time}
                        </p>

                      </div>

                    </div>
                  </div>
                ))}

              </div>

              <button
                type="button"
                onClick={handleViewAllAlerts}
                className="w-full py-3 text-sm font-semibold text-blue-500 hover:bg-slate-800"
              >
                {t("viewAllAlerts")}
              </button>

            </div>
          )}
        </div>

        {/* ================= THEME ================= */}

        <button
          type="button"
          onClick={toggleTheme}
          className={`p-3 rounded-xl transition ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* ================= ADMIN ================= */}

        <div className="relative">

          <button
            type="button"
            onClick={handleProfileClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
            }`}
          >
            <MdAccountCircle
              size={42}
              className="text-blue-500"
            />

            <div className="text-left">

              <h3 className="font-semibold">
                {settings.profile.name || t("admin")}
              </h3>

              <p className="text-xs text-slate-400">
                {t("fleetManager")}
              </p>

            </div>
          </button>

          {/* PROFILE DROPDOWN */}

          {showProfile && (
            <div
              className={`absolute right-0 top-16 w-64 rounded-xl border shadow-2xl z-[10000] overflow-hidden ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-gray-300"
              }`}
            >

              <div className="p-4 border-b border-slate-700">

                <div className="flex items-center gap-3">

                  <MdAccountCircle
                    size={48}
                    className="text-blue-500"
                  />

                  <div>

                    <p className="font-semibold">
                      {settings.profile.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {settings.profile.email}
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={handleProfile}
                className="w-full text-left px-4 py-3 hover:bg-slate-800"
              >
                {t("profile")}
              </button>

              <button
                type="button"
                onClick={handleSettings}
                className="w-full text-left px-4 py-3 hover:bg-slate-800"
              >
                {t("settings")}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-slate-800"
              >
                {t("logout")}
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;