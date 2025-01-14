import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //   const response = await axios.post("http://your-api-endpoint/api/login", {
      //     email,
      //     password,
      //   });

      //   if (response.status === 200) {
      //     // Set user/token in localStorage or Context (if needed)
      //     localStorage.setItem("token", response.data.token); // Assuming the API returns a token
      //     alert("Login successful!");
      //     navigate("/home");
      //   }
      if (username === "admin" && password === "admin") {
        localStorage.setItem("authToken", "admin");
        navigate("/home");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
            {error}
          </div>
        )}

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
