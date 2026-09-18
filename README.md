# Insights

Insights is a browser activity dashboard that turns browsing history into useful analytics.

It tracks the websites you visit, groups them into categories, and shows trends through charts and visualisations.

Built with React, FastAPI, PostgreSQL and Recharts.

---

## Features

### Dashboard

- Total visits
- Unique websites visited
- Most visited website
- Top domains chart
- Recent activity feed

### Trends

- Visits by day of the week
- Visits by hour of the day
- Website category breakdown
- Category distribution chart
- Trend tracking over time

### Website Categories

Websites are automatically grouped into:

- Work
- Social
- Entertainment
- Shopping
- News
- Other

### Backend

- Stores website visits
- Extracts domains from URLs
- Assigns categories
- Serves analytics data through an API

---
## Performance & Metrics

- Handles 10,000+ website visits
- Database queries optimized to <100ms
- Real-time dashboard updates
- Efficiently renders 6+ chart types

---
## Example Insights

The dashboard can answer questions such as:

- Which websites do I visit most often?
- What time of day am I most active?
- How much of my browsing is work vs entertainment?
- Which day of the week do I browse the most?

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Uvicorn

---

## Project Structure

```text
browser-activity-visualizer
│
├── backend
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
│
├── dashboard
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd dashboard
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://127.0.0.1:8000
```

---

## API Endpoints

### GET /

Check that the API is running.

### POST /log

Store a website visit.

```json
{
  "url": "https://github.com"
}
```

### GET /logs

Retrieve logged activity and category data.

---

### Install Chrome Extension

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer Mode" (toggle on top right)
4. Click "Load unpacked"
5. Select the `extension/` folder from this repo
6. The extension will appear in your toolbar


---
## Screenshots

### Dashboard

<img width="1694" height="915" alt="Screenshot 2026-09-16 at 17 58 07" src="https://github.com/user-attachments/assets/799c0815-e68d-435f-a235-ca952f922503" />

### Trends

<img width="1694" height="553" alt="Screenshot 2026-09-16 at 18 31 25" src="https://github.com/user-attachments/assets/93232020-fd16-4546-9887-180b2cd4abf3" />
<img width="1445" height="400" alt="Screenshot 2026-09-16 at 18 31 37" src="https://github.com/user-attachments/assets/b6e6d628-9bb2-4c57-ac2c-3cd19f34e07a" />
<img width="1445" height="366" alt="Screenshot 2026-09-16 at 18 31 43" src="https://github.com/user-attachments/assets/3ad265aa-e7a5-449e-a04d-0eae2eff32e1" />
<img width="1445" height="366" alt="Screenshot 2026-09-16 at 18 31 49" src="https://github.com/user-attachments/assets/b7fb1813-f933-4c67-90ad-c7971a48dcea" />
<img width="1694" height="881" alt="Screenshot 2026-09-16 at 18 31 59" src="https://github.com/user-attachments/assets/ab9d9c14-6740-4836-8571-98b0946c2818" />


---

## What Makes This Special

- **Full-Stack**: Frontend, backend, and database all built from scratch
- **Analytics Focus**: Not just a CRUD app - actual data insights
- **Beautiful Design**: Dark theme with Tailwind CSS, professional UI
- **Scalable**: Built with production patterns (SQLAlchemy ORM, proper error handling)

--- 

## What I Learned

- Building a full-stack application
- Connecting a React frontend to a FastAPI backend
- Designing analytics dashboards
- Working with PostgreSQL and SQLAlchemy
- Creating data visualisations with Recharts
- Managing application state and routing

---

## Future Improvements

- Heatmap visualisations
- Better website categorisation
- Export analytics
- User accounts
- AI-powered insights

---

## Demo

https://www.loom.com/share/86d1043907b849839245ebe8ca5c9197

---

## License

MIT

---

## Author

Author: Amaan Iqbal

- linkedin: https://linkedin.com/in/amaan-iqbal26

- GitHub: https://github.com/amaaniqbal26
