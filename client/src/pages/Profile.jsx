import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="max-w-lg mx-auto p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg text-center my-7">Profile</h3>
        <img
          src={userInfo.profilePicture}
          alt="profile picture"
          className="object-cover w-24 h-24 rounded-full self-center"
        />
        <input
          type="text"
          placeholder="User Name"
          id="email"
          defaultValue={userInfo.userName}
          className="bg-slate-100 rounded-md p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={userInfo.email}
          className="bg-slate-100 rounded-md p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 rounded-md p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-center text-white py-2 px-4 uppercase disabled:opacity-95 rounded-lg">
          Update
        </button>
      </form>
      <div className="flex justify-between items-center mt-1">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
