function ViewVehicleModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6">
          Vehicle Details
        </h2>

        <div className="space-y-3 text-slate-300">
          <p><strong>Vehicle No:</strong> {vehicle.vehicleNo}</p>
          <p><strong>Type:</strong> {vehicle.type}</p>
          <p><strong>Driver:</strong> {vehicle.driver}</p>
          <p><strong>Phone:</strong> {vehicle.phone}</p>
          <p><strong>Fuel:</strong> {vehicle.fuel}%</p>
          <p><strong>Speed:</strong> {vehicle.speed} km/h</p>
          <p><strong>Status:</strong> {vehicle.status}</p>
          <p><strong>Location:</strong> {vehicle.location}</p>
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