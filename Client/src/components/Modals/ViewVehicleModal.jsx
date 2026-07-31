function ViewVehicleModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Vehicle Details
        </h2>

        <div className="space-y-3 text-slate-300">

          <p><b>Vehicle No:</b> {vehicle.vehicleNo}</p>
          <p><b>Type:</b> {vehicle.type}</p>
          <p><b>Driver:</b> {vehicle.driver}</p>
          <p><b>Phone:</b> {vehicle.phone}</p>
          <p><b>Fuel:</b> {vehicle.fuel}%</p>
          <p><b>Speed:</b> {vehicle.speed} km/h</p>
          <p><b>Status:</b> {vehicle.status}</p>
          <p><b>Location:</b> {vehicle.location}</p>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default ViewVehicleModal;