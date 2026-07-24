import { useState, useEffect } from "react";

function AddDriverModal({
  isOpen,
  onClose,
  onSave,
  editingDriver,
}) {
  const emptyForm = {
    name: "",
    phone: "",
    license: "",
    experience: "",
    vehicle: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingDriver) {
      setFormData(editingDriver);
    } else {
      setFormData(emptyForm);
    }
  }, [editingDriver]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (editingDriver) {
      onSave({
        ...editingDriver,
        ...formData,
      });
    } else {
      onSave(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-700 p-6">

        <h2 className="text-2xl font-bold mb-6">
          {editingDriver ? "Edit Driver" : "Add Driver"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Driver Name"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            name="license"
            value={formData.license}
            onChange={handleChange}
            placeholder="License Number"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            placeholder="Assigned Vehicle"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 p-3 rounded-lg"
          >
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
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
            {editingDriver ? "Update Driver" : "Save Driver"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddDriverModal;