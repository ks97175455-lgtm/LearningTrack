import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login(){

  const { login } = useAuth();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("student");
  const [error,setError] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    const user = username.trim();
    const pass = password.trim();

    setError("");

    if(role === "admin"){

      if(user === "admin" && pass === "admin123"){
        login("admin");
      }else{
        setError("Invalid admin credentials");
      }

    }else if(role === "student"){

      if(user === "student" && pass === "student123"){
        login("student");
      }else{
        setError("Invalid student credentials");
      }

    }

  };

  return(

    <div className="login-page">

      <form className="login-card" onSubmit={handleLogin}>

        <h2>Learning Track Dashboard</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>

        <p className="demo">
          Demo Login: <br/>
          Student → student / student123 <br/>
          Admin → admin / admin123
        </p>

      </form>

    </div>

  );

}