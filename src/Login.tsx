import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface LoginData {
  email: string;
  username: string;
  password: string;
}

const Login = () => {
  const [data, setData] = useState<LoginData>({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email: data.email,
          username: data.username,
          password: data.password,
        }
      );
      console.log(response.data);
      setSuccess("Login successful");
      setError(null);

      // Clear form
      setData({
        email: "",
        username: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
