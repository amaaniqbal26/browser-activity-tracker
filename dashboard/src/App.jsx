import { useEffect, useState } from "react";
import { getLogs } from "./api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Eye, Globe, Activity } from "lucide-react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import CategoryChart from "./components/CategoryChart";
import TimeOfDayHeatmap from "./components/TimeOfDayHeatmap";
import MonthlyTrends from "./components/MonthlyTrends";

/* ---------------------- COMPONENTS ---------------------- */

function StatCard({ label, value, icon, color, isText }) {
  const colorClasses = {
    cyan: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-300",
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-300",
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-300",
    },
  };

  const colorConfig = colorClasses[color] || colorClasses.cyan;

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-3">
            {label}
          </p>
          {isText ? (
            <p className="text-2xl font-bold truncate max-w-xs">{value}</p>
          ) : (
            <p className="text-4xl font-bold">{value}</p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${colorConfig.bg} flex items-center justify-center flex-shrink-0`}
        >
          <div className={colorConfig.text}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, to }) {
  return (
    <Link
      to={to}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-white/10 text-white"
          : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

/* ---------------------- TRENDS PAGE ---------------------- */

function TrendsPage({ logs }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const list = logs.list || [];

  const dailyCounts = list.reduce((acc, log) => {
    const day = new Date(log.timestamp).toLocaleDateString("en-US", {
      weekday: "short",
    });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const dailyData = Object.entries(dailyCounts).map(([day, count]) => ({
    day,
    count,
  }));

  const hourlyCounts = list.reduce((acc, log) => {
    const hour = new Date(log.timestamp).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {});

  const hourlyData = Object.entries(hourlyCounts).map(([hour, count]) => ({
    hour: `${hour}:00`,
    count,
  }));

  // Filter websites by selected category
  const websites = selectedCategory
    ? list.filter(log => log.category === selectedCategory)
    : [];

  return (
    <main className="flex-1 p-10 space-y-10 overflow-auto">
      <div>
        <h2 className="text-4xl font-bold mb-2">Trends</h2>
        <p className="text-slate-400">Weekly and hourly browsing patterns</p>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
        <CategoryChart
          data={logs.categories || {}}
          logs={logs.list || []}
          onSelectCategory={setSelectedCategory}
        />
        {selectedCategory && (
          <div className="mt-6 border-t border-white/10 pt-6">
            <h3 className="text-white font-semibold mb-3 capitalize">
              {selectedCategory} Websites
            </h3>

            <div className="space-y-2">
              {websites.map((site, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-3 rounded-lg"
                >
                  <p className="text-slate-300">
                    {new URL(site.url).hostname.replace("www.", "")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TIME-OF-DAY HEATMAP */}
      <TimeOfDayHeatmap logs={logs} />

      {/* WEEKLY ACTIVITY */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-2">Weekly Activity</h3>
        <p className="text-sm text-slate-400 mb-6">Visits per day this week</p>

        {dailyData.length > 0 ? (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" fill="url(#gradWeekly)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="gradWeekly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(139, 92, 246)" />
                    <stop offset="100%" stopColor="rgb(124, 58, 237)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-12">No weekly data yet</p>
        )}
      </div>

      {/* HOURLY ACTIVITY */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
        <h3 className="text-lg font-semibold mb-2">Most Active Hours</h3>
        <p className="text-sm text-slate-400 mb-6">Visits by hour of the day</p>

        {hourlyData.length > 0 ? (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="count" fill="url(#gradHourly)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="gradHourly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                    <stop offset="100%" stopColor="rgb(6, 182, 212)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-12">No hourly data yet</p>
        )}
      </div>

      {/* MONTHLY TRENDS */}
      <MonthlyTrends logs={logs} />
    </main>
  );
}

/* ---------------------- ANALYTICS PAGE ---------------------- */

function AnalyticsPage({ logs, chartData, totalVisits, uniqueSites, topDomain }) {
  const list = logs.list || [];

  return (
    <main className="flex-1 p-10 space-y-10 overflow-auto">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-2">Screen Time</h2>
          <p className="text-slate-400">Track and understand your browsing patterns</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatCard
          label="Total Visits"
          value={totalVisits}
          icon={<Eye className="w-6 h-6" />}
          color="cyan"
        />
        <StatCard
          label="Unique Sites"
          value={uniqueSites}
          icon={<Globe className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          label="Top Domain"
          value={topDomain}
          icon={<TrendingUp className="w-6 h-6" />}
          color="orange"
          isText
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
          <h3 className="text-lg font-semibold mb-2">Activity by Domain</h3>
          <p className="text-sm text-slate-400 mb-6">Your top websites this week</p>

          {chartData.length > 0 ? (
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 80 }}
                >
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="domain"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="count" fill="rgb(34, 211, 238)" radius={[8, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-slate-400 text-center py-12">No data yet</p>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-sm text-slate-400 mb-6">Latest page visits</p>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {list.slice(0, 15).map((log, i) => (
              <div
                key={i}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm border border-white/5"
              >
                <p className="text-slate-200 truncate font-medium">
                  {new URL(log.url).hostname.replace("www.", "")}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(log.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------------- MAIN APP ---------------------- */

export default function App() {
  const [logs, setLogs] = useState({ list: [], categories: {} });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    getLogs().then((res) =>
      setLogs({
        list: res.data.logs || [],
        categories: res.data.categories || {},
      })
    );

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const domainCounts = logs.list.reduce((acc, log) => {
    try {
      const domain = new URL(log.url).hostname;
      acc[domain] = (acc[domain] || 0) + 1;
    } catch {}
    return acc;
  }, {});

  const chartData = Object.entries(domainCounts)
    .map(([domain, count]) => ({
      domain: domain.replace("www.", ""),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const topDomain = chartData[0]?.domain || "--";
  const totalVisits = logs.list.length;
  const uniqueSites = Object.keys(domainCounts).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-black/20 backdrop-blur-xl border-white/10 flex flex-col p-8 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Insights</h1>
            <p className="text-slate-400">Digital wellness tracker</p>
          </div>
        </div>

        <nav className="space-y-2 mb-2 flex-1">
          <NavItem
            icon={<Activity className="w-4 h-4" />}
            label="Analytics"
            active={location.pathname === "/"}
            to="/"
          />
          <NavItem
            icon={<TrendingUp className="w-4 h-4" />}
            label="Trends"
            active={location.pathname === "/trends"}
            to="/trends"
          />
        </nav>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-slate-500 uppercase tracking-wider">This week</p>
          <p className="text-xl font-bold mt-3">{totalVisits}</p>
          <p className="text-slate-400 mt-1">total visits</p>
        </div>
      </aside>

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <AnalyticsPage
              logs={logs}
              chartData={chartData}
              totalVisits={totalVisits}
              uniqueSites={uniqueSites}
              topDomain={topDomain}
            />
          }
        />
        <Route path="/trends" element={<TrendsPage logs={logs} />} />
      </Routes>
    </div>
  );
}
