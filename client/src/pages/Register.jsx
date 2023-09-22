import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      // const data = await res.json();
      setIsLoading(false);
      if (res.data.success === "false") {
        setIsError(true);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="font-semibold text-lg text-center my-7">Sign Up</h3>
        <div className="mb-3">
          <input
            type="text"
            id="userName"
            placeholder="User Name"
            onChange={handleChange}
            className="bg-slate-100 p-3 rounded-lg w-full"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-slate-100 p-3 rounded-lg w-full"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-slate-100 p-3 rounded-lg w-full"
          />
        </div>
        <div className="mb-3">
          <button className="bg-slate-700 text-white px-4 py-2 w-full rounded-md">
            {isLoading ? "Loading" : "Submit"}
          </button>
        </div>
      </form>
      <div className="flex gap-2">
        <span>Already have an account?</span>
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </div>
      <p className="text-red-500 mt-3">{isError && "Something went wrong!"}</p>
    </div>
  );
}
