import { useEffect, useState } from "react";

export default function ProgressCircle({ percent = 65 }) {

  const [progress, setProgress] = useState(0);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {

    let start = 0;

    const interval = setInterval(() => {

      start += 1;

      if (start >= percent) {
        start = percent;
        clearInterval(interval);
      }

      setProgress(start);

    }, 15);

    return () => clearInterval(interval);

  }, [percent]);

  const offset = circumference - (progress / 100) * circumference;

  const getStatus = () => {
    if (percent >= 80) return "Excellent";
    if (percent >= 50) return "Good Progress";
    return "Keep Going";
  };

  const getColor = () => {
    if (percent >= 80) return "#10b981";
    if (percent >= 50) return "#2563eb";
    return "#f59e0b";
  };

  return (

    <div className="progress-card">

      <div className="progress-header">
        <h3>Learning Progress</h3>
        <span className="goal">Goal 100%</span>
      </div>

      <div className="circle-wrapper">

        <svg width="150" height="150">

          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke={getColor()}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 75 75)"
          />

        </svg>

        <div className="progress-text">
          <h2>{progress}%</h2>
          <span>{100 - progress}% left</span>
        </div>

      </div>

      <div className="progress-status">
        {getStatus()}
      </div>

      <p className="progress-label">
        Keep learning and improve your skills 🚀
      </p>

    </div>

  );
}