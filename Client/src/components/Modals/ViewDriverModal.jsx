function ViewDriverModal({ driver, onClose }) {
  if (!driver) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Driver Details
        </h2>

        <div className="space-y-3 text-slate-300">

          <p><strong>Name:</strong> {driver.name}</p>
          <p><strong>Phone:</strong> {driver.phone}</p>
          <p><strong>License:</strong> {driver.license}</p>
          <p><strong>Experience:</strong> {driver.experience}</p>
          <p><strong>Assigned Vehicle:</strong> {driver.vehicle}</p>
          <p><strong>Status:</strong> {driver.status}</p>

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

export default ViewDriverModal;