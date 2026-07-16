import { useState } from "react";
import { BASE_URL } from "../config/envConfig";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#437993] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded w-80">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div className="mb-4  mt-4">
          <label>Email</label>
          <input
            className="w-full p-2 mt-1.5 rounded-md border"
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
            className="w-full  p-2 mt-1.5 rounded-md border "
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#437993] w-full text-white p-2 rounded mt-3 hover:bg-[#35657a] cursor-pointer"
        >
          Login
        </button>
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#437993]">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
