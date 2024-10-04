import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface SignupData {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: File | null; // for file input
  coverImage: File | null; // for file input
}

const Signup = () => {
  const [data, setData] = useState<SignupData>({
    username: "",
    fullname: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const { name, files } = e.target;
      setData({ ...data, [name]: files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.avatar) formData.append("avatar", data.avatar);
    if (data.coverImage) formData.append("coverImage", data.coverImage);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setSuccess("Signup successful");
      setError(null);

      // Clear form
      setData({
        username: "",
        fullname: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null,
      });
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>User Name</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          value={data.fullname}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
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
        <label>Avatar</label>
        <input type="file" name="avatar" onChange={handleFileChange} required />
        <br />
        <label>Cover Image</label>
        <input
          type="file"
          name="coverImage"
          onChange={handleFileChange}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
