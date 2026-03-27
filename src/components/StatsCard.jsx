export default function StatsCard({
  title = "",
  value = 0,
  icon = "📊",
  trend = 0
}) {

  const isUp = trend > 0;
  const isDown = trend < 0;

  const progressWidth = Math.min(Math.abs(trend) * 5, 100);

  return (

    <div className="card stat">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <div className="stat-info">
          <h4>{title}</h4>
          <h2>{value}</h2>
        </div>

      </div>

      <div className="stat-bottom">

        <span
          className={`trend ${
            isUp ? "up" : isDown ? "down" : "neutral"
          }`}
        >

          {trend === 0
            ? "— 0%"
            : `${isUp ? "▲" : "▼"} ${Math.abs(trend)}%`
          }

        </span>

        <div className="mini-progress">

          <div
            className="mini-bar"
            style={{ width: `${progressWidth}%` }}
          ></div>

        </div>

      </div>

    </div>

  );
}