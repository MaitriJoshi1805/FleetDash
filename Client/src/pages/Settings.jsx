import { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaTruck,
  FaChartBar,
  FaGlobe,
  FaDatabase,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

import { useSettings } from "../context/SettingsContext";

function Settings() {
  const {
    settings,
    updateSettings,
  } = useSettings();

  const [message, setMessage] = useState("");

  // Temporary local form values
  const [systemPreferences, setSystemPreferences] = useState({
    language: settings.language,
    timezone: settings.timezone,
    theme: settings.theme,
  });

  const [dashboardPreferences, setDashboardPreferences] =
    useState({
      showLiveMap: settings.showLiveMap,
      showFleetChart: settings.showFleetChart,
      showVehicleTable: settings.showVehicleTable,
      showRecentAlerts: settings.showRecentAlerts,
    });

  const showSuccess = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // ================= SYSTEM =================

  const handleSystemChange = (e) => {
    const { name, value } = e.target;

    setSystemPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveSystemPreferences = () => {
    updateSettings(systemPreferences);

    showSuccess("System preferences saved successfully!");
  };

  // ================= DASHBOARD =================

  const handleDashboardChange = (name) => {
    setDashboardPreferences((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const saveDashboardPreferences = () => {
    updateSettings(dashboardPreferences);

    showSuccess(
      "Dashboard preferences saved successfully!"
    );
  };

  return (
    <div className="space-y-6 pb-10">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="text-slate-400">
          Manage your FleetDash system configuration
        </p>
      </div>

      {/* ================= SUCCESS MESSAGE ================= */}

      {message && (
        <div className="fixed top-24 right-6 z-[9999]">
          <div className="flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl">
            <FaCheckCircle />
            <span>{message}</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= PROFILE ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaUser className="text-blue-500 text-2xl" />

            <h2 className="text-xl font-semibold text-white">
              Profile
            </h2>
          </div>

          <div className="space-y-4">

            <input
              className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
              placeholder="Admin Name"
              defaultValue="Admin"
            />

            <input
              className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
              placeholder="Email"
              defaultValue="admin@fleetdash.com"
            />

            <input
              className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
              placeholder="Phone"
              defaultValue="+91 9876543210"
            />

            <button
              type="button"
              onClick={() =>
                showSuccess("Profile saved successfully!")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <FaSave />
              Save Profile
            </button>

          </div>
        </div>

        {/* ================= SECURITY ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaLock className="text-red-500 text-2xl" />

            <h2 className="text-xl font-semibold text-white">
              Security
            </h2>
          </div>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
            />

            <label className="flex items-center justify-between bg-slate-800 text-white p-3 rounded-lg">
              <span>
                Enable Two-Factor Authentication
              </span>

              <input type="checkbox" />
            </label>

            <button
              type="button"
              onClick={() =>
                showSuccess("Password updated successfully!")
              }
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <FaSave />
              Update Password
            </button>

          </div>
        </div>

        {/* ================= FLEET SETTINGS ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaTruck className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold text-white">
              Fleet Settings
            </h2>
          </div>

          <div className="space-y-4">

            <input
              className="w-full bg-slate-800 text-white p-3 rounded-lg"
              defaultValue="80 km/h"
              placeholder="Default Speed Limit"
            />

            <input
              className="w-full bg-slate-800 text-white p-3 rounded-lg"
              defaultValue="20%"
              placeholder="Fuel Warning Level"
            />

            <input
              className="w-full bg-slate-800 text-white p-3 rounded-lg"
              defaultValue="5000 KM"
              placeholder="Maintenance Interval"
            />

            <input
              className="w-full bg-slate-800 text-white p-3 rounded-lg"
              defaultValue="5 sec"
              placeholder="GPS Refresh Rate"
            />

            <button
              type="button"
              onClick={() =>
                showSuccess(
                  "Fleet settings saved successfully!"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <FaSave />
              Save Fleet Settings
            </button>

          </div>
        </div>

        {/* ================= NOTIFICATIONS ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">
            <FaBell className="text-yellow-400 text-2xl" />

            <h2 className="text-xl font-semibold text-white">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">

            {[
              ["Email Alerts", true],
              ["SMS Alerts", false],
              ["Push Notifications", true],
              ["Overspeed Alerts", true],
              ["Low Fuel Alerts", true],
            ].map(([label, checked]) => (
              <label
                key={label}
                className="flex justify-between bg-slate-800 text-white p-3 rounded-lg"
              >
                <span>{label}</span>

                <input
                  type="checkbox"
                  defaultChecked={checked}
                />
              </label>
            ))}

            <button
              type="button"
              onClick={() =>
                showSuccess(
                  "Notification settings saved successfully!"
                )
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >
              <FaSave />
              Save Notifications
            </button>

          </div>
        </div>

        {/* ================================================= */}
        {/* DASHBOARD PREFERENCES */}
        {/* ================================================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaChartBar className="text-cyan-400 text-2xl" />

            <h2 className="text-xl font-semibold text-white">
              Dashboard Preferences
            </h2>

          </div>

          <div className="space-y-4">

            {/* LIVE MAP */}

            <label className="flex items-center justify-between bg-slate-800 text-white p-4 rounded-lg cursor-pointer">

              <span>
                Show Live Map
              </span>

              <input
                type="checkbox"
                checked={dashboardPreferences.showLiveMap}
                onChange={() =>
                  handleDashboardChange("showLiveMap")
                }
                className="w-5 h-5"
              />

            </label>

            {/* FLEET CHART */}

            <label className="flex items-center justify-between bg-slate-800 text-white p-4 rounded-lg cursor-pointer">

              <span>
                Show Fleet Chart
              </span>

              <input
                type="checkbox"
                checked={dashboardPreferences.showFleetChart}
                onChange={() =>
                  handleDashboardChange("showFleetChart")
                }
                className="w-5 h-5"
              />

            </label>

            {/* VEHICLE TABLE */}

            <label className="flex items-center justify-between bg-slate-800 text-white p-4 rounded-lg cursor-pointer">

              <span>
                Show Vehicle Table
              </span>

              <input
                type="checkbox"
                checked={
                  dashboardPreferences.showVehicleTable
                }
                onChange={() =>
                  handleDashboardChange(
                    "showVehicleTable"
                  )
                }
                className="w-5 h-5"
              />

            </label>

            {/* RECENT ALERTS */}

            <label className="flex items-center justify-between bg-slate-800 text-white p-4 rounded-lg cursor-pointer">

              <span>
                Show Recent Alerts
              </span>

              <input
                type="checkbox"
                checked={
                  dashboardPreferences.showRecentAlerts
                }
                onChange={() =>
                  handleDashboardChange(
                    "showRecentAlerts"
                  )
                }
                className="w-5 h-5"
              />

            </label>

            {/* SAVE */}

            <button
              type="button"
              onClick={saveDashboardPreferences}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >

              <FaSave />

              Save Dashboard

            </button>

          </div>
        </div>

        {/* ================================================= */}
        {/* SYSTEM PREFERENCES */}
        {/* ================================================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaGlobe className="text-green-500 text-2xl" />

            <h2 className="text-xl font-semibold text-white">
              System Preferences
            </h2>

          </div>

          <div className="space-y-4">

            {/* LANGUAGE */}

            <div>

              <label className="block mb-2 text-slate-400">
                Language
              </label>

              <select
                name="language"
                value={systemPreferences.language}
                onChange={handleSystemChange}
                className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Gujarati</option>
              </select>

            </div>

            {/* TIMEZONE */}

            <div>

              <label className="block mb-2 text-slate-400">
                Time Zone
              </label>

              <select
                name="timezone"
                value={systemPreferences.timezone}
                onChange={handleSystemChange}
                className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
              >
                <option value="Asia/Kolkata">
                  Asia/Kolkata
                </option>

                <option value="UTC">
                  UTC
                </option>
              </select>

            </div>

            {/* THEME */}

            <div>

              <label className="block mb-2 text-slate-400">
                Theme
              </label>

              <select
                name="theme"
                value={systemPreferences.theme}
                onChange={handleSystemChange}
                className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
              >
                <option>Dark</option>
                <option>Light</option>
              </select>

            </div>

            <button
              type="button"
              onClick={saveSystemPreferences}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
            >

              <FaSave />

              Save Preferences

            </button>

          </div>
        </div>

        {/* ================= BACKUP ================= */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <FaDatabase className="text-purple-500 text-2xl" />

            <h2 className="text-xl font-semibold text-white">
              Backup & Export
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              onClick={() =>
                showSuccess(
                  "Vehicles exported successfully!"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Export Vehicles
            </button>

            <button
              type="button"
              onClick={() =>
                showSuccess(
                  "Drivers exported successfully!"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Export Drivers
            </button>

            <button
              type="button"
              onClick={() =>
                showSuccess(
                  "Trips exported successfully!"
                )
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg"
            >
              Export Trips
            </button>

            <button
              type="button"
              onClick={() =>
                showSuccess(
                  "Database backup started!"
                )
              }
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg"
            >
              Backup Database
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;