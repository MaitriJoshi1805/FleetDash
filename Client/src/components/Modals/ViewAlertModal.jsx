function ViewAlertModal({ alert, onClose }) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Alert Details
        </h2>

        <div className="space-y-4">

          <p><strong>Type:</strong> {alert.type}</p>

          <p><strong>Vehicle:</strong> {alert.vehicle}</p>

          <p><strong>Message:</strong> {alert.message}</p>

          <p><strong>Time:</strong> {alert.time}</p>

          <p><strong>Status:</strong> {alert.status}</p>

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

export default ViewAlertModal;