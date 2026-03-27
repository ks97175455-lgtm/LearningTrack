import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function ActivityChart({ modules }) {

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  // distribute module time across week
  const data = days.map(day => ({
    day,
    hours: modules
      .filter((m,i) => i % 7 === days.indexOf(day))
      .reduce((sum,m) => sum + (m.time || 0),0)
  }));

  const total = data.reduce((a,b)=>a + b.hours,0);

  const avg = (total/data.length).toFixed(1);

  const max = Math.max(...data.map(d => d.hours));

  const CustomTooltip = ({active,payload,label}) => {

    if(active && payload && payload.length){

      return(
        <div className="tooltip-box">
          <p>{label}</p>
          <span>{payload[0].value} hours</span>
        </div>
      )

    }

    return null;
  };

  return(

    <div className="activity-card">

      <div className="chart-header">

        <div>
          <h3>Weekly Learning Activity</h3>
          <p className="sub">Track your study consistency</p>
        </div>

        <div className="stats">
          <span>Total {total} hrs</span>
          <span>Avg {avg} hrs</span>
        </div>

      </div>

      <ResponsiveContainer width="100%" height={260}>

        <BarChart data={data}>

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>

          <XAxis dataKey="day"/>

          <YAxis/>

          <Tooltip content={<CustomTooltip/>}/>

          <Bar dataKey="hours" radius={[8,8,0,0]}>

            {data.map((entry,index)=>(
              <Cell
                key={index}
                fill={entry.hours === max ? "#10b981" : "url(#colorUv)"}
              />
            ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}