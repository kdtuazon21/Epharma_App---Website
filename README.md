# Unified Delivery Platform (Expo + Vue Admin)

This workspace contains a React Native / Expo app (mobile-first) that can run on iOS, Android and Web (via `expo start --web`), plus a small separate Admin Web application scaffolded with Vue 3 + Vite located in the `admin-web` folder.

Overview:
- Mobile apps (React Native + Expo): User / Merchant / Driver / Admin UI components are inside the `app/` and `components/` folders. The mobile app is configured to run on web (React Native Web / Expo Web) so you can view it in Chrome.
- Admin Web (Vue 3 + Vite): A compact admin dashboard in `admin-web/` that demonstrates the Admin interface (dashboard, merchants, drivers, orders) and supports exporting mock data to Excel. This is a standard Vue app served by Vite.

What I added:
- `admin-web/` — a Vite + Vue 3 admin web scaffold with: `Dashboard`, `Merchants`, `Drivers`, and `Orders` components.
- Excel export (XLSX) for Merchants, Drivers and Orders in the admin web app (client-side using `xlsx`).
- A root `package.json` script `admin:web` to start the admin web dev server.
- Updated this `README.md` with run instructions.

Quick start (recommended):

1) Run the Expo app (mobile / web)

Open a terminal at repository root and run:

```powershell
npm install
npm run web
```

This will start Expo Dev Tools. To open in Chrome choose the `web` option or open the provided URL (usually `http://localhost:19006` or similar) in Chrome.

2) Run the Admin Web app (Vue + Vite)

Open a separate terminal, then:

```powershell
cd "admin-web"
npm install
npm run dev
```

The admin web app will be served by Vite (default at `http://localhost:5173`). Open that URL in Chrome to view the Admin interface.

Notes & next steps:
- The Expo app currently contains UI components and mock flows for Customers, Merchants, Drivers and Admin. Authentication in those components is currently simulated in the frontend. For a production-ready system you will need to implement a backend (Spring Boot + PostgreSQL as you requested), JWT-based authentication, OAuth flows and connect the frontends to the API.
- The `admin-web` app uses in-memory mock data in `admin-web/src/data/mockData.ts`. Replace these with real API calls to your backend to make the dashboard operational.
- Export to Excel is provided using `xlsx` (SheetJS) on the client. For large datasets generate reports server-side and stream files to the admin.
- For route optimization and tracking use Google Maps or Mapbox SDKs and a server socket (WebSocket) for real-time updates.

Suggested backend architecture (not implemented here):
- Server: Java Spring Boot (REST + WebSocket endpoints)
- Database: PostgreSQL for structured data (users, merchants, products, orders)
- Real-time: WebSocket for live order and tracking updates
- Authentication: JWT + OAuth 2.0 for secure sessions
- Hosting: AWS / GCP for scalable hosting and object storage (prescriptions/images)

If you want, I can next:
- Wire the Admin Vue app to a mock HTTP server or simple JSON API.
- Add a minimal Express or Spring Boot stub that provides authentication and CRUD endpoints (I can scaffold a simple Node/Express mock quickly for testing the UI).
- Implement prescription uploads and show them in the user app (web) as a demo.

Please tell me which of the next steps you want me to implement now.

