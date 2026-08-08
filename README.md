# Medisafe — Phase 1 (Project Setup)

Real React + Flask + PostgreSQL foundation. Phase 1 wires the React frontend to a live Flask `/api/health` endpoint (no mock data).

## Structure
- `frontend/` — React + Vite + Tailwind + Axios
- `backend/` — Flask + SQLAlchemy + Migrate + JWT (scaffolded for later phases)
- `docker-compose.yml` — PostgreSQL container

## Setup

### 1. Database
```
docker compose up -d db
```

### 2. Backend
```
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
flask db init      # first time only
python run.py
```
Backend runs at http://localhost:5000, health check at `/api/health`.

### 3. Frontend
```
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend runs at http://localhost:5173 and displays live "Backend Status" pulled from the API.

## Verify Phase 1
1. Start Postgres, backend, frontend as above.
2. Visit http://localhost:5173 — should show **Backend Status: Connected**.
3. `curl http://localhost:5000/api/health` — should return JSON with `status: ok`.

## Next Phases
Database models → Auth → Medication CRUD → Scheduling → Reminders → Vitals → Prescriptions → Alerts → Dashboard → Drug Interaction API → Testing → Security → Deployment.
