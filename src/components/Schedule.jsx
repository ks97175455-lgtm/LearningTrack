export default function Schedule(){

  const schedule = [
    {title:"Business Strategy Test",date:"Oct 15 2026",time:"10:00 AM"},
    {title:"Financial Presentation",date:"Nov 1 2026",time:"2:00 PM"},
    {title:"Behavior Quiz",date:"Nov 20 2026",time:"11:30 AM"}
  ];

  const today = new Date();

  const getStatus = (eventDate)=>{

    const event = new Date(eventDate);
    const current = new Date(today);

    event.setHours(0,0,0,0);
    current.setHours(0,0,0,0);

    const diff = event - current;

    if(diff === 0) return "Today";
    if(diff > 0) return "Upcoming";
    return "Completed";
  };

  const getDaysLeft = (eventDate)=>{

    const event = new Date(eventDate);
    const current = new Date(today);

    const diff = event - current;

    return Math.ceil(diff/(1000*60*60*24));
  };

  return(

    <div className="schedule-card">

      <div className="schedule-header">
        <h3>My Schedule</h3>
        <span className="event-count">{schedule.length} events</span>
      </div>

      {schedule.map((s,i)=>{

        const eventDate = new Date(s.date);
        const status = getStatus(eventDate);
        const daysLeft = getDaysLeft(eventDate);

        return(

          <div key={i} className="schedule-item">

            <div className="schedule-icon">📅</div>

            <div className="schedule-info">

              <strong>{s.title}</strong>

              <p>{s.date} • {s.time}</p>

              {status === "Upcoming" && (
                <span className="countdown">{daysLeft} days left</span>
              )}

              {status === "Today" && (
                <span className="countdown today">Happening Today</span>
              )}

            </div>

            <span className={`badge ${status.toLowerCase()}`}>
              {status}
            </span>

          </div>

        )

      })}

    </div>

  )
}