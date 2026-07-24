import DashboardCards from "../components/DashboardCards/DashboardCards";
import MapPlaceholder from "../components/Map/MapPlaceholder";
import FleetChart from "../components/Charts/FleetChart";
import VehicleTable from "../components/VehicleTable/VehicleTable";

function Dashboard() {
  return (
    <div className="space-y-6">

      <DashboardCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <MapPlaceholder />
        </div>

        <FleetChart />
      </div>

      <VehicleTable />

    </div>
  );
}

export default Dashboard;