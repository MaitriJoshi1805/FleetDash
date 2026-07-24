import {
  MdDashboard,
  MdDirectionsCar,
  MdWarning,
  MdSettings,
} from "react-icons/md";

import { FaRoute } from "react-icons/fa";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: MdDashboard,
  },
  {
    title: "Vehicles",
    icon: MdDirectionsCar,
  },
  {
    title: "Trips",
    icon: FaRoute,
  },
  {
    title: "Alerts",
    icon: MdWarning,
  },
  {
    title: "Settings",
    icon: MdSettings,
  },
];