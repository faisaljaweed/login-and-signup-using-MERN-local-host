import { useState } from "react";
import axios from "axios";

const Logout = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      // Sending a POST request to the logout endpoint
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          withCredentials: true, // This sends cookies along with the request
        }
      );
      console.log(response.data);
      setMessage("Logout successful");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Logout failed. Please try again.");
      setMessage(null);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
