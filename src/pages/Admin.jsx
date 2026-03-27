import { useState, useEffect } from "react";

const API = "http://localhost:5000/modules";

function Admin() {

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [modules, setModules] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchModules = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setModules(data || []);
    } catch (error) {
      console.error("Failed to load modules", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const addModule = async (e) => {
    e.preventDefault();

    try {

      if (editId) {

        await fetch(`${API}/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            time: Number(time)
          })
        });

        setEditId(null);

      } else {

        const newModule = {
          title,
          completed: false,
          time: Number(time)
        };

        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newModule)
        });

      }

      setTitle("");
      setTime("");
      fetchModules();

    } catch (error) {
      console.error("Failed to save module", error);
    }
  };

  const deleteModule = async (id) => {

    try {

      await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      fetchModules();

    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const toggleComplete = async (module) => {

    try {

      await fetch(`${API}/${module.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !module.completed
        })
      });

      fetchModules();

    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const editModule = (module) => {
    setTitle(module.title);
    setTime(module.time);
    setEditId(module.id);
  };

  const filteredModules = modules.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="admin-page">

      <div className="admin-card">

        <h2>Admin Panel</h2>

        <div className="module-count">
          Total Modules: {modules.length}
        </div>

        <input
          className="search-input"
          placeholder="Search modules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <form onSubmit={addModule} className="admin-form">

          <input
            type="text"
            placeholder="Module Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Time (hours)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <button type="submit">
            {editId ? "Update Module" : "Add Module"}
          </button>

        </form>

      </div>

      <div className="module-list">

        <h3>All Modules</h3>

        {filteredModules.map((m) => (

          <div
            key={m.id}
            className={`module-item ${m.completed ? "completed" : ""}`}
          >

            <div>

              <strong>{m.title}</strong>

              <p>{m.time} hrs</p>

              {m.completed && (
                <span className="complete-badge">
                  Completed
                </span>
              )}

            </div>

            <div className="admin-buttons">

              <button onClick={() => toggleComplete(m)}>
                {m.completed ? "Undo" : "Complete"}
              </button>

              <button
                className="edit-btn"
                onClick={() => editModule(m)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteModule(m.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Admin;