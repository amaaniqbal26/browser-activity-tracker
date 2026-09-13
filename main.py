from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from urllib.parse import urlparse

from database import SessionLocal, Log

app = FastAPI()

# Allow Chrome extension to send requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LogItem(BaseModel):
    url: str

# Simple domain → category mapping
CATEGORY_MAP = {
    "google.com": "work",
    "github.com": "work",
    "stackoverflow.com": "work",
    "youtube.com": "entertainment",
    "netflix.com": "entertainment",
    "instagram.com": "social",
    "twitter.com": "social",
    "bbc.com": "news",
    "amazon.com": "shopping",
}

def extract_domain(url: str):
    try:
        parsed = urlparse(url)
        return parsed.netloc.replace("www.", "")
    except:
        return ""

@app.get("/")
def home():
    return {"message": "Backend is running!"}

@app.post("/log")
def log_url(item: LogItem):
    db = SessionLocal()

    domain = extract_domain(item.url)
    category = CATEGORY_MAP.get(domain, "other")

    entry = Log(
        url=item.url,
        timestamp=datetime.utcnow(),
        domain=domain,
        category=category
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    print("Saved:", entry.url, "| Category:", category)
    return {"status": "ok"}

@app.get("/logs")
def get_logs():
    db = SessionLocal()
    return db.query(Log).all()

