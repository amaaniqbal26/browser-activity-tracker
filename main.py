from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

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

@app.get("/")
def home():
    return {"message": "Backend is running!"}

@app.post("/log")
def log_url(item: LogItem):
    db = SessionLocal()
    entry = Log(url=item.url, timestamp=datetime.utcnow())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    print("Saved:", entry.url)
    return {"status": "ok"}

@app.get("/logs")
def get_logs():
    db = SessionLocal()
    return db.query(Log).all()


