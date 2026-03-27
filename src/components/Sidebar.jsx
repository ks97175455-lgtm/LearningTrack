import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Sidebar(){

  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const role = user?.role || "student";
  const isAdmin = role === "admin";

  const isActive = (path) => location.pathname.startsWith(path);

  return(

    <div className={open ? "sidebar open" : "sidebar collapsed"}>

      <div>

        <div className="logo-row">

          <h2 className="logo">
            {open ? `Learnzie ${isAdmin ? "(Admin)" : ""}` : "L"}
          </h2>

          <button
            className="toggle-btn"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

        </div>

        <div className="profile-box">

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
          />

          {open && (
            <div>
              <strong>{isAdmin ? "Admin" : "Student"}</strong>
              <p>Learning Portal</p>
            </div>
          )}

        </div>

        <nav>

          <Link to="/" className={isActive("/") ? "active" : ""}>
            <span>🏠</span>
            {open && "Dashboard"}
          </Link>

          <Link to="/modules" className={isActive("/modules") ? "active" : ""}>
            <span>📚</span>
            {open && "Courses"}
          </Link>

          <Link to="/analytics" className={isActive("/analytics") ? "active" : ""}>
            <span>📊</span>
            {open && "Analytics"}
          </Link>

          {isAdmin && (
            <Link to="/admin" className={isActive("/admin") ? "active" : ""}>
              <span>⚙</span>
              {open && "Admin"}
              {open && <span className="badge">New</span>}
            </Link>
          )}

        </nav>

      </div>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={logout}
        >
          {open ? "Logout" : "🚪"}
        </button>

        {open && <p className="version">v1.0</p>}

      </div>

    </div>

  );
}