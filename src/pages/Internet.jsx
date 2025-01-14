import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Internet = () => {
  const [connectionType, setConnectionType] = useState("wifi");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    site_code: "",
    wifiSsid: "",
    wifiPassword: "",
    ipAddress: "",
    subnetMask: "",
    carrier: "",
    simNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { connType: connectionType };
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        payload[key] = value;
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/save-config",
        payload
      );
      alert("Configuration submitted successfully!");
      console.log(response.data);
      setFormData({
        site_code: "",
        wifiSsid: "",
        wifiPassword: "",
        ipAddress: "",
        subnetMask: "",
        carrier: "",
        simNumber: "",
      });
    } catch (error) {
      alert("Error submitting configuration: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          Device Configuration
        </h1>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Site Code:
        </label>
        <input
          type="text"
          name="site-code"
          value={formData.site_code}
          onChange={(e) =>
            setFormData({ ...formData, site_code: e.target.value })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          placeholder="Enter the Site Code"
          required
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Connection Type:
        </label>
        <select
          value={connectionType}
          onChange={(e) => setConnectionType(e.target.value)}
          className="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring"
        >
          <option value="wifi">Wi-Fi</option>
          <option value="ethernet">Ethernet</option>
          <option value="cellular">Cellular</option>
        </select>

        {connectionType === "wifi" && (
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Wi-Fi SSID:
            </label>
            <input
              type="text"
              name="wifiSsid"
              value={formData.wifiSsid}
              onChange={(e) =>
                setFormData({ ...formData, wifiSsid: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
              placeholder="Enter Wi-Fi SSID"
              required
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Wi-Fi Password:
            </label>
            <input
              type="text"
              name="wifiPassword"
              value={formData.wifiPassword}
              onChange={(e) =>
                setFormData({ ...formData, wifiPassword: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
              placeholder="Enter Wi-Fi Password"
              required
            />
          </div>
        )}

        {connectionType === "ethernet" && (
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              IP Address:
            </label>
            <input
              type="text"
              name="ipAddress"
              value={formData.ipAddress}
              onChange={(e) =>
                setFormData({ ...formData, ipAddress: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
              placeholder="Enter IP Address"
              required
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subnet Mask:
            </label>
            <input
              type="text"
              name="subnetMask"
              value={formData.subnetMask}
              onChange={(e) =>
                setFormData({ ...formData, subnetMask: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
              placeholder="Enter Subnet Mask"
              required
            />
          </div>
        )}

        {connectionType === "cellular" && (
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Carrier:
            </label>
            <input
              type="text"
              name="carrier"
              value={formData.carrier}
              onChange={(e) =>
                setFormData({ ...formData, carrier: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
              placeholder="Enter Carrier Name"
              required
            />

            <label className="block text-gray-700 text-sm font-bold mb-2">
              SIM Number:
            </label>
            <input
              type="text"
              name="simNumber"
              value={formData.simNumber}
              onChange={(e) =>
                setFormData({ ...formData, simNumber: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
              placeholder="Enter SIM Number"
              required
            />
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="normal"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default Internet;
