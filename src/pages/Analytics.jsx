import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const API = "http://localhost:5000/modules";

export default function Analytics(){

  const [modules,setModules] = useState([]);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    fetchModules();
  },[]);

  const fetchModules = async()=>{

    try{

      const res = await fetch(API);
      const data = await res.json();

      setModules(data || []);

    }catch(error){

      console.error("Failed to fetch modules",error);

    }

  };

  const completedCount = modules.filter(m=>m.completed).length;

  const percent = modules.length
    ? Math.round((completedCount/modules.length)*100)
    : 0;

  const totalTime = modules.reduce((sum,m)=>sum+(m.time || 0),0);

  const avgTime = modules.length
    ? Math.round(totalTime/modules.length)
    : 0;

  const filteredModules = modules.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = filteredModules.map(m=>({
    name:m.title,
    hours:m.time || 0
  }));

  const pieData = [
    { name:"Completed", value:completedCount },
    { name:"Remaining", value:modules.length-completedCount }
  ];

  const COLORS = ["#10b981","#e5e7eb"];

  const topModule = modules.length
    ? modules.reduce((max,m)=>
        (m.time || 0) > (max.time || 0) ? m : max
      )
    : null;

  return(

    <div className="analytics-page">

      <h2 className="analytics-title">Learning Analytics</h2>

      {/* SEARCH */}

      <input
        className="analytics-search"
        placeholder="Search modules..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      {/* STATS */}

      <div className="analytics-stats">

        <div className="stat-card">
          <h3>{modules.length}</h3>
          <p>Total Modules</p>
        </div>

        <div className="stat-card">
          <h3>{completedCount}</h3>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h3>{percent}%</h3>
          <p>Completion Rate</p>
        </div>

        <div className="stat-card">
          <h3>{totalTime} hrs</h3>
          <p>Total Study Time</p>
        </div>

        <div className="stat-card">
          <h3>{avgTime} hrs</h3>
          <p>Avg Study Time</p>
        </div>

      </div>

      {/* TOP MODULE */}

      {topModule && (

        <div className="top-module">

          <h3>Top Study Module</h3>

          <p>
            {topModule.title} • {topModule.time} hrs
          </p>

        </div>

      )}

      {/* PROGRESS */}

      <div className="analytics-progress">

        <h3>Overall Progress</h3>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{width:percent+"%"}}
          ></div>

        </div>

        <p>{percent}% completed</p>

      </div>

      {/* CHARTS */}

      <div className="analytics-grid">

        <div className="analytics-chart">

          <h3>Study Time per Module</h3>

          <ResponsiveContainer width="100%" height={260}>

            <BarChart data={chartData}>

              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>

              <Bar dataKey="hours" fill="#2563eb"/>

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="analytics-chart">

          <h3>Completion Overview</h3>

          <ResponsiveContainer width="100%" height={260}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >

                {pieData.map((entry,index)=>(
                  <Cell key={index} fill={COLORS[index]} />
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  )
}