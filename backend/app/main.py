from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import students, fees, payments, dashboard, staff, audit

# Creates tables if they don't exist (schema.sql is the source of truth;
# this is just a convenience for first boot / demo)
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart School FinTech API",
    description="Fee management backend for the Smart School FinTech hackathon project",
    version="0.1.0",
)

# Allow the Lovable frontend (and local dev) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this to your actual frontend URL before the demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(students.router)
app.include_router(fees.router)
app.include_router(payments.router)
app.include_router(dashboard.router)
app.include_router(staff.router)
app.include_router(audit.router)


@app.get("/")
def root():
    return {"status": "ok", "service": "Smart School FinTech API"}


@app.get("/health")
def health():
    return {"status": "healthy"}
