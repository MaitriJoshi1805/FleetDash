function ViewVehicleModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Vehicle Details
        </h2>

        <div className="space-y-4 text-slate-300">
          <p>
            <strong>Vehicle No:</strong> {vehicle.vehicleNo}
          </p>

          <p>
            <strong>Type:</strong> {vehicle.type}
          </p>

          <p>
            <strong>Driver:</strong> {vehicle.driver}
          </p>

          <p>
            <strong>Phone:</strong> {vehicle.phone}
          </p>

          <p>
            <strong>Fuel:</strong> {vehicle.fuel}%
          </p>

          <p>
            <strong>Speed:</strong> {vehicle.speed} km/h
          </p>

          <p>
            <strong>Status:</strong> {vehicle.status}
          </p>
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

          <p>
            <strong>Location:</strong> {vehicle.location}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewVehicleModal;