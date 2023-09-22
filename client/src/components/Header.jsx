import { Link } from "react-router-dom";

export default function Header() {
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
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
