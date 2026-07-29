import { useState, useEffect } from "react";

function AddTripModal({ isOpen, onClose, onSave, editingTrip }) {
  const emptyForm = {
    tripId: "",
    vehicle: "",
    driver: "",
    source: "",
    destination: "",
    startTime: "",
    endTime: "",
    status: "Pending",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingTrip) {
      setFormData(editingTrip);
    } else {
      setFormData(emptyForm);
    }
  }, [editingTrip]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave({
      ...editingTrip,
      ...formData,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-700 p-6">

        <h2 className="text-2xl font-bold mb-6">
          {editingTrip ? "Edit Trip" : "Add Trip"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input name="tripId" placeholder="Trip ID" value={formData.tripId} onChange={handleChange} className="bg-slate-800 p-3 rounded-lg" />

          <input name="vehicle" placeholder="Vehicle" value={formData.vehicle} onChange={handleChange} className="bg-slate-800 p-3 rounded-lg" />

          <input name="driver" placeholder="Driver" value={formData.driver} onChange={handleChange} className="bg-slate-800 p-3 rounded-lg" />

          <input name="source" placeholder="Source" value={formData.source} onChange={handleChange} className="bg-slate-800 p-3 rounded-lg" />

          <input name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} className="bg-slate-800 p-3 rounded-lg" />

          <input name="startTime" placeholder="Start Time" value={formData.startTime} onChange={handleChange} className="bg-slate-800 p-3 rounded-lg" />

          <input name="endTime" placeholder="End Time" value={formData.endTime} onChange={handleChange} className="bg-slate-800 p-3 rounded-lg" />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 p-3 rounded-lg"
          >
            <option>Pending</option>
            <option>Running</option>
            <option>Completed</option>
          </select>

        </div>

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={onClose}
            className="bg-slate-700 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            {editingTrip ? "Update Trip" : "Save Trip"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddTripModal;