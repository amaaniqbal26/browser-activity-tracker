# Insights

A browser activity dashboard that transforms browsing history into actionable analytics.

Tracks the websites you visit, categorizes them automatically, and visualizes patterns through interactive charts and trends.

**Built with:** React • FastAPI • PostgreSQL • Recharts • Tailwind CSS

---

## Video Demo



---

## 🎯 What This Does

Instead of just storing raw browsing data, Insights answers real questions:

- **Which websites waste my time?** → Category breakdown + domain analytics
- **When am I most productive?** → Time-of-day heatmap + hourly activity
- **What are my trends?** → Monthly analytics, activity spikes, weekly patterns
- **How much time on work vs entertainment?** → Category percentages with pie charts

---

## ✨ Key Features

### Dashboard
- **Real-time stats**: Total visits, unique sites, top domain
- **Domain breakdown**: Interactive bar chart of most-visited websites
- **Category insights**: Pie chart showing work vs social vs entertainment
- **Activity feed**: Chronological list of recent visits with timestamps

### Trends Page
- **Weekly patterns**: Visits by day of the week
- **Hourly analysis**: Peak browsing times (morning/afternoon/evening/night)
- **Category breakdown**: Clickable pie chart to filter by category
- **Time-of-day heatmap**: Stacked bar chart showing activity across time periods
- **Monthly trends**: Line chart tracking visit volume over months
- **Top domains per month**: Which sites dominated each month
- **Activity spikes**: When you had unusual browsing activity

### Automatic Categorization
Websites are auto-grouped into:
- 💼 **Work** (GitHub, Stack Overflow, Figma, etc.)
- 👥 **Social** (Twitter, Instagram, Discord, etc.)
- 🎬 **Entertainment** (YouTube, Netflix, gaming sites, etc.)
- 🛍️ **Shopping** (Amazon, eBay, etc.)
- 📰 **News** (BBC, CNN, Hacker News, etc.)
- 📌 **Other** (Everything else)

---

## 📊 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - API calls

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - ORM for database
- **PostgreSQL** - Relational database
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0+
- **Python** 3.9+
- **PostgreSQL** 13+
- **npm** or **yarn**

### Installation

#### Backend Setup

```bash
cd backend

pip install -r requirements.txt

cp .env.example .env
# Update DATABASE_URL in .env
```

Set up environment variables in `backend/.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/insights_db
API_PORT=8000
```

Initialize the database:
```bash
python -m alembic upgrade head
```

Start the backend:
```bash
uvicorn main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`

#### Frontend Setup

```bash
cd dashboard

npm install

cp .env.example .env
# Update VITE_API_URL if needed
```

Set up environment variables in `dashboard/.env`:
```
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🏗️ Architecture

For a detailed breakdown of system design, tech decisions, and data flow, see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

### Quick Overview

```
Browser Extension
       ↓
   FastAPI Backend
       ↓
   PostgreSQL DB
       ↓
   React Frontend
       ↓
   Recharts Visualizations
```

**Key highlights:**
- Chrome extension captures visits in real-time
- FastAPI validates and categorizes data automatically
- PostgreSQL indexes optimize queries for 10k+ visits
- React dashboard renders 6+ interactive visualizations
- Data transformed to charts in real-time (~200ms)

---

## 📡 API Endpoints

### Health Check
```
GET /
```
Returns: `{"status": "ok"}`

### Log a Website Visit
```
POST /log
Content-Type: application/json

{
  "url": "https://github.com/username/repo",
  "timestamp": "2026-09-16T10:30:00Z"
}
```

Returns: `{"id": 123, "domain": "github.com", "category": "work"}`

### Get All Logs & Analytics
```
GET /logs
```

Returns:
```json
{
  "logs": [
    {
      "id": 1,
      "url": "https://github.com",
      "domain": "github.com",
      "category": "work",
      "timestamp": "2026-09-16T10:30:00Z"
    }
  ],
  "categories": {
    "work": 45,
    "social": 20,
    "entertainment": 30,
    "shopping": 5,
    "news": 10,
    "other": 8
  }
}
```

---

## 🎨 Screenshots

### Analytics Dashboard
![Dashboard](https://github.com/user-attachments/assets/799c0815-e68d-435f-a235-ca952f922503)

### Category Breakdown
![Categories](https://github.com/user-attachments/assets/93232020-fd16-4546-9887-180b2cd4abf3)

### Weekly & Hourly Trends
![Weekly](https://github.com/user-attachments/assets/b6e6d628-9bb2-4c57-ac2c-3cd19f34e07a)

### Time-of-Day Activity
![Heatmap](https://github.com/user-attachments/assets/3ad265aa-e7a5-449e-a04d-0eae2eff32e1)

### Monthly Analytics
![Monthly](https://github.com/user-attachments/assets/ab9d9c14-6740-4836-8571-98b0946c2818)

---

## 🔧 Key Features Breakdown

### Real-Time Analytics
- Dashboard updates as new data arrives
- Charts re-render efficiently with memoization
- Responsive to window resize events

### Smart Categorization
- Domain-to-category mapping system
- Extensible: Add new categories by updating the mapping
- Fallback to "Other" for uncategorized domains

### Performance Optimized
- Frontend: Code-split components, lazy loading
- Backend: Indexed database queries, pagination support
- Charts: Recharts optimized for 1000+ data points

---

## 💡 Challenges Overcome

### 1. Automatic Website Categorization
**Challenge**: Categorizing thousands of domains without external APIs
**Solution**: Built internal domain-to-category mapping system with common sites pre-classified and fallback logic for unknown domains

### 2. Chart Performance
**Challenge**: Rendering multiple large datasets (1000+ visits) without lag
**Solution**: Implemented data aggregation on backend, used Recharts with shouldComponentUpdate optimizations

---

## 📈 What Makes This Stand Out

✅ **Full-Stack Implementation** — Not a tutorial project, built with production patterns  
✅ **Analytics-Focused** — Goes beyond CRUD, actual insights from data  
✅ **Beautiful Design** — Professional dark theme with glassmorphic components  
✅ **Scalable Architecture** — Uses ORMs, proper error handling, database indexing  
✅ **Real Use Case** — Solves an actual problem (understanding browsing habits)  
✅ **Multiple Visualizations** — Bar charts, line charts, pie charts, heatmaps  
✅ **Type-Safe** — Pydantic validation on backend, component props on frontend  

---

## 📚 What I Learned

- **Full-stack development**: Connecting frontend to backend seamlessly
- **Database design**: Normalization, indexing, query optimization
- **Data visualization**: Choosing the right chart type for the data
- **State management**: React hooks for complex UI state
- **API design**: RESTful principles, error handling, response formats
- **Performance optimization**: Code splitting, memoization, efficient queries
- **UI/UX**: Creating intuitive dashboards with professional design

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Better category detection algorithms
- User authentication & multi-user support
- Export analytics to CSV/PDF
- Mobile app version

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Ensure backend is running: `http://127.0.0.1:8000`
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS is enabled on backend

### "Database connection error"
- Ensure PostgreSQL is running
- Check `DATABASE_URL` format
- Run migrations: `alembic upgrade head`

### "Charts not rendering"
- Clear browser cache
- Check console for errors
- Ensure data is being fetched from `/logs` endpoint

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built by Amaan Iqbal

**GitHub**: (https://github.com/amaaniqbal26)  
**LinkedIn**: (https://linkedin.com/in/amaan-iqbal26)  


---

## ⭐ Future Enhancements

- [ ] AI-powered productivity insights
- [ ] Goal setting & tracking
- [ ] Team analytics (shared workspace tracking)
- [ ] Browser extension for background logging
- [ ] Mobile app
- [ ] Dark/light mode toggle
- [ ] Custom time ranges
- [ ] Productivity scoring algorithm
- [ ] Notifications for excessive browsing
