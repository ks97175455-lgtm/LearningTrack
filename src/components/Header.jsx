import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header(){

  const { user, logout } = useAuth();

  const [dark,setDark] = useState(false);
  const [time,setTime] = useState("");
  const [menu,setMenu] = useState(false);

  useEffect(()=>{
    if(dark){
      document.body.classList.add("dark");
    }else{
      document.body.classList.remove("dark");
    }
  },[dark]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      const now = new Date();
      setTime(now.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}));
    },1000);

    return ()=> clearInterval(interval);
  },[]);

  const toggleTheme = ()=>{
    setDark(!dark);
  };

  const role = user?.role || "student";

  return(

    <div className="header">

      <div className="header-left">

        <div className="title-box">
          <h1>Dashboard</h1>
          <p>Welcome back 👋 {role}</p>
        </div>

        <div className="search-box">
          <span>🔍</span>
          <input
            className="search-bar"
            placeholder="Search modules..."
          />
        </div>

      </div>

      <div className="header-right">

        <div className="clock">
          ⏰ {time}
        </div>

        <button className="icon-btn notify">
          🔔
          <span className="notify-count">3</span>
        </button>

        <button className="icon-btn theme-btn" onClick={toggleTheme}>
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="profile" onClick={()=>setMenu(!menu)}>

          <img src="https://i.pravatar.cc/40" alt="profile"/>

          <span>{role === "admin" ? "Admin" : "Student"}</span>

          {menu && (

            <div className="profile-menu">

              <p>Profile</p>
              <p>Settings</p>
              <p onClick={logout}>Logout</p>

            </div>

          )}

        </div>

      </div>

    </div>

  )
}