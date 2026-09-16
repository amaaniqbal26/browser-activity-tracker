import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MonthlyTrends({ logs }) {
  const list = logs.list || [];

  if (list.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-2">Monthly Trends</h3>
        <p className="text-slate-400 text-center py-12">No data yet</p>
      </div>
    );
  }

  const monthlyData = {};
  const monthlyDomains = {};

  list.forEach((log) => {
    const date = new Date(log.timestamp);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = date.toLocaleString("en-US", { month: "short", year: "2-digit" });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthLabel, visits: 0, days: new Set() };
      monthlyDomains[monthKey] = {};
    }

    monthlyData[monthKey].visits++;
    monthlyData[monthKey].days.add(date.toDateString());

    try {
      const domain = new URL(log.url).hostname.replace("www.", "");
      monthlyDomains[monthKey][domain] = (monthlyDomains[monthKey][domain] || 0) + 1;
    } catch {}
  });

  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => ({
      ...item,
      activeDeviceEstimate: Math.ceil(item.visits / 10),
    }));

  const topDomainsPerMonth = Object.entries(monthlyDomains).map(([monthKey, domains]) => {
    const topDomain = Object.entries(domains).sort((a, b) => b[1] - a[1])[0];
    return {
      month: monthlyData[monthKey].month,
      domain: topDomain?.[0] || "N/A",
      visits: topDomain?.[1] || 0,
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-2">Monthly Visit Trends</h3>
        <p className="text-sm text-slate-400 mb-6">Total page visits per month</p>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={{ fill: "#22d3ee", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-2">Top Site Per Month</h3>
        <p className="text-sm text-slate-400 mb-6">Your most visited domain each month</p>

        <div className="space-y-3">
          {topDomainsPerMonth.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-slate-200">{item.month}</p>
                <p className="text-xs text-slate-400 mt-1 truncate">{item.domain}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold text-cyan-400">{item.visits}</p>
                <p className="text-xs text-slate-500">visits</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-2">Activity Spikes</h3>
        <p className="text-sm text-slate-400 mb-6">Days with high browsing activity</p>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Bar dataKey="activeDeviceEstimate" fill="#EC4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
