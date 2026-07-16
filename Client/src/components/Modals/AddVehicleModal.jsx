import { useState, useEffect } from "react";

function AddVehicleModal({ isOpen, onClose, onSave, editingVehicle }) {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    type: "",
    driver: "",
    phone: "",
    fuel: "",
    status: "Online",
  });

  useEffect(() => {
    if (editingVehicle) {
      setFormData(editingVehicle);
    } else {
      setFormData({
        vehicleNo: "",
        type: "",
        driver: "",
        phone: "",
        fuel: "",
        status: "Online",
      });
    }
  }, [editingVehicle]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (editingVehicle) {
      onSave({
        ...editingVehicle,
        ...formData,
      });
    } else {
      onSave(formData);
    }

    setFormData({
      vehicleNo: "",
      type: "",
      driver: "",
      phone: "",
      fuel: "",
      status: "Online",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-700 p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
            placeholder="Vehicle Number"
            className="bg-slate-800 p-3 rounded-lg text-white"
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Vehicle Type"
            className="bg-slate-800 p-3 rounded-lg text-white"
          />

          <input
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            placeholder="Driver Name"
            className="bg-slate-800 p-3 rounded-lg text-white"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Driver Phone"
            className="bg-slate-800 p-3 rounded-lg text-white"
          />

          <input
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            placeholder="Fuel"
            className="bg-slate-800 p-3 rounded-lg text-white"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-slate-800 p-3 rounded-lg text-white"
          >
            <option>Online</option>
            <option>Offline</option>
          </select>

        </div>

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-700 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 rounded-lg"
          >
            {editingVehicle ? "Update Vehicle" : "Save Vehicle"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddVehicleModal;