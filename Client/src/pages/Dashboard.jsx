import DashboardCards from "../components/DashboardCards/DashboardCards";
import LiveMap from "../components/Map/LiveMap";
import LiveActivity from "../components/LiveActivity";
import MapView from "../components/MapView";
import FleetChart from "../components/Charts/FleetChart";
import VehicleTable from "../components/VehicleTable/VehicleTable";

import { useSettings } from "../context/SettingsContext";

function Dashboard() {
  const { settings } = useSettings();

  // Safe fallback in case dashboard settings are missing
  const dashboardSettings = settings?.dashboard || {
    showLiveMap: true,
    showFleetChart: true,
    showVehicleTable: true,
    showRecentAlerts: true,
  };

  return (
    <div className="space-y-6">

      {/* ================= DASHBOARD CARDS ================= */}
      <DashboardCards />

      {/* ================= MAP + LIVE ACTIVITY ================= */}
      {(dashboardSettings.showLiveMap ||
        dashboardSettings.showRecentAlerts) && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* MAP */}
          {dashboardSettings.showLiveMap && (
            <div className="xl:col-span-2 space-y-6">
              <LiveMap />
              <MapView />
            </div>
          )}

          {/* RECENT ALERTS / LIVE ACTIVITY */}
          {dashboardSettings.showRecentAlerts && (
            <div
              className={
                dashboardSettings.showLiveMap
                  ? ""
                  : "xl:col-span-3"
              }
            >
              <LiveActivity />
            </div>
          )}
        </div>
      )}

      {/* ================= FLEET CHART ================= */}
      {dashboardSettings.showFleetChart && <FleetChart />}

      {/* ================= VEHICLE TABLE ================= */}
      {dashboardSettings.showVehicleTable && <VehicleTable />}

      {/* ================= NOTHING SELECTED ================= */}
      {!dashboardSettings.showLiveMap &&
        !dashboardSettings.showFleetChart &&
        !dashboardSettings.showVehicleTable &&
        !dashboardSettings.showRecentAlerts && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-xl font-semibold text-white">
              Dashboard sections are hidden
            </h2>

            <p className="text-slate-400 mt-2">
              Go to Settings → Dashboard Preferences and enable
              the sections you want to display.
            </p>
          </div>
        )}
    </div>
  );
}

export default Dashboard;