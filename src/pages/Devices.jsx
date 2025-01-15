import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeviceForm = () => {
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    device_type: "",
    tech_details: {},
    comm_type: "",
    comm_details: {},
  });

  const deviceTechDetails = {
    "Solar inverter": [
      "Make and model",
      "Serial number",
      "kWp (capacity)",
      "Number of phases",
    ],
    Battery: [
      "Battery power capacity (kW)",
      "Battery storage capacity (kWh)",
      "Make and model",
      "Serial number",
    ],
    "DG set": ["Power limit (kW)", "Make and model", "Serial number"],
    Meters: [
      "Number of phases",
      "Make and model",
      "Serial number",
      {
        "Data to collect": [
          "L-L voltage",
          "L-N voltage",
          "Current",
          "Power",
          "Energy",
          "Frequency",
          "Power factor",
          "VAR",
          "Reactive power",
        ],
      },
    ],
  };

  const commTypes = {
    "Modbus TCP": ["IP", "Port", "Parity", "Stop bits"],
    "Modbus RTU": ["Port", "Parity", "Slave id", "Stop bits"],
  };

  const handleDeviceChange = (field, value) => {
    setNewDevice({ ...newDevice, [field]: value });
  };

  const handleTechDetailsChange = (key, value) => {
    setNewDevice({
      ...newDevice,
      tech_details: { ...newDevice.tech_details, [key]: value },
    });
  };

  const handleCommDetailsChange = (key, value) => {
    setNewDevice({
      ...newDevice,
      comm_details: { ...newDevice.comm_details, [key]: value },
    });
  };

  const addDevice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/save-device",
        newDevice
      );

      console.log("Device added:", response.data);

      setDevices((prevDevices) => [...prevDevices, newDevice]);

      setNewDevice({
        device_type: "",
        tech_details: {},
        comm_type: "",
        comm_details: {},
      });
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full my-20">
        <h1 className="text-xl font-bold mb-4 text-center">
          Device Configuration Form
        </h1>
        <div className="mb-4">
          <label className="block font-bold mb-2">Device Type</label>
          <select
            className="w-full border rounded-lg p-2"
            value={newDevice.device_type}
            onChange={(e) => handleDeviceChange("device_type", e.target.value)}
          >
            <option value="">Select Device Type</option>
            {Object.keys(deviceTechDetails).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {newDevice.device_type && (
          <>
            <h2 className="text-lg font-bold mb-2">Tech Details</h2>
            {deviceTechDetails[newDevice.device_type].map((field) =>
              typeof field === "string" ? (
                <div key={field} className="mb-4">
                  <label className="block font-bold mb-2">{field}</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={newDevice.tech_details[field] || ""}
                    onChange={(e) =>
                      handleTechDetailsChange(field, e.target.value)
                    }
                  />
                </div>
              ) : (
                <div key="checkboxes" className="mb-4">
                  <label className="block font-bold mb-2">
                    {Object.keys(field)[0]}
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {field["Data to collect"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={newDevice.tech_details[option] || false}
                          onChange={(e) =>
                            handleTechDetailsChange(option, e.target.checked)
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              )
            )}
          </>
        )}

        <div className="mb-4">
          <label className="block font-bold mb-2">Communication Type</label>
          <select
            className="w-full border rounded-lg p-2"
            value={newDevice.comm_type}
            onChange={(e) => handleDeviceChange("comm_type", e.target.value)}
          >
            <option value="">Select Communication Type</option>
            {Object.keys(commTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {newDevice.comm_type && (
          <>
            <h2 className="text-lg font-bold mb-2">Comm Details</h2>
            {commTypes[newDevice.comm_type].map((field) => (
              <div key={field} className="mb-4">
                <label className="block font-bold mb-2">{field}</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={newDevice.comm_details[field] || ""}
                  onChange={(e) =>
                    handleCommDetailsChange(field, e.target.value)
                  }
                />
              </div>
            ))}
          </>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={addDevice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Device
          </button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
        </div>

        {devices.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Added Devices</h2>
            <pre className="bg-gray-100 p-4 rounded-lg">
              {JSON.stringify(devices, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceForm;
