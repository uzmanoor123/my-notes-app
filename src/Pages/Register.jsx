import { useState } from "react";
import { BASE_URL } from "./../config/envConfig";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#3498db] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded w-80">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <div className="mb-4  mt-4">
          <label>Full Name</label>
          <input
            className="w-full  p-2 mt-1.5 rounded-md border"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4  mt-4">
          <label>Email</label>
          <input
            className="w-full p-2 mt-1.5 rounded-md border "
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 mt-4">
          <label>Password</label>
          <input
            className="w-full  p-2 mt-1.5 rounded-md border"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 w-full text-white p-2 rounded mt-3 hover:bg-sky-600 cursor-pointer"
        >
          SignUp
        </button>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
