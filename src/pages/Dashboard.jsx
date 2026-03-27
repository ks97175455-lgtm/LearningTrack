import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import ProgressCircle from "../components/ProgressCircle";
import ActivityChart from "../components/ActivityChart";
import AssignmentList from "../components/AssignmentList";
import Schedule from "../components/Schedule";

const API = "http://localhost:5000/modules";

export default function Dashboard(){

  const { user } = useAuth();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {

    try{

      const res = await fetch(API);

      if(!res.ok){
        throw new Error("API error");
      }

      const data = await res.json();
      setModules(data || []);

    }catch(err){

      console.error("Failed to load modules", err);
      setModules([]);

    }

  };

  const completed = modules.filter(m => m.completed).length;

  const percent = modules.length
    ? Math.round((completed / modules.length) * 100)
    : 0;

  const totalTime = modules.reduce(
    (sum, m) => sum + (m.time || 0),
    0
  );

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" :
    "Good Evening";

  const name = user?.role === "admin" ? "Admin" : "Student";

  return(

    <div className="dashboard">

      <Header/>

      <div className="welcome-card">

        <h2>
          {greeting}, {name} 👋
        </h2>

        <p>Track your learning progress and stay consistent</p>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${percent}%` }}
          ></div>

        </div>

      </div>

      <div className="stats">

        <StatsCard title="Completed Modules" value={completed}/>
        <StatsCard title="Total Modules" value={modules.length}/>
        <StatsCard title="Completion Rate" value={`${percent}%`}/>
        <StatsCard title="Study Time" value={`${totalTime} hrs`}/>

      </div>

      <div className="grid">

        <ActivityChart modules={modules}/>
        <ProgressCircle percent={percent}/>

      </div>

      <div className="grid">

        <AssignmentList modules={modules}/>
        <Schedule modules={modules}/>

      </div>

    </div>

  );
}