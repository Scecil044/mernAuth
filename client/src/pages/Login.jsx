import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsLoading(false);
      const data = await res.json();
      if (data.success === false) {
        setIsError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="font-semibold text-center my-7">Sign In</h3>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="w-full bg-slate-100 rounded-md p-3"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="w-full bg-slate-100 rounded-md p-3"
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="w-full bg-slate-700 rounded-md px-4 py-2 text-white"
          >
            {isLoading ? "Loading ..." : "Sign In"}
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <span>Dont have an account?</span>
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </div>
        <p className="text-red-600">{isError && "Something went wrong!"}</p>
      </form>
    </div>
  );
}
