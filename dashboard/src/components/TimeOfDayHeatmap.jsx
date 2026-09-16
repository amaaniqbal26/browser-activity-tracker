import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const TIME_PERIODS = {
  morning: { label: "Morning", color: "#F59E0B", range: [6, 12] },
  afternoon: { label: "Afternoon", color: "#3B82F6", range: [12, 18] },
  evening: { label: "Evening", color: "#8B5CF6", range: [18, 23] },
  night: { label: "Night", color: "#1F2937", range: [23, 24] },
};

export default function TimeOfDayHeatmap({ logs }) {
  const list = logs.list || [];

  const heatmapData = {};
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  days.forEach((day) => {
    heatmapData[day] = {
      morning: 0,
      afternoon: 0,
      evening: 0,
      night: 0,
    };
  });

  list.forEach((log) => {
    const date = new Date(log.timestamp);
    const dayName = days[date.getDay()];
    const hour = date.getHours();

    if (hour >= 6 && hour < 12) heatmapData[dayName].morning++;
    else if (hour >= 12 && hour < 18) heatmapData[dayName].afternoon++;
    else if (hour >= 18 && hour < 23) heatmapData[dayName].evening++;
    else heatmapData[dayName].night++;
  });

  const chartData = days.map((day) => ({
    day: day.slice(0, 3),
    ...heatmapData[day],
  }));

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
      <h3 className="text-lg font-semibold mb-2">Time-of-Day Activity</h3>
      <p className="text-sm text-slate-400 mb-6">When you're most active throughout the week</p>

      {list.length > 0 ? (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                stroke="rgba(255,255,255,0.2)"
              />
              <YAxis
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                stroke="rgba(255,255,255,0.2)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              
              <Bar dataKey="morning" stackId="a" fill="#F59E0B" radius={[8, 8, 0, 0]} />
              <Bar dataKey="afternoon" stackId="a" fill="#3B82F6" />
              <Bar dataKey="evening" stackId="a" fill="#8B5CF6" />
              <Bar dataKey="night" stackId="a" fill="#1F2937" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-slate-400 text-center py-12">No activity data yet</p>
      )}

      <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/10">
        {Object.entries(TIME_PERIODS).map(([key, period]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: period.color }}
            />
            <span className="text-sm text-slate-300">{period.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
