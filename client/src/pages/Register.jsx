import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  signInPending,
  signInRejected,
  signInFulfilled,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInPending());
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInRejected(data.message));
        return;
      }
      dispatch(signInFulfilled(data));
      navigate("/login");
    } catch (error) {
      dispatch(signInRejected(error));
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
      <p className="text-red-500 mt-3">
        {isError ? isError || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
