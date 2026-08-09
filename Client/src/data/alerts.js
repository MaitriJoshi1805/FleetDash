const initialAlerts = [
  {
    id: 1,
    type: "Overspeed",
    vehicle: "GJ05AB1234",
    message: "Vehicle exceeded 100 km/h",
    time: "10:15 AM",
    status: "Unread",
  },
  {
    id: 2,
    type: "Low Fuel",
    vehicle: "GJ01XY5678",
    message: "Fuel level below 15%",
    time: "11:40 AM",
    status: "Unread",
  },
  {
    id: 3,
    type: "Maintenance",
    vehicle: "GJ18CD8899",
    message: "Service due in 100 km",
    time: "01:20 PM",
    status: "Resolved",
  },
];

export default initialAlerts;