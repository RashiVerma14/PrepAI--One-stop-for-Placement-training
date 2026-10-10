# PlacePrep Frontend

React + Vite frontend matching the supplied PrepAI / PlacePrep screenshots.

## Included screens

- Dashboard
- Resume records
- Text-based AI interview setup and question/answer flow
- AI interview feedback and report
- DSA tracker
- Placement application tracker
- Companies
- Student profile
- Study roadmap

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

Windows PowerShell users can copy `.env.example` to `.env` manually if `cp` is unavailable.

## Demo mode vs backend mode

The starter defaults to `VITE_DEMO_MODE=true` so you can inspect the UI immediately. It uses demo data and browser local storage; this is not backend persistence.

To connect to Spring Boot, set:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_DEMO_MODE=false
```

Then review `src/api.js` and align each endpoint in `ENDPOINTS` with the controller mappings in your backend. The public repository README confirms auth/profile examples, but not every module's exact route. Therefore module routes are centralized and easy to adjust rather than scattered across components.

Expected auth/profile routes based on the repository README:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/profile`
- `PUT /api/user/profile`

Other module endpoints in `src/api.js` are sensible defaults and must be verified against the actual controllers before use.

## Important integration notes

- JWT is attached as `Authorization: Bearer <token>` when available.
- Backend mode reports API errors in the UI; it does not silently pretend that a failed backend request succeeded.
- AI interview question generation and evaluation require the backend's AI endpoints and a configured provider key.
- The frontend is not a voice-interview app.
- No real credentials or API keys should be committed to this repository.
