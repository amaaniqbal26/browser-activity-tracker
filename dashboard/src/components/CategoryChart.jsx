import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  work: "#3B82F6",
  social: "#EC4899",
  entertainment: "#8B5CF6",
  shopping: "#F59E0B",
  news: "#10B981",
  other: "#6B7280",
};

const CATEGORY_LEGEND = [
  { name: "work", color: "#3B82F6" },
  { name: "social", color: "#EC4899" },
  { name: "entertainment", color: "#8B5CF6" },
  { name: "shopping", color: "#F59E0B" },
  { name: "news", color: "#10B981" },
  { name: "other", color: "#6B7280" },
];

export default function CategoryChart({ data, onSelectCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    color: COLORS[name] || COLORS.other,
  }));

  const handleCategoryClick = (categoryName) => {
    const newSelection = selectedCategory === categoryName ? null : categoryName;
    setSelectedCategory(newSelection);
    onSelectCategory(newSelection);
  };

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-xl">
      <h2 className="text-white text-lg font-semibold mb-6">
        Category Breakdown
      </h2>

      <div className="flex items-center justify-between gap-12">
        {/* Pie Chart */}
        <div className="w-[60%] h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                onClick={(data) => handleCategoryClick(data.name)}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4 min-w-[220px]">
          {CATEGORY_LEGEND.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 rounded transition-colors"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: category.color,
                  }}
                />
                <span className="text-slate-300 capitalize">
                  {category.name}
                </span>
              </div>
              <span className="text-slate-500 text-sm">
                {data?.[category.name] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
