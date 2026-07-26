# Smart School FinTech — Backend

FastAPI + MySQL backend for the Smart School FinTech hackathon project.
Built to match the data shapes already used by the Lovable frontend
(`school-sparkle-pay` repo).

## Run it (Docker — recommended)

You need Docker Desktop installed and running.

```bash
docker compose up --build
```

That single command:
- boots a MySQL 8 container and auto-loads `sql/schema.sql`
- boots the FastAPI app on port 8000, connected to that MySQL instance

Then open:
- **API root**: http://localhost:8000
- **Interactive docs (Swagger)**: http://localhost:8000/docs — test every endpoint here, no Postman needed
- **Health check**: http://localhost:8000/health

To stop: `Ctrl+C`, then `docker compose down` (add `-v` to also wipe the DB volume).

## Run it without Docker (if Docker isn't available)

1. Install MySQL 8 locally, then:
   ```bash
   mysql -u root -p < sql/schema.sql
   ```
2. Create a virtual environment and install deps:
   ```bash
   python -m venv venv
   source venv/bin/activate      # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set the DB connection string (adjust user/password as needed):
   ```bash
   export DATABASE_URL="mysql+pymysql://root:<your_password>@localhost:3306/school_fintech"
   ```
4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Project structure

```
app/
  main.py            # FastAPI app + router registration + CORS
  database.py         # SQLAlchemy engine/session setup
  models/models.py    # ORM models (one per table)
  schemas/schemas.py  # Pydantic request/response schemas
  routers/
    students.py        # student CRUD + family/sibling lookup
    fees.py             # fee types, fee records, EMI split, waivers
    payments.py         # UPI/card auto-approve feed + cash/cheque reconciliation
    dashboard.py         # aggregate revenue metrics + defaulters list
    staff.py             # staff directory
    audit.py             # hash-chained, tamper-evident audit log
sql/
  schema.sql          # source-of-truth MySQL schema
docker-compose.yml
Dockerfile
requirements.txt
```

## Connecting the frontend

The frontend currently has all data hardcoded in the page components (no API
calls yet). To wire it up:

1. Replace the mock arrays (`metrics`, `defaulters`, `feeHeads`, etc.) in
   each route file with a `fetch("http://localhost:8000/api/...")` call —
   ideally via TanStack Query, which is already a dependency in
   `package.json`.
2. Match field names: the API response shapes in `schemas.py` were built
   to line up closely with what the mock data already used, so the swap
   should be mostly mechanical.
3. Before your demo, tighten `allow_origins` in `app/main.py` from `"*"`
   to your actual frontend URL.

## What's NOT built yet

- Authentication / login (currently the API has no auth layer at all)
- The AI differentiator features (risk predictor, NL query bar, anomaly
  detection) — these call the Gemini API and should live as their own
  router, e.g. `app/routers/ai.py`
- n8n reminder workflow integration
- PDF receipt generation
- Seed/demo data (the DB starts empty — add a `sql/seed.sql` before your
  demo so the dashboard isn't blank)
