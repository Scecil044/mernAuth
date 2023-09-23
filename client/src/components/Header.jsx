import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <header className="w-full bg-slate-200">
      <div className="flex item  justify-between max-w-6xl mx-auto p-3">
        <h3>
          <Link to="/">Auth App</Link>
        </h3>
        <ul className="flex item  gap-5">
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/profile">
              {userInfo ? (
                <img
                  src={userInfo.profilePicture}
                  alt="profile pic"
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
