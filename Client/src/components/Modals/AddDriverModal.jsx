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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.vehicle
    ) {
      alert("Please fill all required fields.");
      return;
    }

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
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">

      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-700 p-6">

        <h2 className="text-2xl font-bold mb-6">
          {editingDriver ? "Edit Driver" : "Add Driver"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Driver Name"
            className="bg-slate-800 text-white p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="bg-slate-800 text-white p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            name="license"
            value={formData.license}
            onChange={handleChange}
            placeholder="License Number"
            className="bg-slate-800 text-white p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="bg-slate-800 text-white p-3 rounded-lg outline-none"
          />

          <input
            type="text"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            placeholder="Assigned Vehicle"
            className="bg-slate-800 text-white p-3 rounded-lg outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 text-white p-3 rounded-lg outline-none"
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            {editingDriver ? "Update Driver" : "Save Driver"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDriverModal;