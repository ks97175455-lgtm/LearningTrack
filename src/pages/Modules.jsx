import { useEffect, useState } from "react";
import localModules from "../data/modules";

const API = "http://localhost:5000/modules";

export default function Modules(){

  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {

    try{

      const res = await fetch(API);
      const apiModules = await res.json();

      const allModules = [...(apiModules || []), ...localModules];

      setModules(allModules);

    }catch(error){

      console.error("Failed to fetch modules", error);

      // fallback to local modules
      setModules(localModules);

    }

  };

  const completeModule = async (id) => {

    try{

      await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: true })
      });

      fetchModules();

    }catch(error){

      console.error("Failed to update module", error);

    }

  };

  const filteredModules = modules.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = modules.filter(m => m.completed).length;

  return(

    <div className="modules-page">

      <h2>Learning Modules</h2>

      <div className="modules-top">

        <input
          className="search"
          placeholder="Search modules..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <div className="module-progress">
          Completed {completedCount} / {modules.length}
        </div>

      </div>

      <div className="modules-list">

        {filteredModules.map((m) => (

          <div key={m.id} className="module-card">

            <div className="module-info">
              <h3>{m.title}</h3>
              <p>Study Time: {m.time || 0} hrs</p>
            </div>

            {m.completed ? (
              <span className="completed">Completed</span>
            ) : (
              <button onClick={() => completeModule(m.id)}>
                Complete
              </button>
            )}

          </div>

        ))}

      </div>

    </div>

  );
}