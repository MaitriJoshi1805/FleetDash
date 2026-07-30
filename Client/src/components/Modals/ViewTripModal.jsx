function ViewTripModal({ trip, onClose }) {
  if (!trip) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Trip Details
        </h2>

        <div className="grid grid-cols-2 gap-5 text-slate-300">

          <div>
            <p className="text-slate-400">Trip ID</p>
            <p>{trip.tripId}</p>
          </div>

          <div>
            <p className="text-slate-400">Vehicle</p>
            <p>{trip.vehicle}</p>
          </div>

          <div>
            <p className="text-slate-400">Driver</p>
            <p>{trip.driver}</p>
          </div>

          <div>
            <p className="text-slate-400">Source</p>
            <p>{trip.source}</p>
          </div>

          <div>
            <p className="text-slate-400">Destination</p>
            <p>{trip.destination}</p>
          </div>

          <div>
            <p className="text-slate-400">Start Time</p>
            <p>{trip.startTime}</p>
          </div>

          <div>
            <p className="text-slate-400">End Time</p>
            <p>{trip.endTime}</p>
          </div>

          <div>
            <p className="text-slate-400">Status</p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                trip.status === "Running"
                  ? "bg-green-600"
                  : trip.status === "Pending"
                  ? "bg-yellow-500"
                  : "bg-blue-600"
              }`}
            >
              {trip.status}
            </span>

          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default ViewTripModal;