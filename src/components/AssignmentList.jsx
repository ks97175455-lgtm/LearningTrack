export default function AssignmentList() {

  const assignments = [
    { title: "Market Analysis", progress: 30, due: "May 25" },
    { title: "React Project", progress: 60, due: "May 28" },
    { title: "UI Design", progress: 80, due: "June 1" }
  ];

  const getStatus = (p) => {
    if (p >= 80) return "Almost Done";
    if (p >= 40) return "In Progress";
    return "Pending";
  };

  const getColor = (p) => {
    if (p >= 80) return "#10b981";
    if (p >= 40) return "#3b82f6";
    return "#f59e0b";
  };

  return (
    <div className="assignment-card">

      <div className="assignment-header">
        <h3>Assignments</h3>
        <span className="assignment-count">{assignments.length}</span>
      </div>

      {assignments.map((a, i) => (

        <div key={i} className="assignment-item">

          <div className="assignment-info">

            <div>
              <h4>{a.title}</h4>
              <p className="due">Due: {a.due}</p>
            </div>

            <span className={`status ${getStatus(a.progress).toLowerCase().replace(" ","-")}`}>
              {getStatus(a.progress)}
            </span>

          </div>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: a.progress + "%",
                background: getColor(a.progress)
              }}
            ></div>
          </div>

          <div className="progress-footer">
            <span>{a.progress}% completed</span>

            {a.progress === 100 && (
              <span className="done">✔ Completed</span>
            )}
          </div>

        </div>

      ))}

    </div>
  );
}